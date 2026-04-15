#!/usr/bin/env node
// detect-cutoff.mjs — 좁은 뷰포트에서 잘림/overflow 요소 자동 감지
// usage:
//   node scripts/detect-cutoff.mjs <path>            # 4뷰포트(375/768/1440/1920) 전체
//   node scripts/detect-cutoff.mjs <path> 375        # 단일 뷰포트
// ex:    node scripts/detect-cutoff.mjs /
import { chromium } from "playwright";

const path = process.argv[2] ?? "/";
const singleVw = process.argv[3] ? Number(process.argv[3]) : null;
const VIEWPORTS = singleVw
  ? [{ name: `vw-${singleVw}`, w: singleVw, h: 900 }]
  : [
      { name: "mobile-375", w: 375, h: 900 },
      { name: "tablet-768", w: 768, h: 1000 },
      { name: "laptop-1440", w: 1440, h: 1000 },
      { name: "desktop-1920", w: 1920, h: 1080 },
    ];
const url = `http://127.0.0.1:5173${path}`;

const browser = await chromium.launch();

async function inspectAt(vp) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const issues = await page.evaluate((VW) => {
    const out = [];
    const all = Array.from(document.querySelectorAll("*"));

    // 1) Horizontal overflow (right > viewport). clipped vs unclipped 구분
    const isClippedBy = (el) => {
      let cur = el.parentElement;
      while (cur) {
        const cs = getComputedStyle(cur);
        if (cs.overflowX === "hidden" || cs.overflowX === "clip" || cs.overflow === "hidden" || cs.overflow === "clip") return true;
        cur = cur.parentElement;
      }
      return false;
    };
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > VW + 1) {
        out.push({
          kind: isClippedBy(el) ? "h-overflow-clipped" : "h-overflow",
          tag: el.tagName,
          cls: String(el.className).slice(0, 60),
          w: Math.round(r.width),
          right: Math.round(r.right),
          text: (el.textContent || "").slice(0, 40),
        });
      }
    }

    // 2) Text clip: scrollWidth > clientWidth on leaf text elements
    for (const el of all) {
      if (!(el instanceof HTMLElement)) continue;
      const tag = el.tagName;
      if (!/^(P|SPAN|H[1-6]|A|LI|BUTTON|LABEL|DIV)$/.test(tag)) continue;
      const hasText = el.children.length === 0 && (el.textContent || "").trim().length > 0;
      if (!hasText) continue;
      if (el.scrollWidth > el.clientWidth + 1) {
        const cs = getComputedStyle(el);
        out.push({
          kind: "text-clip-x",
          tag,
          cls: String(el.className).slice(0, 60),
          clientW: el.clientWidth,
          scrollW: el.scrollWidth,
          whiteSpace: cs.whiteSpace,
          text: (el.textContent || "").slice(0, 40),
        });
      }
    }

    // 3) Image 과도 축소 (rendered < natural * 0.3)
    for (const el of all) {
      if (el.tagName !== "IMG") continue;
      const img = el;
      if (!img.naturalWidth) continue;
      const r = img.getBoundingClientRect();
      if (r.width < img.naturalWidth * 0.3 && r.width > 0) {
        out.push({
          kind: "img-shrink",
          tag: "IMG",
          cls: String(img.className).slice(0, 60),
          rendered: Math.round(r.width),
          natural: img.naturalWidth,
          ratio: (r.width / img.naturalWidth).toFixed(2),
        });
      }
    }

    return out.slice(0, 60);
  }, vp.w);

  const doc = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  await page.close();
  return { vp, issues, doc };
}

const reports = [];
for (const vp of VIEWPORTS) {
  reports.push(await inspectAt(vp));
}

let hitSet = new Set();
for (const { vp, issues, doc } of reports) {
  console.log(`=== ${vp.name} (${vp.w}×${vp.h}) @ ${path} ===`);
  console.log(`document: scrollWidth=${doc.scrollWidth} clientWidth=${doc.clientWidth}`);
  const byKind = {};
  for (const i of issues) {
    byKind[i.kind] ??= [];
    byKind[i.kind].push(i);
    hitSet.add(i.kind);
  }
  if (!Object.keys(byKind).length) {
    console.log("  (clean — 잘림/overflow 없음)\n");
    continue;
  }
  for (const [kind, items] of Object.entries(byKind)) {
    console.log(`[${kind}] ${items.length}건`);
    for (const it of items.slice(0, 10)) {
      const snippet = it.text ? ` "${it.text.replace(/\s+/g, " ")}"` : "";
      if (kind === "h-overflow") {
        console.log(`  ${it.tag} w=${it.w} right=${it.right} .${it.cls}${snippet}`);
      } else if (kind === "text-clip-x") {
        console.log(`  ${it.tag} clientW=${it.clientW} scrollW=${it.scrollW} ws=${it.whiteSpace} .${it.cls}${snippet}`);
      } else if (kind === "img-shrink") {
        console.log(`  IMG rendered=${it.rendered} natural=${it.natural} ratio=${it.ratio} .${it.cls}`);
      }
    }
  }
  console.log();
}

// 매핑 힌트 (한번만)
if (hitSet.size) {
  console.log("HINT — 패턴 매칭:");
  if (hitSet.has("h-overflow")) {
    console.log("  h-overflow (UNCLIPPED — 실제 가로스크롤 유발) → patterns.md §1");
    console.log("    - 섹션 루트 w-[1920px] → max-w-[1920px] w-full mx-auto");
    console.log("    - 큰 px-[252px] → px-6 md:px-12 xl:px-[252px]");
  }
  if (hitSet.has("h-overflow-clipped")) {
    console.log("  h-overflow-clipped (부모 overflow-hidden 안쪽 — 이미 clip됨)");
    console.log("    - scrollWidth 기준으론 OK. 하지만 내부 내용이 잘려보이면 UX 문제");
    console.log("    - 실제 컨텐츠 잘림 유발 시 patterns.md §7 'absolute decouple' 패턴 적용");
    console.log("      (좁은 뷰포트 relative + w-full, xl:absolute xl:w-[Npx] 로 원본 복원)");
  }
  if (hitSet.has("text-clip-x")) {
    console.log("  text-clip-x → whitespace-nowrap 제거 또는 xl:whitespace-nowrap");
    console.log("    - 긴 제목: line-clamp-2 xl:line-clamp-none");
  }
  if (hitSet.has("img-shrink")) {
    console.log("  img-shrink → card-resize.md §2-1 (aspect-ratio + max-w)");
    console.log("    - natural 대비 30% 미만은 해상도 낭비 — 반응형 `w-full max-w-[Npx]`");
  }
}

await browser.close();
