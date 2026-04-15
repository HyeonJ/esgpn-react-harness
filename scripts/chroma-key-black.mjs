#!/usr/bin/env node
/**
 * chroma-key-black.mjs — PNG의 검정 배경을 알파로 치환.
 *
 * 배경: Framelink에서 leaf nodeId로 다운로드한 아이콘 PNG가 GIF source이거나
 * dark fill을 가질 때 검정 배경이 남음. Figma 캔버스에서는 mix-blend-lighten으로
 * 보이지 않지만 단독 export 시 검정이 그대로 찍힘.
 *
 * GIF는 투명 배경 지원 안 하므로 imageRef 우회도 불가 → 픽셀 단위 chroma-key.
 *
 * 알고리즘:
 *   각 픽셀 R,G,B의 최대값(luminance proxy)을 기준으로:
 *     - max <= THRESHOLD_FULL      → 완전 투명 (alpha=0)
 *     - max >= THRESHOLD_OPAQUE    → 원본 그대로
 *     - 그 중간                    → 비례 알파 (AA 경계 부드럽게)
 *
 * 사용:
 *   node scripts/chroma-key-black.mjs <input.png> <output.png> [--threshold-full N] [--threshold-opaque N]
 *   node scripts/chroma-key-black.mjs icon-1.png icon-1-tr.png
 *   node scripts/chroma-key-black.mjs icon-1.png --in-place
 */
import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("usage: chroma-key-black.mjs <input.png> [output.png | --in-place] [--threshold-full N] [--threshold-opaque N]");
    process.exit(2);
  }
  let input = args[0];
  let output = null;
  let tFull = 25;
  let tOpaque = 60;
  let inPlace = false;
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === "--in-place") inPlace = true;
    else if (a === "--threshold-full") tFull = parseInt(args[++i]);
    else if (a === "--threshold-opaque") tOpaque = parseInt(args[++i]);
    else if (!output) output = a;
  }
  if (inPlace) output = input;
  if (!output) {
    console.error("error: output 경로 필요 (또는 --in-place)");
    process.exit(2);
  }
  return { input, output, tFull, tOpaque };
}

const { input, output, tFull, tOpaque } = parseArgs();

const png = PNG.sync.read(readFileSync(input));
const { width, height, data } = png;

let changed = 0;
let fullyTransparent = 0;
const total = width * height;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a === 0) continue; // 이미 투명

  const maxChannel = Math.max(r, g, b);

  if (maxChannel <= tFull) {
    data[i + 3] = 0; // 완전 투명
    fullyTransparent++;
    changed++;
  } else if (maxChannel < tOpaque) {
    // 비례 알파 — AA 경계 부드럽게
    const alphaPct = (maxChannel - tFull) / (tOpaque - tFull);
    const newAlpha = Math.round(a * alphaPct);
    if (newAlpha !== a) {
      data[i + 3] = newAlpha;
      changed++;
    }
  }
  // maxChannel >= tOpaque → 원본 유지
}

writeFileSync(output, PNG.sync.write(png));

const pct = ((changed / total) * 100).toFixed(1);
const pctFull = ((fullyTransparent / total) * 100).toFixed(1);
console.error(
  `✓ ${input} → ${output}\n` +
    `  ${width}×${height}, ${total.toLocaleString()} px\n` +
    `  chroma-key threshold: full=${tFull} opaque=${tOpaque}\n` +
    `  변경 픽셀: ${changed.toLocaleString()} (${pct}%) · 완전 투명: ${fullyTransparent.toLocaleString()} (${pctFull}%)`,
);
