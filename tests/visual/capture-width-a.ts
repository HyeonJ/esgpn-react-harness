import { chromium } from "playwright";

const routes = [
  { path: "/", slug: "home" },
  { path: "/about", slug: "about" },
  { path: "/about/organization", slug: "about-organization" },
  { path: "/contest", slug: "contest" },
  { path: "/certification", slug: "certification" },
  { path: "/news", slug: "news" },
  { path: "/gallery", slug: "gallery" },
  { path: "/contact", slug: "contact" },
];

const vps = [
  { name: "1920", w: 1920, h: 1080 },
  { name: "1440", w: 1440, h: 900 },
  { name: "375", w: 375, h: 800 },
];

async function main() {
  const browser = await chromium.launch();
  for (const route of routes) {
    for (const vp of vps) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      try {
        await page.goto(`http://127.0.0.1:5173${route.path}`, { waitUntil: "networkidle", timeout: 20000 });
        await page.waitForTimeout(500);
        await page.screenshot({
          path: `docs/width-a-1920-fixed/${route.slug}-${vp.name}.png`,
          fullPage: true,
        });
        console.log(`OK ${route.slug} @ ${vp.name}`);
      } catch (e) {
        console.error(`FAIL ${route.slug} @ ${vp.name}:`, (e as Error).message);
      }
      await page.close();
    }
  }
  await browser.close();
  console.log("DONE");
}
main();
