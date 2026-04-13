/**
 * measure-footer.ts — Footer 섹션 G2/G3/G4 게이트 자동 측정.
 *
 * 사용: npx tsx tests/visual/measure-footer.ts
 * 전제: dev 서버 http://127.0.0.1:5173, /__preview/footer 라우트 장착.
 */
import { chromium } from "@playwright/test";

type Expected = {
  label: string;
  actual: string | number;
  expected: string | number;
  tolerance: number;
  pass: boolean;
};

const URL = "http://127.0.0.1:5173/__preview/footer";

// Figma 스펙 (research/footer.md / plan/footer.md §8)
const SPEC = {
  footerWidth: 1920,
  footerHeight: 708,
  footerPaddingTop: 48,
  footerRowGap: 80,
  topRowPaddingX: 252,
  topRowGap: 40,
  leftColGap: 48,
  infoBlockGap: 8,
  infoLineHeight: 21,
  infoLineGap: 8,
  infoFont: 14,
  infoLineHeightPx: 21, // 14 * 1.5
  infoFontWeight: 400,
  copyrightFont: 14,
  copyrightFontWeight: 400,
  rightNavGap: 16,
  rightNavHeight: 21,
  navLinkFontWeight: 700,
  watermarkHeight: 432,
  watermarkWidth: 1920,
  // 색상
  bg: "rgb(12, 12, 12)", // #0c0c0c
  white: "rgb(255, 255, 255)", // #ffffff
  copyrightColor: "rgb(124, 137, 133)", // #7c8985
};

function within(actual: number, expected: number, tol: number): boolean {
  return Math.abs(actual - expected) <= tol;
}

function parsePx(v: string): number {
  return parseFloat(v.replace("px", ""));
}

