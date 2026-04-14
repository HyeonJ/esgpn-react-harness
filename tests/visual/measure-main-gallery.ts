/**
 * measure-main-gallery.ts — G2/G3/G4 측정.
 * page.evaluate 인자는 순수 JS (TS 타입 주석 금지).
 *
 * 사용:
 *   npx tsx tests/visual/measure-main-gallery.ts
 */
import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/main-gallery";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1888 },
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

    const section = document.querySelector("section[aria-label='ESGPN 아카이브']");
    const sectionCS = cs(section);

    const eyebrow = section ? section.querySelector("[data-node-id='43:548']") : null;
    const headingMain = section ? section.querySelector("[data-node-id='43:549']") : null;
    const headingSub = section ? section.querySelector("[data-node-id='43:550']") : null;

    const partnershipLabel = section ? section.querySelector("[data-node-id='43:1813']") : null;
    const awardLabel = section ? section.querySelector("[data-node-id='43:1883']") : null;

    const partnershipCardIds = ["43:1837", "43:1838", "43:1845"];
    const partnershipCards = partnershipCardIds.map((nid) => {
      const el = section ? section.querySelector("[data-node-id='" + nid + "']") : null;
      if (!el) return { nid, missing: true };
      const thumb = el.querySelector("div.rounded-\\\\[24px\\\\]") || el.querySelector("[class*='rounded-[24px]']");
      return {
        nid,
        rect: rect(el),
        thumb: thumb ? { rect: rect(thumb), borderRadius: cs(thumb).borderTopLeftRadius } : null,
      };
    });

    const awardCardWrap = section ? section.querySelector("[data-node-id='43:1891']") : null;
    const awardThumb = section ? section.querySelector("[data-node-id='43:1892']") : null;

    const ctas = Array.from(section ? section.querySelectorAll("[data-node-id='43:1854'], [data-node-id='43:1901']") : []);
    const ctaInfo = ctas.map((el) => ({
      nid: el.getAttribute("data-node-id"),
      rect: rect(el),
      br: cs(el).borderTopLeftRadius,
      bg: cs(el).backgroundColor,
    }));

    const imgs = Array.from(document.images);
    const g3 = {
      total: imgs.length,
      passing: imgs.filter((i) => i.naturalWidth > 0).length,
      details: imgs.map((i) => ({ src: i.src.split("/").pop(), nw: i.naturalWidth, nh: i.naturalHeight })),
    };

    return {
      section: { rect: rect(section), bg: sectionCS ? sectionCS.backgroundColor : null },
      eyebrow: eyebrow ? { text: eyebrow.textContent, ...txt(eyebrow) } : null,
      headingMain: headingMain ? { text: headingMain.textContent.replace(/\\s+/g, " ").trim(), ...txt(headingMain) } : null,
      headingSub: headingSub ? { text: headingSub.textContent.replace(/\\s+/g, " ").trim().slice(0, 30), ...txt(headingSub) } : null,
      partnershipLabel: partnershipLabel ? { text: partnershipLabel.textContent, ...txt(partnershipLabel) } : null,
      awardLabel: awardLabel ? { text: awardLabel.textContent, ...txt(awardLabel) } : null,
      partnershipCards,
      awardCard: awardCardWrap ? { rect: rect(awardCardWrap), thumb: rect(awardThumb) } : null,
      ctas: ctaInfo,
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
