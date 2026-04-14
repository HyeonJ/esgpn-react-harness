import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1400 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/gallery-agreements", { waitUntil: "networkidle" });
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
          color: cs.color, letterSpacing: cs.letterSpacing, gap: cs.gap, borderRadius: cs.borderRadius
        };
      };
      const section = document.querySelector("section");
      const heading = document.querySelector("section > div:first-child > p");
      const cards = Array.from(document.querySelectorAll("section > div:nth-child(2) > div"));
      const titles = Array.from(document.querySelectorAll("section p")).filter(p => p.textContent && p.textContent.includes("COLiVE"));
      const descs = Array.from(document.querySelectorAll("section p")).filter(p => p.textContent && (p.textContent.includes("ESG") || p.textContent.includes("지역")));
      const imgs = Array.from(document.querySelectorAll("section img"));
      return {
        section: rect(section),
        headingText: heading?.textContent,
        heading: rect(heading),
        rowCount: cards.length,
        cardSample: rect(cards[0]?.querySelector("div:first-child")),
        titleSample: titles[0] ? { ...rect(titles[0]), text: titles[0].textContent.slice(0, 40) } : null,
        descSample: descs[0] ? { ...rect(descs[0]), text: descs[0].textContent.slice(0, 50) } : null,
        imgs: imgs.map(el => ({ src: el.src.split("/").pop(), nw: el.naturalWidth, nh: el.naturalHeight, alt: el.alt.slice(0, 40) }))
      };
    })()
  `);

  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}

main();