async function main(): Promise<number> {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      locale: "ko-KR",
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const results: Expected[] = [];

    // ========== G2 치수 ==========
    const footer = page.locator('footer[role="contentinfo"]');
    const fBox = await footer.boundingBox();
    const fStyle = await footer.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        height: cs.height,
        width: cs.width,
        paddingTop: cs.paddingTop,
        rowGap: cs.rowGap,
        backgroundColor: cs.backgroundColor,
      };
    });
    results.push({ label: "G2 footer.width", actual: parsePx(fStyle.width), expected: SPEC.footerWidth, tolerance: 2, pass: within(parsePx(fStyle.width), SPEC.footerWidth, 2) });
    results.push({ label: "G2 footer.height", actual: parsePx(fStyle.height), expected: SPEC.footerHeight, tolerance: 2, pass: within(parsePx(fStyle.height), SPEC.footerHeight, 2) });
    results.push({ label: "G2 footer.paddingTop", actual: parsePx(fStyle.paddingTop), expected: SPEC.footerPaddingTop, tolerance: 2, pass: within(parsePx(fStyle.paddingTop), SPEC.footerPaddingTop, 2) });
    results.push({ label: "G2 footer.rowGap", actual: parsePx(fStyle.rowGap), expected: SPEC.footerRowGap, tolerance: 2, pass: within(parsePx(fStyle.rowGap), SPEC.footerRowGap, 2) });

    // top row
    const topRow = footer.locator("> div").first();
    const trStyle = await topRow.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight, columnGap: cs.columnGap };
    });
    results.push({ label: "G2 topRow.paddingLeft", actual: parsePx(trStyle.paddingLeft), expected: SPEC.topRowPaddingX, tolerance: 2, pass: within(parsePx(trStyle.paddingLeft), SPEC.topRowPaddingX, 2) });
    results.push({ label: "G2 topRow.paddingRight", actual: parsePx(trStyle.paddingRight), expected: SPEC.topRowPaddingX, tolerance: 2, pass: within(parsePx(trStyle.paddingRight), SPEC.topRowPaddingX, 2) });
    results.push({ label: "G2 topRow.columnGap", actual: parsePx(trStyle.columnGap), expected: SPEC.topRowGap, tolerance: 2, pass: within(parsePx(trStyle.columnGap), SPEC.topRowGap, 2) });

    // left col
    const leftCol = topRow.locator("> div").first();
    const lcGap = await leftCol.evaluate((el) => getComputedStyle(el).rowGap);
    results.push({ label: "G2 leftCol.rowGap", actual: parsePx(lcGap), expected: SPEC.leftColGap, tolerance: 2, pass: within(parsePx(lcGap), SPEC.leftColGap, 2) });

    // info block
    const infoBlock = leftCol.locator("> div").first();
    const ibGap = await infoBlock.evaluate((el) => getComputedStyle(el).rowGap);
    results.push({ label: "G2 infoBlock.rowGap", actual: parsePx(ibGap), expected: SPEC.infoBlockGap, tolerance: 2, pass: within(parsePx(ibGap), SPEC.infoBlockGap, 2) });

    // info line 1 (height + first text)
    const infoLine = infoBlock.locator("> div").first();
    const ilStyle = await infoLine.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { height: cs.height, columnGap: cs.columnGap };
    });
    results.push({ label: "G2 infoLine.height", actual: parsePx(ilStyle.height), expected: SPEC.infoLineHeight, tolerance: 2, pass: within(parsePx(ilStyle.height), SPEC.infoLineHeight, 2) });
    results.push({ label: "G2 infoLine.columnGap", actual: parsePx(ilStyle.columnGap), expected: SPEC.infoLineGap, tolerance: 2, pass: within(parsePx(ilStyle.columnGap), SPEC.infoLineGap, 2) });

    const infoText = infoLine.locator("p").first();
    const itStyle = await infoText.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight, color: cs.color };
    });
    results.push({ label: "G2 infoText.fontSize", actual: parsePx(itStyle.fontSize), expected: SPEC.infoFont, tolerance: 1, pass: within(parsePx(itStyle.fontSize), SPEC.infoFont, 1) });
    results.push({ label: "G2 infoText.lineHeight", actual: parsePx(itStyle.lineHeight), expected: SPEC.infoLineHeightPx, tolerance: 1, pass: within(parsePx(itStyle.lineHeight), SPEC.infoLineHeightPx, 1) });
    results.push({ label: "G2 infoText.fontWeight", actual: Number(itStyle.fontWeight), expected: SPEC.infoFontWeight, tolerance: 0, pass: Number(itStyle.fontWeight) === SPEC.infoFontWeight });

    // copyright (left col 두번째 자식)
    const copyright = leftCol.locator("> p").first();
    const cpStyle = await copyright.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { fontSize: cs.fontSize, color: cs.color, fontWeight: cs.fontWeight, whiteSpace: cs.whiteSpace };
    });
    results.push({ label: "G2 copyright.fontSize", actual: parsePx(cpStyle.fontSize), expected: SPEC.copyrightFont, tolerance: 1, pass: within(parsePx(cpStyle.fontSize), SPEC.copyrightFont, 1) });
    results.push({ label: "G2 copyright.fontWeight", actual: Number(cpStyle.fontWeight), expected: SPEC.copyrightFontWeight, tolerance: 0, pass: Number(cpStyle.fontWeight) === SPEC.copyrightFontWeight });

    // right nav
    const rightNav = page.locator('nav[aria-label="푸터 메뉴"]');
    const rnStyle = await rightNav.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { columnGap: cs.columnGap, height: cs.height };
    });
    results.push({ label: "G2 rightNav.columnGap", actual: parsePx(rnStyle.columnGap), expected: SPEC.rightNavGap, tolerance: 2, pass: within(parsePx(rnStyle.columnGap), SPEC.rightNavGap, 2) });
    results.push({ label: "G2 rightNav.height", actual: parsePx(rnStyle.height), expected: SPEC.rightNavHeight, tolerance: 2, pass: within(parsePx(rnStyle.height), SPEC.rightNavHeight, 2) });

    const navLink = rightNav.locator("a").first();
    const nlStyle = await navLink.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { fontWeight: cs.fontWeight, fontSize: cs.fontSize, color: cs.color };
    });
    results.push({ label: "G2 navLink.fontWeight", actual: Number(nlStyle.fontWeight), expected: SPEC.navLinkFontWeight, tolerance: 0, pass: Number(nlStyle.fontWeight) === SPEC.navLinkFontWeight });
    results.push({ label: "G2 navLink.fontSize", actual: parsePx(nlStyle.fontSize), expected: SPEC.infoFont, tolerance: 1, pass: within(parsePx(nlStyle.fontSize), SPEC.infoFont, 1) });

    // watermark
    const watermark = footer.locator("> div").nth(1);
    const wmStyle = await watermark.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { height: cs.height, width: cs.width };
    });
    results.push({ label: "G2 watermark.height", actual: parsePx(wmStyle.height), expected: SPEC.watermarkHeight, tolerance: 2, pass: within(parsePx(wmStyle.height), SPEC.watermarkHeight, 2) });
    results.push({ label: "G2 watermark.width", actual: parsePx(wmStyle.width), expected: SPEC.watermarkWidth, tolerance: 2, pass: within(parsePx(wmStyle.width), SPEC.watermarkWidth, 2) });

    // ========== G3 에셋 ==========
    const imgs = await page.$$eval("footer img", (els) =>
      (els as HTMLImageElement[]).map((im) => ({
        src: im.src,
        naturalWidth: im.naturalWidth,
        naturalHeight: im.naturalHeight,
        alt: im.alt,
      })),
    );
    imgs.forEach((im, i) => {
      results.push({
        label: `G3 img[${i}] naturalWidth (${im.alt || "no-alt"} ${im.src.split("/").pop()})`,
        actual: im.naturalWidth,
        expected: ">0",
        tolerance: 0,
        pass: im.naturalWidth > 0,
      });
    });
    // divider 6개 (Line1 ×2, Line3 ×1, 우측 네비 ×3) + 워터마크 1 = 7개
    results.push({ label: "G3 img count", actual: imgs.length, expected: 7, tolerance: 0, pass: imgs.length === 7 });

    // ========== G4 색상 ==========
    results.push({ label: "G4 footer.backgroundColor", actual: fStyle.backgroundColor, expected: SPEC.bg, tolerance: 0, pass: fStyle.backgroundColor === SPEC.bg });
    results.push({ label: "G4 infoText.color", actual: itStyle.color, expected: SPEC.white, tolerance: 0, pass: itStyle.color === SPEC.white });
    results.push({ label: "G4 copyright.color", actual: cpStyle.color, expected: SPEC.copyrightColor, tolerance: 0, pass: cpStyle.color === SPEC.copyrightColor });
    results.push({ label: "G4 navLink.color", actual: nlStyle.color, expected: SPEC.white, tolerance: 0, pass: nlStyle.color === SPEC.white });

    // 출력
    console.log("");
    console.log("================ Footer Section — G2/G3/G4 ================");
    let passCount = 0;
    for (const r of results) {
      const mark = r.pass ? "PASS" : "FAIL";
      console.log(`[${mark}] ${r.label}  actual=${r.actual}  expected=${r.expected}  tol=±${r.tolerance}`);
      if (r.pass) passCount++;
    }
    console.log("-----------------------------------------------------------");
    console.log(`summary: ${passCount}/${results.length} pass`);
    console.log("footerBox (page-level):", fBox);
    console.log("===========================================================");

    return passCount === results.length ? 0 : 1;
  } finally {
    await browser.close();
  }
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    console.error(e);
    process.exit(2);
  });
