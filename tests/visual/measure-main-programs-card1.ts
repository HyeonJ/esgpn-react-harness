/**
 * measure-main-programs-card1.ts — G2/G3/G4 측정.
 * page.evaluate 인자는 순수 JS (TS 타입 주석 금지).
 *
 * 사용:
 *   npx tsx tests/visual/measure-main-programs-card1.ts
 */
import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/main-programs-card1";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1416, height: 805 },
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

    const section = document.querySelector("section[data-node-id='252:1013']");
    const outer = document.querySelector("[data-node-id='252:1015']");
    const inner = document.querySelector("[data-node-id='252:1016']");
    const header = document.querySelector("[data-node-id='252:1017']");
    const title = document.querySelector("[data-node-id='252:1024']");
    const checklist3 = document.querySelector("[data-node-id='252:1034']");
    const competencies = document.querySelector("[data-node-id='252:1050']");
    const competenciesLabel = document.querySelector("[data-node-id='252:1051']");
    const ul = document.querySelector("[data-node-id='252:1054']");
    const cta = document.querySelector("[data-node-id='252:1058']");
    const arrows = document.querySelector("[data-node-id='252:1060']");
    const divider = document.querySelector("[data-node-id='252:1056']");
    const leafBottom = document.querySelector("[data-leaf='bottom']");
    const leafTop = document.querySelector("[data-leaf='top']");
    const city = document.querySelector("[data-node-id='252:1014']");

    const allImgs = Array.from(document.images);
    const g3 = {
      total: allImgs.length,
      passing: allImgs.filter((i) => i.naturalWidth > 0).length,
      srcs: allImgs.map((i) => ({ src: i.src.split('/').pop(), natW: i.naturalWidth, natH: i.naturalHeight })),
    };

    const ctaSpan = cta ? cta.querySelector('span') : null;
    const outerCS = cs(outer);
    const innerCS = cs(inner);
    const ctaCS = cs(cta);

    return {
      section: rect(section),
      outer: { rect: rect(outer), bg: outerCS && outerCS.backgroundColor, radius: outerCS && outerCS.borderRadius, pad: outerCS && outerCS.padding, gap: outerCS && outerCS.gap },
      inner: { rect: rect(inner), bg: innerCS && innerCS.backgroundColor, radius: innerCS && innerCS.borderRadius, pad: innerCS && innerCS.padding, gap: innerCS && innerCS.gap },
      header: { rect: rect(header), gap: cs(header) && cs(header).gap },
      title: title ? { text: title.textContent, rect: rect(title), ...txtStyle(title) } : null,
      checklist3: { rect: rect(checklist3), gap: cs(checklist3) && cs(checklist3).gap },
      competencies: { rect: rect(competencies), gap: cs(competencies) && cs(competencies).gap },
      competenciesLabel: competenciesLabel ? { rect: rect(competenciesLabel), labelText: competenciesLabel.querySelector('p') && txtStyle(competenciesLabel.querySelector('p')) } : null,
      ul: ul ? { rect: rect(ul), ...txtStyle(ul), items: ul.querySelectorAll('li').length } : null,
      cta: { rect: rect(cta), bg: ctaCS && ctaCS.backgroundColor, radius: ctaCS && ctaCS.borderRadius, span: ctaSpan ? { text: ctaSpan.textContent, ...txtStyle(ctaSpan) } : null },
      arrows: arrows ? { rect: rect(arrows), imgs: Array.from(arrows.querySelectorAll('img')).map(i => rect(i)) } : null,
      divider: rect(divider),
      leafBottom: leafBottom ? { rect: rect(leafBottom), innerTransform: cs(leafBottom.querySelector('.flex-none')) && cs(leafBottom.querySelector('.flex-none')).transform } : null,
      leafTop: leafTop ? { rect: rect(leafTop), innerTransform: cs(leafTop.querySelector('.flex-none')) && cs(leafTop.querySelector('.flex-none')).transform } : null,
      city: city ? { rect: rect(city) } : null,
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
