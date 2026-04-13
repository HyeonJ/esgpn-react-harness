/**
 * compare.ts — 두 PNG의 픽셀 diff 계산 (pixelmatch 래퍼).
 *
 * 규칙:
 *   - 크기가 다르면 더 작은 쪽 크기로 크롭 비교 (좌상단 기준).
 *   - threshold 0.1 (안티에일리어싱 흡수).
 *   - diff 이미지 및 % 반환.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

export type CompareResult = {
  width: number;
  height: number;
  diffPixels: number;
  totalPixels: number;
  diffRatio: number; // 0~1
  diffPercent: number; // 0~100
  diffImagePath: string;
};

function cropPng(png: PNG, width: number, height: number): PNG {
  if (png.width === width && png.height === height) return png;
  const out = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (png.width * y + x) * 4;
      const dstIdx = (width * y + x) * 4;
      out.data[dstIdx] = png.data[srcIdx];
      out.data[dstIdx + 1] = png.data[srcIdx + 1];
      out.data[dstIdx + 2] = png.data[srcIdx + 2];
      out.data[dstIdx + 3] = png.data[srcIdx + 3];
    }
  }
  return out;
}

export function comparePngs(
  baselinePath: string,
  candidatePath: string,
  diffOutPath: string,
  threshold = 0.1,
): CompareResult {
  const a = PNG.sync.read(readFileSync(baselinePath));
  const b = PNG.sync.read(readFileSync(candidatePath));

  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);

  const aC = cropPng(a, width, height);
  const bC = cropPng(b, width, height);

  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(aC.data, bC.data, diff.data, width, height, {
    threshold,
    includeAA: true,
  });

  mkdirSync(dirname(diffOutPath), { recursive: true });
  writeFileSync(diffOutPath, PNG.sync.write(diff));

  const total = width * height;
  return {
    width,
    height,
    diffPixels,
    totalPixels: total,
    diffRatio: diffPixels / total,
    diffPercent: (diffPixels / total) * 100,
    diffImagePath: diffOutPath,
  };
}
