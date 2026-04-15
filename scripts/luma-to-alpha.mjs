#!/usr/bin/env node
/**
 * luma-to-alpha.mjs — PNG의 검정 배경을 unmultiply 방식으로 알파 치환.
 *
 * 배경 원리:
 *   Framelink가 leaf nodeId로 export한 아이콘 PNG가 검정 배경 + 밝은 foreground 조합일 때,
 *   단순 chroma-key(검정 픽셀 alpha=0)는 AA 경계에서 "검정 끼임" 발생.
 *
 *   이 스크립트는 **unmultiply 가정**:
 *     원본 이미지 = foreground(흰색) × alpha + black × (1-alpha)
 *     → luminance 값이 곧 원본 alpha.
 *   따라서 각 픽셀:
 *     alpha_new = max(R, G, B)     # 또는 luminance 공식
 *     RGB_new   = (255, 255, 255)  # 또는 luminance로 정규화된 원본 색
 *
 *   결과:
 *     (0,0,0)     → 완전 투명
 *     (255,255,255) → 완전 불투명 흰색
 *     (128,128,128) → 반투명 흰색 (검정 섞임 없음)
 *
 * 색상 보존 옵션:
 *   --preserve-color  grayscale 대신 원본 hue 유지 (R/G/B 중 가장 큰 값 기준 정규화)
 *   기본은 흰색 force (monochrome 아이콘에 적합)
 *
 * 사용:
 *   node scripts/luma-to-alpha.mjs <input.png> [output.png | --in-place] [--preserve-color]
 *   node scripts/luma-to-alpha.mjs icon-1.png --in-place
 */
import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("usage: luma-to-alpha.mjs <input.png> [output.png | --in-place] [--preserve-color]");
    process.exit(2);
  }
  let input = args[0];
  let output = null;
  let inPlace = false;
  let preserveColor = false;
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === "--in-place") inPlace = true;
    else if (a === "--preserve-color") preserveColor = true;
    else if (!output) output = a;
  }
  if (inPlace) output = input;
  if (!output) {
    console.error("error: output 경로 필요 (또는 --in-place)");
    process.exit(2);
  }
  return { input, output, preserveColor };
}

const { input, output, preserveColor } = parseArgs();
const png = PNG.sync.read(readFileSync(input));
const { width, height, data } = png;

let changed = 0;
let fullyTransparent = 0;
const total = width * height;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  // luminance = max channel (간단, 흑백 아이콘에 충분)
  // 표준 공식: 0.299 R + 0.587 G + 0.114 B
  const luma = Math.max(r, g, b);

  if (luma === 0) {
    data[i + 3] = 0;
    fullyTransparent++;
    changed++;
    continue;
  }

  if (preserveColor) {
    // 원본 hue 유지: RGB를 luma로 정규화 (unmultiply)
    //   premultiplied (r,g,b) = straight_rgb × (luma/255)
    //   straight_rgb = (r,g,b) × 255 / luma
    data[i] = Math.min(255, Math.round((r * 255) / luma));
    data[i + 1] = Math.min(255, Math.round((g * 255) / luma));
    data[i + 2] = Math.min(255, Math.round((b * 255) / luma));
  } else {
    // 흰색 force (monochrome 가정)
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
  }
  data[i + 3] = luma; // alpha = luma
  changed++;
}

writeFileSync(output, PNG.sync.write(png));

console.error(
  `✓ ${input} → ${output}\n` +
    `  ${width}×${height}, ${total.toLocaleString()} px\n` +
    `  mode: ${preserveColor ? "preserve-color" : "force-white"}\n` +
    `  변경: ${changed.toLocaleString()} (${((changed / total) * 100).toFixed(1)}%) · 완전 투명: ${fullyTransparent.toLocaleString()}`,
);
