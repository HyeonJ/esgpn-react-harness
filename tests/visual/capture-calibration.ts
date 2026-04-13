/**
 * capture-calibration.ts — 한글 보정 샘플 3종 (display/body/caption) 크롭 캡처.
 * 출력: research/font-calibration/{sample}-after.png
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT_DIR = resolve("research/font-calibration");
const URL = process.env.CALIBRATION_URL ?? "http://127.0.0.1:5173/__calibration";

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      locale: "ko-KR",
      timezoneId: "Asia/Seoul",
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const samples = ["h1", "body", "caption"];
    for (const id of samples) {
      const locator = page.locator(`[data-calibration-sample="${id}"]`);
      const out = resolve(OUT_DIR, `${id}-after.png`);
      await locator.screenshot({ path: out });
      console.log(`[calibration] ${id} -> ${out}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
