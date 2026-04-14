import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 600 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/about-header", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const data = await page.evaluate(`
    (() => {
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          x: r.left, y: r.top, w: r.width, h: r.height, right: r.right, bottom: r.bottom,
          fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight,
          fontFamily: cs.fontFamily, color: cs.color, letterSpacing: cs.letterSpacing,
          textDecoration: cs.textDecoration
        };
      };
      const section = document.querySelector("section");
      const h1 = document.querySelector("h1");
      const p = document.querySelector("p");
      const tabs = Array.from(document.querySelectorAll("nav a"));
      return {
        section: rect(section),
        h1: rect(h1),
        p: rect(p),
        tabs: tabs.map(rect)
      };
    })()
  `);

  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
