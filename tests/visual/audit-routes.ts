import { chromium } from "playwright";

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

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1200 }, deviceScaleFactor: 1 });
  for (const r of routes) {
    const page = await context.newPage();
    try {
      await page.goto(`http://127.0.0.1:5173${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(400);
      const outPath = `docs/v3-refactor-screenshots/audit-${r.name}.png`;
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`✓ ${r.path} → ${outPath}`);
    } catch (e) {
      console.error(`✗ ${r.path}: ${(e as Error).message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
}
main();
