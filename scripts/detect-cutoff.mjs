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

    // 1) Horizontal overflow (right > viewport). clipped vs unclipped, content vs decoration 구분
    const isClippedBy = (el) => {
      let cur = el.parentElement;
      while (cur) {
        const cs = getComputedStyle(cur);
        if (cs.overflowX === "hidden" || cs.overflowX === "clip" || cs.overflow === "hidden" || cs.overflow === "clip") return true;
        cur = cur.parentElement;
      }
      return false;
    };
    const hasContent = (el) => {
      // 본문 콘텐츠 요소 포함 여부 (텍스트/링크/버튼/이미지 중 실제 의미 있는 것)
      if (el.querySelector("p, h1, h2, h3, h4, h5, h6, a, button, label, li")) return true;
      const txt = (el.textContent || "").trim();
      if (txt.length >= 10) return true;
      return false;
    };
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > VW + 1) {
        const clipped = isClippedBy(el);
        const content = hasContent(el);
        let kind;
        if (!clipped) kind = "h-overflow";
        else if (content) kind = "h-overflow-clipped-content";
        else kind = "h-overflow-clipped-deco";
        out.push({
          kind,
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

    // 3a) Cards overflow row: 같은 flex 컨테이너 자식 중 2+ 요소가 viewport 초과
    //     → stacking 필요 시그널 (개별 h-overflow 보다 구조적 문제)
    const flexContainers = new Map();
    for (const el of all) {
      if (!el.parentElement) continue;
      const cs = getComputedStyle(el.parentElement);
      if (cs.display !== "flex" && cs.display !== "inline-flex") continue;
      if (cs.flexDirection !== "row" && cs.flexDirection !== "row-reverse") continue;
      const r = el.getBoundingClientRect();
      if (r.right > VW + 1 && r.width > 40) {
        const parent = el.parentElement;
        if (!flexContainers.has(parent)) flexContainers.set(parent, []);
        flexContainers.get(parent).push(el);
      }
    }
    for (const [parent, children] of flexContainers) {
      if (children.length < 2) continue;
      const rp = parent.getBoundingClientRect();
      out.push({
        kind: "cards-overflow-row",
        tag: parent.tagName,
        cls: String(parent.className).slice(0, 60),
        w: Math.round(rp.width),
        childCount: children.length,
        text: children.map((c) => (c.textContent || "").slice(0, 20)).join(" | "),
      });
    }

    // 3b) Image 과도 축소 (rendered < natural * 0.3)
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
    for (const it of items.slice(0, 30)) {
      const snippet = it.text ? ` "${it.text.replace(/\s+/g, " ")}"` : "";
      if (kind === "h-overflow" || kind === "h-overflow-clipped-content" || kind === "h-overflow-clipped-deco") {
        console.log(`  ${it.tag} w=${it.w} right=${it.right} .${it.cls}${snippet}`);
      } else if (kind === "cards-overflow-row") {
        console.log(`  ${it.tag} parent w=${it.w} children=${it.childCount} .${it.cls}  [${it.text}]`);
      } else if (kind === "text-clip-x") {
        console.log(`  ${it.tag} clientW=${it.clientW} scrollW=${it.scrollW} ws=${it.whiteSpace} .${it.cls}${snippet}`);
      } else if (kind === "img-shrink") {
        console.log(`  IMG rendered=${it.rendered} natural=${it.natural} ratio=${it.ratio} .${it.cls}`);
      }
    }
    if (items.length > 30) console.log(`  ... (+${items.length - 30} more)`);
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
  if (hitSet.has("h-overflow-clipped-content")) {
    console.log("  h-overflow-clipped-content (본문 포함, clip됨) — 실제 UX 문제. 반드시 수정");
    console.log("    → patterns.md §4-2 absolute decouple (relative xl:absolute)");
    console.log("    → §2-4 equal-weight cards stacking (flex-col xl:flex-row)");
  }
  if (hitSet.has("h-overflow-clipped-deco")) {
    console.log("  h-overflow-clipped-deco (장식/blob/배경만, clip됨) — OK, 손대지 말 것");
  }
  if (hitSet.has("cards-overflow-row")) {
    console.log("  cards-overflow-row (flex-row 자식 2+가 viewport 초과) — 구조적 stacking 필요");
    console.log("    → patterns.md §2-4: `flex-col xl:flex-row` (md:flex-row 넣지 말 것)");
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
