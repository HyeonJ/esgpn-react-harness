#!/usr/bin/env node
/**
 * check-composite-diff.mjs — Framelink 섹션 단독 export와 page-full crop의 차이 감지.
 *
 * 자율 모드에서 certification-hero에서 발견: Framelink의 Rectangle(299:3861) 단독 export는
 * 페이지 composite에 있는 좌우 leaf decoration overflow를 미포함 → G1 ~3-4%p 손해.
 *
 * 이 스크립트는:
 *   - figma-screenshots/{section}.png (Framelink 단독)
 *   - figma-screenshots/{page}-full.png에서 같은 영역 crop
 * 두 이미지 픽셀 diff > 임계치(기본 3%)면 "composite decoration 누락 의심" 경고.
 *
 * 사용:
 *   node scripts/check-composite-diff.mjs <section> <page> <x> <y> <w> <h>
 *   node scripts/check-composite-diff.mjs certification-hero certification 0 0 1920 633
 *
 * 종료: 0 (OK), 1 (경고만, exit 안 함. warn 출력), 2 (사용 오류)
 */
import { readFileSync, existsSync } from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const args = process.argv.slice(2);
if (args.length < 6) {
  console.error("usage: check-composite-diff.mjs <section> <page> <x> <y> <w> <h>");
  process.exit(2);
}
const [section, page, X, Y, W, H] = args;
const x = +X, y = +Y, w = +W, h = +H;
const THRESHOLD_PERCENT = 3.0;

const sectionPath = `figma-screenshots/${section}.png`;
const fullPath = `figma-screenshots/${page}-full.png`;

if (!existsSync(sectionPath) || !existsSync(fullPath)) {
  console.error(`skip: ${sectionPath} or ${fullPath} not found`);
  process.exit(0);
}

const full = PNG.sync.read(readFileSync(fullPath));
const section_ = PNG.sync.read(readFileSync(sectionPath));

// section이 (x,y,w,h) 만큼 크지 않다면 스킵
if (section_.width !== w || section_.height !== h) {
  console.error(`note: section size ${section_.width}x${section_.height} ≠ 기대 ${w}x${h}. 비교 생략`);
  process.exit(0);
}

// full에서 (x,y,w,h) crop
const cropped = new PNG({ width: w, height: h });
for (let dy = 0; dy < h; dy++) {
  for (let dx = 0; dx < w; dx++) {
    const si = ((y + dy) * full.width + (x + dx)) * 4;
    const di = (dy * w + dx) * 4;
    cropped.data[di] = full.data[si];
    cropped.data[di + 1] = full.data[si + 1];
    cropped.data[di + 2] = full.data[si + 2];
    cropped.data[di + 3] = full.data[si + 3];
  }
}

const diff = new PNG({ width: w, height: h });
const diffPixels = pixelmatch(section_.data, cropped.data, diff.data, w, h, {
  threshold: 0.1,
});
const total = w * h;
const pct = (diffPixels / total) * 100;

const report = {
  section,
  page,
  diffPercent: pct.toFixed(2),
  threshold: THRESHOLD_PERCENT,
  verdict: pct >= THRESHOLD_PERCENT ? "COMPOSITE_MISMATCH" : "OK",
};
console.log(JSON.stringify(report, null, 2));

if (pct >= THRESHOLD_PERCENT) {
  console.error(
    `\n⚠ composite 차이 ${pct.toFixed(2)}% (임계 ${THRESHOLD_PERCENT}%). ` +
      `Framelink 단독 export에 page composite의 decoration(leaf overflow, blend layer 등)이 누락됐을 가능성. ` +
      `compare 베이스라인을 ${page}-full.png 기반 crop으로 교체 고려:\n` +
      `  node scripts/bake-baseline.mjs ${section} ${x} ${y} ${w} ${h} --from ${page}-full.png`,
  );
  process.exit(1);
}
console.error("✓ composite 일치 (단독 export와 차이 < 3%)");
