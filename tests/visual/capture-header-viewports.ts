import { chromium } from "playwright";

const viewports = [
  { name: "mobile", w: 375, h: 200 },
  { name: "tablet", w: 768, h: 200 },
  { name: "laptop", w: 1440, h: 200 },
  { name: "desktop", w: 1920, h: 200 },
];

async function main() {
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    await page.goto("http://127.0.0.1:5173/__preview/header", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `docs/v3-refactor-screenshots/header-${vp.name}.png`, fullPage: false });
    await page.close();
    console.log(vp.name, vp.w);
  }
  await browser.close();
}
main();
