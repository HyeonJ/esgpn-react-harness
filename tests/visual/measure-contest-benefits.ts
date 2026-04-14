import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 969 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/contest-benefits", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const data = await page.evaluate(`
    (() => {
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          x: Math.round(r.left * 100) / 100,
          y: Math.round(r.top * 100) / 100,
          w: Math.round(r.width * 100) / 100,
          h: Math.round(r.height * 100) / 100,
          fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight,
          color: cs.color, background: cs.backgroundColor,
          letterSpacing: cs.letterSpacing, borderRadius: cs.borderRadius,
          padding: cs.padding, gap: cs.gap
        };
      };
      const section = document.querySelector("section");
      const h2 = document.querySelector("h2");
      const cards = Array.from(document.querySelectorAll("[data-role='benefit-card']"));
      const cta = document.querySelector("[data-role='cta-banner']");
      const allImgs = Array.from(document.querySelectorAll("img"));
      return {
        section: rect(section),
        h2: rect(h2),
        cardCount: cards.length,
        card1: rect(cards[0]),
        cta: rect(cta),
        imgCount: allImgs.length,
        imgNaturalWidths: allImgs.map((img) => img.naturalWidth),
      };
    })()
  `);

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
