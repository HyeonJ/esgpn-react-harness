import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 390 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/about-organization-chart", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const data = await page.evaluate(`
    (() => {
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          x: Math.round(r.left),
          y: Math.round(r.top),
          w: Math.round(r.width),
          h: Math.round(r.height),
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          borderRadius: cs.borderRadius,
          letterSpacing: cs.letterSpacing,
          text: (el.textContent || "").trim().slice(0, 40)
        };
      };
      const section = document.querySelector("section");
      const label = document.querySelector("section span");
      const boxes = Array.from(document.querySelectorAll("section > div > div")).map(rect);
      const connectors = Array.from(document.querySelectorAll("section > div > svg")).map(rect);
      const allBoxesWithText = Array.from(document.querySelectorAll("section div")).filter(el => {
        const t = (el.textContent || "").trim();
        return t.length > 0 && t.length < 40 && el.children.length === 0;
      }).map(rect);
      return {
        section: rect(section),
        divider_label: label ? { ...rect(label) } : null,
        boxes_with_text: allBoxesWithText,
        all_boxes_count: allBoxesWithText.length,
        svg_connectors: Array.from(document.querySelectorAll("svg")).slice(1).map(rect)
      };
    })()
  `);

  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
