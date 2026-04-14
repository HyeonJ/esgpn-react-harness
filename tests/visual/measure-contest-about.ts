import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1416, height: 459 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/contest-about", { waitUntil: "networkidle" });
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
      const icon = document.querySelector("section img");
      const svg = document.querySelector("svg");
      const intro = document.querySelector("section > div > p");
      const introSpan = document.querySelector("section > div > p > span");
      const cards = Array.from(document.querySelectorAll("section h3"));
      const cardEls = cards.map(h => h.parentElement);
      const bullets = Array.from(document.querySelectorAll("ul li"));
      const bulletDots = Array.from(document.querySelectorAll("ul li > span[aria-hidden]"));
      return {
        section: rect(section),
        headingIcon: icon ? { ...rect(icon), naturalWidth: icon.naturalWidth, naturalHeight: icon.naturalHeight, src: icon.src.split('/').pop() } : null,
        h2: h2 ? { ...rect(h2), text: h2.textContent } : null,
        divider: rect(svg),
        intro: intro ? { ...rect(intro), text: intro.textContent } : null,
        introSpan: introSpan ? { ...rect(introSpan), text: introSpan.textContent } : null,
        cards: cardEls.map((el, i) => ({ idx: i, title: cards[i].textContent, ...rect(el), titleStyle: rect(cards[i]) })),
        bulletCount: bullets.length,
        bullets: bullets.map((el, i) => ({
          idx: i,
          text: el.textContent,
          ...rect(el),
          dot: rect(bulletDots[i])
        }))
      };
    })()
  `);

  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
