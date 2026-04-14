import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/about-mission", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const data = await page.evaluate(`
    (() => {
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          x: r.left, y: r.top, w: r.width, h: r.height,
          fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight,
          color: cs.color, letterSpacing: cs.letterSpacing,
          borderRadius: cs.borderRadius
        };
      };
      const section = document.querySelector("section");
      const h2 = document.querySelector("h2");
      const h2Green = document.querySelector("h2 span");
      const paragraphs = Array.from(document.querySelectorAll("p"));
      const greens = Array.from(document.querySelectorAll("p span.font-semibold"));
      const imgs = Array.from(document.querySelectorAll("img"));
      const svgs = Array.from(document.querySelectorAll("svg"));
      return {
        section: rect(section),
        h2: rect(h2),
        h2GreenColor: h2Green ? getComputedStyle(h2Green).color : null,
        paragraphs: paragraphs.map(rect),
        greens: greens.map(el => ({ color: getComputedStyle(el).color, weight: getComputedStyle(el).fontWeight })),
        imgs: imgs.map(el => ({ ...rect(el), naturalWidth: el.naturalWidth, naturalHeight: el.naturalHeight, src: el.src.split('/').pop() })),
        svgs: svgs.map(rect)
      };
    })()
  `);

  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
