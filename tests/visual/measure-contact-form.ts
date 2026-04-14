import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 800 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/contact-form", { waitUntil: "networkidle" });
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
          color: cs.color, background: cs.backgroundColor,
          letterSpacing: cs.letterSpacing, borderRadius: cs.borderRadius,
          padding: cs.padding
        };
      };
      const section = document.querySelector("section");
      const h1 = document.querySelector("h1");
      const p = document.querySelector("h1 ~ p");
      const svg = document.querySelector("svg");
      const imgPlaceholder = document.querySelector("section > div > form > div[aria-hidden]");
      const labels = Array.from(document.querySelectorAll("label"));
      const inputs = Array.from(document.querySelectorAll("input"));
      const textarea = document.querySelector("textarea");
      const button = document.querySelector('button[type="button"]');
      const imgs = Array.from(document.querySelectorAll("img"));
      return {
        section: rect(section),
        h1: rect(h1),
        p: rect(p),
        divider: rect(svg),
        imgPlaceholder: rect(imgPlaceholder),
        labels: labels.map(el => ({ ...rect(el), text: el.textContent })),
        inputs: inputs.map(el => ({ ...rect(el), placeholder: el.placeholder, type: el.type })),
        textarea: textarea ? { ...rect(textarea), placeholder: textarea.placeholder, rows: textarea.rows } : null,
        button: button ? { ...rect(button), text: button.textContent, type: button.type } : null,
        imgs: imgs.map(el => ({ ...rect(el), naturalWidth: el.naturalWidth, naturalHeight: el.naturalHeight, src: el.src.split('/').pop() }))
      };
    })()
  `);

  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
