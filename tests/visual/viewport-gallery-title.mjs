import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const OUT = "docs/width-gallery-title";
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const viewports = [
  { w: 375, h: 812, name: "375" },
  { w: 768, h: 1024, name: "768" },
  { w: 1440, h: 900, name: "1440" },
  { w: 1920, h: 1080, name: "1920" },
];
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/gallery", { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/gallery-${vp.name}.png`, fullPage: false });
  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    const body = document.body;
    return {
      scrollW: de.scrollWidth,
      clientW: de.clientWidth,
      hasHOverflow: de.scrollWidth > de.clientWidth,
      bodyScrollW: body.scrollWidth,
    };
  });
  console.log(`vp${vp.name}: ${JSON.stringify(overflow)}`);
  await ctx.close();
}
await browser.close();
