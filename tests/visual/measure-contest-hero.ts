import { chromium } from "@playwright/test";

// 순수 string 평가로 tsx의 __name 변환 우회
const probeScript = `
(function() {
  function rect(el) {
    var r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  }
  var sec = document.querySelector("section");
  var circle = document.querySelector("section .rounded-full");
  var h1 = document.querySelector("section h1");
  var stats = document.querySelector("section > div:last-child");
  var bgOverlay = document.querySelector("section > div[aria-hidden]");
  var bgImg = document.querySelector("section img");
  var cs = h1 ? getComputedStyle(h1) : null;
  return JSON.stringify({
    section: sec ? rect(sec) : null,
    circle: circle ? rect(circle) : null,
    h1: h1 ? rect(h1) : null,
    stats: stats ? rect(stats) : null,
    bgOverlay: bgOverlay ? rect(bgOverlay) : null,
    bgImg: bgImg ? { rect: rect(bgImg), natW: bgImg.naturalWidth, natH: bgImg.naturalHeight } : null,
    h1Style: cs ? { fs: cs.fontSize, lh: cs.lineHeight, ff: cs.fontFamily, fw: cs.fontWeight } : null,
  });
})()
`;

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1134 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/contest-hero", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const data = await page.evaluate(probeScript);
  console.log(data);
  await browser.close();
})();
