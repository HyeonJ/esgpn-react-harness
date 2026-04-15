import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const routes = [
  { path: "/", name: "main" },
  { path: "/about", name: "about" },
  { path: "/about/organization", name: "about-organization" },
  { path: "/contest", name: "contest" },
  { path: "/certification", name: "certification" },
  { path: "/news", name: "news" },
  { path: "/news/1", name: "news-detail" },
  { path: "/gallery", name: "gallery" },
  { path: "/contact", name: "contact" },
];

const viewports = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1440, height: 900 },
  { name: "desktop", width: 1920, height: 1080 },
];

async function main() {
  mkdirSync("docs/v3-refactor-screenshots/responsive", { recursive: true });
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    for (const r of routes) {
      const page = await context.newPage();
      try {
        await page.goto(`http://127.0.0.1:5173${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(400);
        const outPath = `docs/v3-refactor-screenshots/responsive/${vp.name}-${r.name}.png`;
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`✓ [${vp.name} ${vp.width}] ${r.path}`);
      } catch (e) {
        console.error(`✗ [${vp.name}] ${r.path}: ${(e as Error).message}`);
      } finally {
        await page.close();
      }
    }
    await context.close();
  }
  await browser.close();
}
main();
