/**
 * measure-main-news.ts — G2/G3/G4 gate measurement for main-news section.
 *
 * Usage:
 *   npx tsx tests/visual/measure-main-news.ts
 *
 * Requires: dev server on http://127.0.0.1:5173
 */
import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1040 });
  await page.goto("http://127.0.0.1:5173/__preview/main-news", {
    waitUntil: "networkidle",
  });

  // Capture a screenshot for visual inspection
  await page.screenshot({
    path: "tests/visual/captures/main-news-capture.png",
    fullPage: true,
  });

  // G2: Dimension accuracy
  console.log("\n=== G2: Dimension Accuracy ===");

  const g2 = await page.evaluate(() => {
    var results = [];

    // Section heading (h2) -- 48B, lh 56px
    var h2 = document.querySelector('h2');
    if (h2) {
      var s = getComputedStyle(h2);
      var fs = parseFloat(s.fontSize);
      var fw = parseInt(s.fontWeight);
      var lh = parseFloat(s.lineHeight);
      results.push({
        target: "Heading h2 fontSize",
        measured: fs + "px",
        figma: "48px",
        pass: Math.abs(fs - 48) <= 1,
      });
      results.push({
        target: "Heading h2 fontWeight",
        measured: "" + fw,
        figma: "700",
        pass: fw === 700,
      });
      results.push({
        target: "Heading h2 lineHeight",
        measured: lh + "px",
        figma: "56px",
        pass: Math.abs(lh - 56) <= 2,
      });
    }

    // Eyebrow -- 14R
    var eyebrow = document.querySelector('[data-node-id="40:1329"] p:first-of-type');
    if (eyebrow) {
      var se = getComputedStyle(eyebrow);
      results.push({
        target: "Eyebrow fontSize",
        measured: parseFloat(se.fontSize) + "px",
        figma: "14px",
        pass: Math.abs(parseFloat(se.fontSize) - 14) <= 1,
      });
    }

    // Card title -- 20B
    var cardTitle = document.querySelector('[data-node-id="43:283"] h3');
    if (cardTitle) {
      var sc = getComputedStyle(cardTitle);
      results.push({
        target: "Card title fontSize",
        measured: parseFloat(sc.fontSize) + "px",
        figma: "20px",
        pass: Math.abs(parseFloat(sc.fontSize) - 20) <= 1,
      });
      results.push({
        target: "Card title fontWeight",
        measured: "" + parseInt(sc.fontWeight),
        figma: "700",
        pass: parseInt(sc.fontWeight) === 700,
      });
    }

    // Card thumbnail -- 140x100
    var thumbImgs = document.querySelectorAll('[data-node-id="43:283"] img');
    var thumb = null;
    for (var i = 0; i < thumbImgs.length; i++) {
      if (thumbImgs[i].src.indexOf("thumb") !== -1) {
        thumb = thumbImgs[i].parentElement;
        break;
      }
    }
    if (thumb) {
      var pt = getComputedStyle(thumb);
      var w = parseFloat(pt.width);
      var hh = parseFloat(pt.height);
      results.push({
        target: "Thumbnail container width",
        measured: w + "px",
        figma: "140px",
        pass: Math.abs(w - 140) <= 2,
      });
      results.push({
        target: "Thumbnail container height",
        measured: hh + "px",
        figma: "100px",
        pass: Math.abs(hh - 100) <= 2,
      });
    }

    // Arrow icons -- 24x24
    var arrow = document.querySelector('[data-node-id="40:969"]');
    if (arrow) {
      var sa = getComputedStyle(arrow);
      results.push({
        target: "Arrow size",
        measured: parseFloat(sa.width) + "x" + parseFloat(sa.height),
        figma: "24x24",
        pass: Math.abs(parseFloat(sa.width) - 24) <= 2 && Math.abs(parseFloat(sa.height) - 24) <= 2,
      });
    }

    return results;
  });

  let g2Pass = true;
  for (const r of g2) {
    const mark = r.pass ? "PASS" : "FAIL";
    if (!r.pass) g2Pass = false;
    console.log("  [" + mark + "] " + r.target + ": " + r.measured + " (Figma: " + r.figma + ")");
  }
  console.log("G2 overall: " + (g2Pass ? "PASS" : "FAIL"));

  // G3: Asset integrity (naturalWidth > 0)
  console.log("\n=== G3: Asset Integrity ===");

  const g3 = await page.evaluate(() => {
    var imgs = document.querySelectorAll('[data-node-id="43:315"] img');
    var results = [];
    imgs.forEach((img) => {
      results.push({
        src: img.src.split("/").pop() || img.src.slice(0, 60),
        naturalWidth: img.naturalWidth,
        pass: img.naturalWidth > 0,
      });
    });
    return results;
  });

  let g3Pass = true;
  for (const r of g3) {
    const mark = r.pass ? "PASS" : "FAIL";
    if (!r.pass) g3Pass = false;
    console.log("  [" + mark + "] " + r.src + ": naturalWidth=" + r.naturalWidth);
  }
  console.log("G3 overall: " + (g3Pass ? "PASS" : "FAIL") + " (" + g3.length + " images)");

  // G4: Color accuracy
  console.log("\n=== G4: Color Accuracy ===");

  const g4Script = `(() => {
    function rgbToHex(rgb) {
      var m = rgb.match(/\\d+/g);
      if (!m || m.length < 3) return rgb;
      return "#" + m.slice(0, 3).map(function(n) { return parseInt(n).toString(16).padStart(2, "0"); }).join("");
    }
    var results = [];
    var eyebrow = document.querySelector('[data-node-id="40:1329"] p:first-of-type');
    if (eyebrow) {
      var hex = rgbToHex(getComputedStyle(eyebrow).color);
      results.push({ target: "Eyebrow text color", measured: hex, figma: "#97a29e", pass: hex === "#97a29e" });
    }
    var h2 = document.querySelector('h2');
    if (h2) {
      var hex2 = rgbToHex(getComputedStyle(h2).color);
      results.push({ target: "Heading title color", measured: hex2, figma: "#1d2623", pass: hex2 === "#1d2623" });
    }
    var allP = document.querySelectorAll('[data-node-id="43:283"] p');
    for (var i = 0; i < allP.length; i++) {
      if (allP[i].className && allP[i].className.indexOf("line-clamp") !== -1) {
        var hex3 = rgbToHex(getComputedStyle(allP[i]).color);
        results.push({ target: "Card body color", measured: hex3, figma: "#5d6a66", pass: hex3 === "#5d6a66" });
        break;
      }
    }
    var card = document.querySelector('[data-node-id="43:283"]');
    if (card) {
      var hex4 = rgbToHex(getComputedStyle(card).borderBottomColor);
      results.push({ target: "Card border-bottom color", measured: hex4, figma: "#c6cdcc", pass: hex4 === "#c6cdcc" });
    }
    var source = document.querySelector('[data-node-id="43:283"] span');
    if (source) {
      var hex5 = rgbToHex(getComputedStyle(source).color);
      results.push({ target: "Source text color", measured: hex5, figma: "#97a29e", pass: hex5 === "#97a29e" });
    }
    return results;
  })()`;
  const g4 = await page.evaluate(g4Script) as Array<{target: string; measured: string; figma: string; pass: boolean}>;

  let g4Pass = true;
  for (const r of g4) {
    const mark = r.pass ? "PASS" : "FAIL";
    if (!r.pass) g4Pass = false;
    console.log("  [" + mark + "] " + r.target + ": " + r.measured + " (Figma: " + r.figma + ")");
  }
  console.log("G4 overall: " + (g4Pass ? "PASS" : "FAIL"));

  // Summary
  console.log("\n=== Summary ===");
  console.log("G2 Dimensions: " + (g2Pass ? "PASS" : "FAIL"));
  console.log("G3 Assets:     " + (g3Pass ? "PASS" : "FAIL"));
  console.log("G4 Colors:     " + (g4Pass ? "PASS" : "FAIL"));

  await browser.close();

  if (!g2Pass || !g3Pass || !g4Pass) {
    process.exit(1);
  }
}

main().catch(function (e) {
  console.error(e);
  process.exit(2);
});
