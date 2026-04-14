/**
 * measure-main-programs-card3.ts — G2/G3/G4 측정.
 * page.evaluate 인자는 순수 JS (TS 타입 주석 금지).
 *
 * 사용:
 *   npx tsx tests/visual/measure-main-programs-card3.ts
 */
import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/main-programs-card3";

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

    const section = document.querySelector("section[data-node-id='252:1119']");
    const outer = document.querySelector("[data-node-id='252:1123']");
    const inner = document.querySelector("[data-node-id='252:1124']");
    const header = document.querySelector("[data-node-id='252:1125']");
    const title = document.querySelector("[data-node-id='252:1132']");
    const icons = document.querySelector("[data-node-id='258:1375']");
    const bottom = document.querySelector("[data-node-id='258:1392']");
    const bottomLabel = document.querySelector("[data-node-id='258:1393']");
    const ul = document.querySelector("[data-node-id='258:1397']");
    const cta = document.querySelector("[data-node-id='252:1166']");
    const arrows = document.querySelector("[data-node-id='252:1168']");
    const divider = document.querySelector("[data-node-id='252:1164']");
    const cityTopLeft = document.querySelector("[data-floating='city-top-left']");
    const cityBottomLeft = document.querySelector("[data-node-id='252:1120']");
    const cityRight = document.querySelector("[data-node-id='252:1122']");

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
      icons: { rect: rect(icons), gap: cs(icons) && cs(icons).gap, rows: icons ? icons.children.length : 0 },
      bottom: { rect: rect(bottom), gap: cs(bottom) && cs(bottom).gap },
      bottomLabel: bottomLabel ? { rect: rect(bottomLabel), labelText: bottomLabel.querySelector('p') && txtStyle(bottomLabel.querySelector('p')) } : null,
      ul: ul ? { rect: rect(ul), ...txtStyle(ul), items: ul.querySelectorAll('li').length } : null,
      cta: { rect: rect(cta), bg: ctaCS && ctaCS.backgroundColor, radius: ctaCS && ctaCS.borderRadius, span: ctaSpan ? { text: ctaSpan.textContent, ...txtStyle(ctaSpan) } : null },
      arrows: arrows ? { rect: rect(arrows), imgs: Array.from(arrows.querySelectorAll('img')).map(i => rect(i)) } : null,
      divider: rect(divider),
      cityTopLeft: cityTopLeft ? { rect: rect(cityTopLeft), innerImg: rect(cityTopLeft.querySelector('img')) } : null,
      cityBottomLeft: cityBottomLeft ? { rect: rect(cityBottomLeft) } : null,
      cityRight: cityRight ? { rect: rect(cityRight) } : null,
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
