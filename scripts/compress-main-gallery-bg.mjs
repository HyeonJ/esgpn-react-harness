// main-gallery BG 압축: 대용량 2종 → width 1920 제한
// - bg-cityscape.jpg (paper texture, alpha 없음) → JPG 85 OK
// - bg-overlay.png (cityscape with RGBA transparency) → PNG 유지 (JPG로 변환 시 alpha가 black으로 바뀌어 blend 결과 깨짐)
import sharp from "sharp";
import { statSync, copyFileSync, mkdirSync } from "node:fs";

const dir = "src/assets/main-gallery";
mkdirSync(dir, { recursive: true });

// JPG 대상 (alpha 없는 paper texture)
{
  const src = `${dir}/raw/bg-cityscape.jpg`;
  const dst = `${dir}/bg-cityscape.jpg`;
  const before = statSync(src).size;
  const buf = await sharp(src)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
  const { writeFileSync } = await import("node:fs");
  writeFileSync(dst, buf);
  const after = statSync(dst).size;
  const meta = await sharp(dst).metadata();
  console.log(
    `${src} -> ${dst}  before=${(before / 1024 / 1024).toFixed(2)}MB after=${(after / 1024 / 1024).toFixed(2)}MB size=${meta.width}x${meta.height}`,
  );
}

// PNG alpha 유지 대상 (cityscape)
{
  const src = `${dir}/raw/bg-overlay.png`;
  const dst = `${dir}/bg-overlay.png`;
  const before = statSync(src).size;
  const buf = await sharp(src)
    .resize({ width: 1920, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 85, colors: 256 })
    .toBuffer();
  const { writeFileSync } = await import("node:fs");
  writeFileSync(dst, buf);
  const after = statSync(dst).size;
  const meta = await sharp(dst).metadata();
  console.log(
    `${src} -> ${dst}  before=${(before / 1024 / 1024).toFixed(2)}MB after=${(after / 1024 / 1024).toFixed(2)}MB size=${meta.width}x${meta.height} alpha=${meta.hasAlpha}`,
  );
}

// copy non-heavy assets as-is
const passthrough = [
  "card1-thumb.png",
  "card2-thumb.png",
  "card3-thumb.png",
  "award-thumb.png",
  "divider-partnership.svg",
  "divider-award.svg",
  "arrow-icon.svg",
];
for (const name of passthrough) {
  copyFileSync(`${dir}/raw/${name}`, `${dir}/${name}`);
  console.log(`copy ${name}`);
}
