import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/about-values";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 722 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  const result = await page.evaluate(() => {
    const section = document.querySelector("section") as HTMLElement;
    const imgs = Array.from(document.querySelectorAll("img"));
    const titles = Array.from(document.querySelectorAll("h3"));
    const descs = Array.from(document.querySelectorAll("p"));
    const svgs = Array.from(document.querySelectorAll("svg"));

    const rect = section.getBoundingClientRect();
    const iconsInfo = imgs.map((img) => {
      const r = img.getBoundingClientRect();
      return {
        nat: [img.naturalWidth, img.naturalHeight],
        render: [Math.round(r.width), Math.round(r.height)],
        centerX: Math.round(r.left + r.width / 2),
        top: Math.round(r.top - rect.top),
      };
    });

    const titleInfo = titles.map((t) => {
      const r = t.getBoundingClientRect();
      const cs = getComputedStyle(t);
      return {
        text: t.textContent,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        color: cs.color,
        centerX: Math.round(r.left + r.width / 2),
        top: Math.round(r.top - rect.top),
      };
    });

    const descInfo = descs.map((p) => {
      const r = p.getBoundingClientRect();
      const cs = getComputedStyle(p);
      return {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        color: cs.color,
        centerX: Math.round(r.left + r.width / 2),
        top: Math.round(r.top - rect.top),
      };
    });

    const dividerInfo = svgs.map((s) => {
      const r = s.getBoundingClientRect();
      return {
        size: [Math.round(r.width), Math.round(r.height)],
        top: Math.round(r.top - rect.top),
      };
    });

    return {
      section: { w: Math.round(rect.width), h: Math.round(rect.height) },
      icons: iconsInfo,
      titles: titleInfo,
      descs: descInfo,
      dividers: dividerInfo,
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
