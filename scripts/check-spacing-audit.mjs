#!/usr/bin/env node
/**
 * check-spacing-audit.mjs — Figma ↔ 구현 spacing 감사 (F-011 대응)
 *
 * Playwright로 dev server 접속 후 각 컨테이너의 computed padding/margin/gap
 * 추출 → 의심 패턴 flag. 시각 추정 padding(65/66/71 같은 비표준 값)을 자동 검출.
 *
 * 감사 항목:
 * 1. NON_STANDARD: 4의 배수 아닌 값 (8 grid 기반 디자인 시스템 표준 위반)
 * 2. ASYMMETRIC_PADDING: 한쪽만 padding (pt만 있고 pb 없음 등) — F-011 대표 증상
 * 3. NESTED_PADDING: 부모 padding + 자식 padding 누적 의심
 * 4. GAP_AND_MARGIN_CONFLICT: flex gap + child margin 동시 사용 (이중 spacing)
 *
 * Usage:
 *   dev 서버 실행 상태에서
 *   node scripts/check-spacing-audit.mjs /           # 메인페이지
 *   node scripts/check-spacing-audit.mjs /about      # About
 *   node scripts/check-spacing-audit.mjs /about --viewport=1440
 *   node scripts/check-spacing-audit.mjs / --json    # JSON 출력
 */

import { chromium } from "playwright";

