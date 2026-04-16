import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1888 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:5173/__preview/main-gallery", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const data = await page.evaluate(`
    (() => {
      var rect = function(el) {
        if (!el) return null;
        var r = el.getBoundingClientRect();
        var cs = getComputedStyle(el);
        return {
          x: r.left, y: r.top, w: r.width, h: r.height,
          fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight,
          color: cs.color, letterSpacing: cs.letterSpacing,
          backgroundColor: cs.backgroundColor, borderRadius: cs.borderRadius,
          gap: cs.gap, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom,
          paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight
        };
      };

      var section = document.querySelector('[data-node-id="43:545"]');
      var eyebrow = document.querySelector('[data-node-id="43:548"]');
      var headingMain = document.querySelector('[data-node-id="43:549"]');
      var headingSub = document.querySelector('[data-node-id="43:550"]');
      var partnerBlock = document.querySelector('[data-node-id="43:1851"]');
      var awardBlock = document.querySelector('[data-node-id="43:1880"]');
      var cardRow = document.querySelector('[data-node-id="43:1844"]');
      var card1 = document.querySelector('[data-node-id="43:1837"]');
      var awardCardWrap = document.querySelector('[data-node-id="43:1891"]');
      var cta1 = document.querySelector('[data-node-id="43:1854"]');
      var cta2 = document.querySelector('[data-node-id="43:1901"]');

      var thumbs = document.querySelectorAll('figure');
      var thumbData = Array.from(thumbs).map(function(t) {
        var r = t.getBoundingClientRect();
        var cs = getComputedStyle(t);
        return { w: r.width, h: r.height, borderRadius: cs.borderRadius };
      });

      var imgs = document.querySelectorAll('img');
      var imgData = Array.from(imgs).map(function(img) {
        return { src: img.src.split('/').pop(), naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
      });

      return {
        section: rect(section),
        eyebrow: rect(eyebrow),
        headingMain: rect(headingMain),
        headingSub: rect(headingSub),
        partnerBlock: rect(partnerBlock),
        awardBlock: rect(awardBlock),
        cardRow: rect(cardRow),
        card1: rect(card1),
        awardCardWrap: rect(awardCardWrap),
        cta1: rect(cta1),
        cta2: rect(cta2),
        thumbs: thumbData,
        imgs: imgData
      };
    })()
  `);

  await browser.close();
  console.log(JSON.stringify(data, null, 2));
}

main().catch(function(e) { console.error(e); process.exit(1); });
