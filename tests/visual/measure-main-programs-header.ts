/**
 * measure-main-programs-header.ts — G2/G3/G4 측정.
 * page.evaluate 인자는 순수 JS (TS 타입 주석 금지).
 *
 * 사용:
 *   npx tsx tests/visual/measure-main-programs-header.ts
 */
import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/main-programs-header";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1416, height: 261 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  const measured = await page.evaluate(`(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
    };
    const txtStyle = (el) => {
      if (!el) return null;
      const s = cs(el);
      return { fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color };
    };

    const section = document.querySelector("section[data-node-id='252:987']");
    const sectionCS = cs(section);
    const eyebrow = document.querySelector("[data-node-id='252:989']");
    const title = document.querySelector("[data-node-id='252:990']");
    const body = document.querySelector("[data-node-id='252:991']");
    const headingBlock = document.querySelector("[data-node-id='252:988']");

    const allImgs = Array.from(document.images);
    const g3 = {
      total: allImgs.length,
      passing: allImgs.filter((i) => i.naturalWidth > 0).length,
      vacuousPass: allImgs.length === 0,
    };

    return {
      section: {
        rect: rect(section),
        bg: sectionCS ? sectionCS.backgroundColor : null,
        gap: sectionCS ? sectionCS.gap : null,
        paddingTop: sectionCS ? sectionCS.paddingTop : null,
        paddingBottom: sectionCS ? sectionCS.paddingBottom : null,
      },
      headingBlock: {
        rect: rect(headingBlock),
        gap: headingBlock ? cs(headingBlock).gap : null,
      },
      eyebrow: eyebrow ? { text: eyebrow.textContent, rect: rect(eyebrow), ...txtStyle(eyebrow) } : null,
      title: title ? { text: title.textContent, rect: rect(title), ...txtStyle(title) } : null,
      body: body ? { text: body.textContent, rect: rect(body), ...txtStyle(body) } : null,
      g3,
    };
  })()`);

  console.log(JSON.stringify(measured, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
