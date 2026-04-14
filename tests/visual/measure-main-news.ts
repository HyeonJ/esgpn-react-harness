/**
 * measure-main-news.ts — G2/G3/G4 측정.
 * page.evaluate 인자는 순수 JS (TS 타입 주석 금지).
 *
 * 사용:
 *   npx tsx tests/visual/measure-main-news.ts
 */
import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/main-news";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1040 },
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
    const txt = (el) => {
      if (!el) return null;
      const s = cs(el);
      return { fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color };
    };

    const section = document.querySelector("section[aria-label='ESGPN 뉴스룸']");
    const sectionCS = cs(section);

    // Heading (40:1332) — 48B, lh 56px
    const headingTitle = section ? section.querySelector("[data-node-id='40:1332']") : null;
    // Eyebrow (40:1331) — 14R
    const eyebrow = section ? section.querySelector("[data-node-id='40:1331']") : null;
    // Body (40:1333) — 16R tracking -0.16px
    const headingBody = section ? section.querySelector("[data-node-id='40:1333']") : null;

    // Pager
    const totalLabel = section ? section.querySelector("[data-node-id='43:337']") : null;
    const pageCounter = section ? section.querySelector("[data-node-id='40:967']") : null;
    const arrowLeftWrap = section ? section.querySelector("[data-node-id='40:969']") : null;
    const arrowRightWrap = section ? section.querySelector("[data-node-id='40:970']") : null;

    // Cards
    const cardNodeIds = ["43:283", "40:1410", "43:293", "43:316", "243:769"];
    const cards = cardNodeIds.map((nid) => {
      const el = section ? section.querySelector("[data-node-id='" + nid + "']") : null;
      if (!el) return { nid, missing: true };
      const thumbDiv = el.querySelector("div.rounded-\\\\[16px\\\\]") || el.querySelector("[class*='rounded-[16px]']");
      const thumbImg = thumbDiv ? thumbDiv.querySelector("img") : null;
      const titleP = el.querySelector("p");
      const s = cs(el);
      return {
        nid,
        rect: rect(el),
        borderBottom: s.borderBottomColor,
        title: titleP ? { text: titleP.textContent, ...txt(titleP) } : null,
        thumb: thumbDiv ? {
          rect: rect(thumbDiv),
          borderRadius: cs(thumbDiv).borderTopLeftRadius,
          imgNaturalW: thumbImg ? thumbImg.naturalWidth : 0,
          imgObjectFit: thumbImg ? cs(thumbImg).objectFit : null,
        } : null,
      };
    });

    // G3 — all imgs
    const imgs = Array.from(document.images);
    const g3 = {
      total: imgs.length,
      passing: imgs.filter((i) => i.naturalWidth > 0).length,
      details: imgs.map((i) => ({ src: i.src.split("/").pop(), nw: i.naturalWidth, nh: i.naturalHeight })),
    };

    return {
      section: { rect: rect(section), bg: sectionCS ? sectionCS.backgroundColor : null },
      headingTitle: headingTitle ? { text: headingTitle.textContent.replace(/\\s+/g, " ").trim(), ...txt(headingTitle) } : null,
      eyebrow: eyebrow ? { text: eyebrow.textContent, ...txt(eyebrow) } : null,
      headingBody: headingBody ? { text: headingBody.textContent.replace(/\\s+/g, " ").trim().slice(0, 40), ...txt(headingBody) } : null,
      pager: {
        totalLabel: totalLabel ? { text: totalLabel.textContent, ...txt(totalLabel) } : null,
        pageCounter: pageCounter ? { text: pageCounter.textContent, ...txt(pageCounter) } : null,
        arrowLeft: arrowLeftWrap ? rect(arrowLeftWrap) : null,
        arrowRight: arrowRightWrap ? rect(arrowRightWrap) : null,
      },
      cards,
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
