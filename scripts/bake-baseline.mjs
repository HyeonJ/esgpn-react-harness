#!/usr/bin/env node
/**
 * bake-baseline.mjs — figma-screenshots/{page}-full.png에서 섹션 영역을 crop하여
 * alpha=0 transparent가 white에 베이크된 상태로 figma-screenshots/{section}.png에 덮어쓴다.
 *
 * 자율 모드 세션에서 발견: Framelink 섹션 단독 export는 alpha=0 transparent 영역이 많아
 * white preview와 비교 시 G1 대량 폭증. full-page composite는 이미 white-ish bg로
 * rendered되어 있어 crop만으로 문제 해결.
 *
 * 사용법:
 *   node scripts/bake-baseline.mjs <section> <x> <y> <w> <h> [--from <page>-full.png]
 *   node scripts/bake-baseline.mjs gallery-agreements 491 360 937 1024
 *   node scripts/bake-baseline.mjs news-list 491 833 937 1416 --from news-full.png
 *
 * compare-section.sh에서 --bake-from-full=<page> 옵션으로도 호출.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { PNG } from "pngjs";

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 5) {
    console.error("usage: bake-baseline.mjs <section> <x> <y> <w> <h> [--from <full.png>]");
    process.exit(2);
  }
  const [section, x, y, w, h] = args;
  let fromFull = null;
  for (let i = 5; i < args.length; i++) {
    if (args[i] === "--from") fromFull = args[++i];
  }
  return { section, x: +x, y: +y, w: +w, h: +h, fromFull };
}

function guessPageFullFromSection(section) {
  // main-hero → main-full, gallery-agreements → gallery-full, news-detail-article → news-detail-full
  // 공통(header/footer) → 추측 불가능
  const parts = section.split("-");
  if (parts[0] === "news" && parts[1] === "detail") return "news-detail-full.png";
  return `${parts[0]}-full.png`;
}

const { section, x, y, w, h, fromFull } = parseArgs();
const fullName = fromFull ?? guessPageFullFromSection(section);
const fullPath = `figma-screenshots/${fullName}`;
const outPath = `figma-screenshots/${section}.png`;

if (!existsSync(fullPath)) {
  console.error(`error: full-page baseline not found: ${fullPath}`);
  console.error("   --from <page>-full.png 옵션으로 명시하거나 해당 파일 존재 확인");
  process.exit(2);
}

const full = PNG.sync.read(readFileSync(fullPath));
const out = new PNG({ width: w, height: h });
for (let dy = 0; dy < h; dy++) {
  for (let dx = 0; dx < w; dx++) {
    const si = ((y + dy) * full.width + (x + dx)) * 4;
    const di = (dy * w + dx) * 4;
    out.data[di] = full.data[si];
    out.data[di + 1] = full.data[si + 1];
    out.data[di + 2] = full.data[si + 2];
    out.data[di + 3] = full.data[si + 3];
  }
}
writeFileSync(outPath, PNG.sync.write(out));
console.log(`✓ ${outPath} ${w}x${h} from ${fullPath} @ (${x},${y})`);
