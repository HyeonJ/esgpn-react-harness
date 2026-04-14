import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/about-vision";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 783 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  const result = await page.evaluate(() => {
    const section = document.querySelector("section");
    const imgs = Array.from(document.querySelectorAll("img"));
    const ps = Array.from(document.querySelectorAll("p"));

    const rect = section.getBoundingClientRect();

    const imgInfo = imgs.map((img) => {
      const r = img.getBoundingClientRect();
      return {
        nat: [img.naturalWidth, img.naturalHeight],
        render: [Math.round(r.width), Math.round(r.height)],
        left: Math.round(r.left - rect.left),
        top: Math.round(r.top - rect.top),
      };
    });

    const pInfo = ps.map((p) => {
      const r = p.getBoundingClientRect();
      const cs = getComputedStyle(p);
      return {
        text: p.textContent.slice(0, 40),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        color: cs.color,
        centerX: Math.round(r.left + r.width / 2),
        top: Math.round(r.top - rect.top),
        bottom: Math.round(r.bottom - rect.top),
      };
    });

    return {
      section: { w: Math.round(rect.width), h: Math.round(rect.height) },
      imgs: imgInfo,
      ps: pInfo,
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
