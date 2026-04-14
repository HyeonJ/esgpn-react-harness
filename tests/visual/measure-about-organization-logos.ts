import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 300 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/about-organization-logos", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const data = await page.evaluate(`
    (() => {
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          x: r.left, y: r.top, w: r.width, h: r.height,
          fontSize: cs.fontSize, color: cs.color, fontWeight: cs.fontWeight,
          backgroundColor: cs.backgroundColor
        };
      };
      const section = document.querySelector("section");
      const imgs = Array.from(document.querySelectorAll("img")).map((el) => ({
        alt: el.getAttribute("alt"),
        naturalWidth: el.naturalWidth,
        naturalHeight: el.naturalHeight,
        ...rect(el)
      }));
      const label = document.querySelector("span");
      return {
        section: rect(section),
        label: label ? { text: label.textContent, ...rect(label) } : null,
        imgs
      };
    })()
  `);

  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
