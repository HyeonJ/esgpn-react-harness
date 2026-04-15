import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1200 } });
  await page.goto("http://127.0.0.1:5173/contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "docs/v3-refactor-screenshots/contact-route-check.png", fullPage: true });
  await browser.close();
  console.log("OK");
}
main();
