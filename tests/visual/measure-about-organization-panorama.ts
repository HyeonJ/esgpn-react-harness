import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/about-organization-panorama";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 440 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  const result = await page.evaluate(() => {
    const section = document.querySelector("section");
    const imgs = Array.from(document.querySelectorAll("img"));

    const rect = section.getBoundingClientRect();

    const imgInfo = imgs.map((img) => {
      const r = img.getBoundingClientRect();
      const cs = getComputedStyle(img);
      return {
        src: img.src.split("/").pop(),
        nat: [img.naturalWidth, img.naturalHeight],
        render: [Math.round(r.width), Math.round(r.height)],
        left: Math.round(r.left - rect.left),
        top: Math.round(r.top - rect.top),
        position: cs.position,
      };
    });

    const sectionCs = getComputedStyle(section);

    return {
      section: {
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        bg: sectionCs.backgroundColor,
        overflow: sectionCs.overflow,
      },
      imgs: imgInfo,
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
