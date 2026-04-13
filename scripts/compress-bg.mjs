// BG 이미지 압축: 3840×2894 → 1920×1447, quality 85
import sharp from "sharp";
import { statSync } from "node:fs";

const src = "src/assets/main-hero/raw/bg.png";
const dst = "src/assets/main-hero/bg.png";
const before = statSync(src).size;

const buf = await sharp(src)
  .resize({ width: 1920 })
  .png({ quality: 80, compressionLevel: 9, palette: true, colors: 256, dither: 0.8 })
  .toBuffer();

// write to temp then move to avoid in-place conflict
const { writeFileSync } = await import("node:fs");
writeFileSync(dst, buf);

const after = statSync(dst).size;
const meta = await sharp(dst).metadata();
console.log(
  `before=${(before / 1024 / 1024).toFixed(2)}MB after=${(after / 1024 / 1024).toFixed(2)}MB size=${meta.width}x${meta.height}`,
);