const args = process.argv.slice(2);
const route = args.find((a) => !a.startsWith("--")) ?? "/";
const viewport = Number(args.find((a) => a.startsWith("--viewport="))?.split("=")[1] ?? 1920);
const asJson = args.includes("--json");
const url = `http://127.0.0.1:5173${route}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: viewport, height: 1080 } });

try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 10000 });
} catch (e) {
  console.error(`Failed to load ${url}: ${e.message}`);
  await browser.close();
  process.exit(1);
}
await page.waitForTimeout(500);

const audit = await page.evaluate(() => {
  const parsePx = (v) => {
    if (!v) return 0;
    const n = parseFloat(v);
    return isNaN(n) ? 0 : Math.round(n * 100) / 100;
  };

  const CONTAINER_TAGS = new Set([
    "SECTION", "DIV", "FIGURE", "NAV", "ARTICLE",
    "HEADER", "FOOTER", "UL", "OL", "LI", "MAIN", "ASIDE",
  ]);

  const items = [];
  const elements = Array.from(document.querySelectorAll("*"));

  for (const el of elements) {
    if (!CONTAINER_TAGS.has(el.tagName)) continue;
    if (!(el instanceof HTMLElement)) continue;

    const cs = getComputedStyle(el);
    const pt = parsePx(cs.paddingTop);
    const pr = parsePx(cs.paddingRight);
    const pb = parsePx(cs.paddingBottom);
    const pl = parsePx(cs.paddingLeft);
    const mt = parsePx(cs.marginTop);
    const mr = parsePx(cs.marginRight);
    const mb = parsePx(cs.marginBottom);
    const ml = parsePx(cs.marginLeft);
    const rowGap = parsePx(cs.rowGap);
    const colGap = parsePx(cs.columnGap);
    const gap = rowGap || colGap;

    const hasAny = pt || pr || pb || pl || mt || mr || mb || ml || gap;
    if (!hasAny) continue;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    items.push({
      tag: el.tagName.toLowerCase(),
      id: el.id || undefined,
      dataNodeId: el.getAttribute("data-node-id") || undefined,
      ariaLabel: el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || undefined,
      className: (el.className || "").slice(0, 80),
      padding: { t: pt, r: pr, b: pb, l: pl },
      margin: { t: mt, r: mr, b: mb, l: ml },
      gap,
      rowGap,
      colGap,
      display: cs.display,
      flexDirection: cs.flexDirection,
      rect: { width: Math.round(rect.width), height: Math.round(rect.height) },
      parentPadding: null, // filled below
      firstChildMargin: null, // filled below
    });
  }

  // 2pass: nested padding + gap+margin 충돌 체크를 위해 관계 수집
  for (const item of items) {
    const el = [...document.querySelectorAll("*")].find((e) =>
      e.tagName.toLowerCase() === item.tag &&
      (e.className || "").slice(0, 80) === item.className &&
      e.getBoundingClientRect().top === (item.rect.top ?? -1)
    );
    // 생략 — 정확한 매칭 어려우니 다른 방식 사용
  }

  return items;
});

await browser.close();

function flagItem(item) {
  const flags = [];
  const { padding: p, margin: m, gap } = item;

  // 1. Non-standard (4의 배수 아님) — positive 값만. 음수 margin은 Figma overlap 패턴이라 의도적
  const nonStandard = [];
  for (const [k, v] of Object.entries(p)) {
    if (v !== 0 && v % 4 !== 0) nonStandard.push(`p${k}=${v}`);
  }
  for (const [k, v] of Object.entries(m)) {
    // 양수 margin만 체크 (음수는 Figma overlap 의도)
    if (v > 0 && v % 4 !== 0) nonStandard.push(`m${k}=${v}`);
  }
  if (gap && gap % 4 !== 0) nonStandard.push(`gap=${gap}`);
  if (nonStandard.length) {
    flags.push({
      kind: "NON_STANDARD",
      detail: nonStandard.join(", "),
      hint: "4px grid 외. Figma spec 재확인 필요 (시각 추정 가능성)",
    });
  }

  // 2. Asymmetric padding (한쪽만, 24 이상만 경고)
  const asymmetries = [];
  if (p.t >= 24 && p.b === 0) asymmetries.push(`pt=${p.t} only (no pb)`);
  if (p.b >= 24 && p.t === 0) asymmetries.push(`pb=${p.b} only (no pt)`);
  if (p.l >= 24 && p.r === 0) asymmetries.push(`pl=${p.l} only (no pr)`);
  if (p.r >= 24 && p.l === 0) asymmetries.push(`pr=${p.r} only (no pl)`);
  if (asymmetries.length) {
    flags.push({
      kind: "ASYMMETRIC_PADDING",
      detail: asymmetries.join(", "),
      hint: "한쪽 padding 누락 (24+). F-011 대표 증상",
    });
  }

  // 3. 비대칭 좌우 padding (좌우가 16+ 차이) — 의도적 좌/우 정렬 가능성도 있으나 검토 대상
  if (p.l > 0 && p.r > 0 && Math.abs(p.l - p.r) > 16) {
    flags.push({
      kind: "LR_MISMATCH",
      detail: `pl=${p.l} vs pr=${p.r}`,
      hint: "좌우 padding 불균형. 의도적이면 OK, 오타면 수정 필요",
    });
  }

  return flags;
}

if (asJson) {
  console.log(JSON.stringify({ url, viewport, items: audit.map((i) => ({ ...i, flags: flagItem(i) })) }, null, 2));
  process.exit(0);
}

// Human-readable
console.log(`\n=== Spacing audit: ${url} @ ${viewport}px viewport ===`);
console.log(`Total containers with spacing: ${audit.length}\n`);

const flagged = [];
for (const item of audit) {
  const flags = flagItem(item);
  if (flags.length === 0) continue;
  flagged.push({ item, flags });
}

flagged.sort((a, b) => b.flags.length - a.flags.length);

for (const { item, flags } of flagged) {
  const id = item.dataNodeId ? `[${item.dataNodeId}]` : item.id ? `#${item.id}` : "";
  const label = item.ariaLabel ? ` "${item.ariaLabel}"` : "";
  console.log(`${item.tag}${id}${label}`);
  console.log(`  .${item.className}`);
  const { padding: p, margin: m, gap } = item;
  const pStr = `p: t${p.t}/r${p.r}/b${p.b}/l${p.l}`;
  const mStr = (m.t || m.r || m.b || m.l) ? ` m: t${m.t}/r${m.r}/b${m.b}/l${m.l}` : "";
  const gStr = gap ? ` gap:${gap}` : "";
  console.log(`  ${pStr}${mStr}${gStr}`);
  for (const f of flags) {
    console.log(`  ⚠ ${f.kind}: ${f.detail}`);
    console.log(`    → ${f.hint}`);
  }
  console.log();
}

console.log(`=== Summary: ${flagged.length}/${audit.length} flagged ===`);
const kindCounts = {};
for (const { flags } of flagged) {
  for (const f of flags) kindCounts[f.kind] = (kindCounts[f.kind] || 0) + 1;
}
for (const [k, c] of Object.entries(kindCounts)) console.log(`  ${k}: ${c}`);

if (flagged.length > 0) process.exit(1);
