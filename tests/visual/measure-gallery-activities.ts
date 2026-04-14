import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 800 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/gallery-activities", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const data = await page.evaluate(`
    (() => {
      const rect = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        return { x: r.left, y: r.top, w: r.width, h: r.height, fontSize: cs.fontSize, lineHeight: cs.lineHeight,
                 fontWeight: cs.fontWeight, color: cs.color, letterSpacing: cs.letterSpacing, gap: cs.gap, borderRadius: cs.borderRadius }; };
      const section = document.querySelector("section");
      const titles = Array.from(document.querySelectorAll("section p"));
      const cardTitle = titles.find(p => p.textContent && p.textContent.includes("ESG대상"));
      const cardDesc = titles.find(p => p.textContent && p.textContent.includes("사회공헌"));
      const heading = titles.find(p => p.textContent && p.textContent.includes("관련 활동"));
      const imgs = Array.from(document.querySelectorAll("section img"));
      return {
        section: rect(section), heading: rect(heading), cardTitle: rect(cardTitle), cardDesc: rect(cardDesc),
        imgs: imgs.map(el => ({ src: el.src.split("/").pop(), nw: el.naturalWidth, nh: el.naturalHeight, alt: el.alt }))
      };
    })()
  `);
  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}
main();
