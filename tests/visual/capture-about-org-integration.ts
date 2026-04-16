import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 800 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/about/organization", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "tests/visual/captures/about-organization-page.png", fullPage: true });
  const overflow = await page.evaluate(`
    ({
      docWidth: document.documentElement.scrollWidth,
      docHeight: document.documentElement.scrollHeight,
      winWidth: window.innerWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    })
  `);
  console.log(JSON.stringify(overflow, null, 2));
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
