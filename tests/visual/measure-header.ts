/**
 * measure-header.ts — Header 섹션 G2/G3/G4 게이트 자동 측정.
 *
 * 사용: npx tsx tests/visual/measure-header.ts
 *
 * 전제: dev 서버가 http://127.0.0.1:5173 에서 실행 중.
 *       /__preview/header 라우트가 장착되어 있어야 함.
 *
 * 측정 항목:
 *   G2 치수: font ±1px, margin/padding/gap ±2px
 *   G3 에셋: 모든 <img> naturalWidth > 0
 *   G4 색상: Figma hex와 computed color 일치
 *
 * G1 (pixelmatch diff) 은 baseline PNG 부재 시 별도 처리 — 이 스크립트에서는 제외.
 */
import { chromium } from "@playwright/test";

type Expected = { label: string; actual: string | number; expected: string | number; tolerance: number; pass: boolean };

const URL = "http://127.0.0.1:5173/__preview/header";

// Figma 스펙 (research/header.md, plan/header.md §8)
const SPEC = {
  headerHeight: 72,
  headerPaddingX: 40,
  headerRadius: 40,
  navGap: 32,
  navItemFont: 14,
  navItemLineHeight: 20,
  navItemPaddingY: 4,
  logoWidth: 98,
  logoHeight: 22,
  menuButtonSize: 40,
  hamburgerWidth: 21,
  hamburgerHeight: 8.75,
  actionsGap: 20,
  // 색상 (RGB로 변환)
  gray900: "rgb(29, 38, 35)", // #1d2623
  blackA100: "rgba(0, 0, 0, 0.04)", // #0000000a
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
    const headerBox = await page.locator('header[role="banner"]').boundingBox();
    const headerStyle = await page.locator('header[role="banner"]').evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        height: cs.height,
        paddingLeft: cs.paddingLeft,
        paddingRight: cs.paddingRight,
        borderTopLeftRadius: cs.borderTopLeftRadius,
        backgroundColor: cs.backgroundColor,
      };
    });
    results.push({ label: "G2 header.height", actual: parsePx(headerStyle.height), expected: SPEC.headerHeight, tolerance: 2, pass: within(parsePx(headerStyle.height), SPEC.headerHeight, 2) });
    results.push({ label: "G2 header.paddingLeft", actual: parsePx(headerStyle.paddingLeft), expected: SPEC.headerPaddingX, tolerance: 2, pass: within(parsePx(headerStyle.paddingLeft), SPEC.headerPaddingX, 2) });
    results.push({ label: "G2 header.paddingRight", actual: parsePx(headerStyle.paddingRight), expected: SPEC.headerPaddingX, tolerance: 2, pass: within(parsePx(headerStyle.paddingRight), SPEC.headerPaddingX, 2) });
    results.push({ label: "G2 header.borderRadius", actual: parsePx(headerStyle.borderTopLeftRadius), expected: SPEC.headerRadius, tolerance: 2, pass: within(parsePx(headerStyle.borderTopLeftRadius), SPEC.headerRadius, 2) });

    // nav gap
    const navGap = await page.locator('nav[aria-label="주 메뉴"]').evaluate((el) => getComputedStyle(el).gap);
    results.push({ label: "G2 nav.gap", actual: parsePx(navGap), expected: SPEC.navGap, tolerance: 2, pass: within(parsePx(navGap), SPEC.navGap, 2) });

    // nav item font/line-height/padding-y
    const firstItem = page.locator('nav[aria-label="주 메뉴"] a').first();
    const navItemStyle = await firstItem.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, color: cs.color };
    });
    results.push({ label: "G2 navItem.fontSize", actual: parsePx(navItemStyle.fontSize), expected: SPEC.navItemFont, tolerance: 1, pass: within(parsePx(navItemStyle.fontSize), SPEC.navItemFont, 1) });
    results.push({ label: "G2 navItem.lineHeight", actual: parsePx(navItemStyle.lineHeight), expected: SPEC.navItemLineHeight, tolerance: 1, pass: within(parsePx(navItemStyle.lineHeight), SPEC.navItemLineHeight, 1) });
    results.push({ label: "G2 navItem.paddingTop", actual: parsePx(navItemStyle.paddingTop), expected: SPEC.navItemPaddingY, tolerance: 2, pass: within(parsePx(navItemStyle.paddingTop), SPEC.navItemPaddingY, 2) });
    results.push({ label: "G2 navItem.paddingBottom", actual: parsePx(navItemStyle.paddingBottom), expected: SPEC.navItemPaddingY, tolerance: 2, pass: within(parsePx(navItemStyle.paddingBottom), SPEC.navItemPaddingY, 2) });

    // 로고 img
    const logoBox = await page.locator('img[alt="ESGPN"]').boundingBox();
    results.push({ label: "G2 logo.width", actual: logoBox?.width ?? 0, expected: SPEC.logoWidth, tolerance: 2, pass: within(logoBox?.width ?? 0, SPEC.logoWidth, 2) });
    results.push({ label: "G2 logo.height", actual: logoBox?.height ?? 0, expected: SPEC.logoHeight, tolerance: 2, pass: within(logoBox?.height ?? 0, SPEC.logoHeight, 2) });

    // 햄버거 버튼 40x40
    const menuBtnBox = await page.locator('button[aria-label="메뉴 열기"]').boundingBox();
    results.push({ label: "G2 menuButton.width", actual: menuBtnBox?.width ?? 0, expected: SPEC.menuButtonSize, tolerance: 2, pass: within(menuBtnBox?.width ?? 0, SPEC.menuButtonSize, 2) });
    results.push({ label: "G2 menuButton.height", actual: menuBtnBox?.height ?? 0, expected: SPEC.menuButtonSize, tolerance: 2, pass: within(menuBtnBox?.height ?? 0, SPEC.menuButtonSize, 2) });

    // 햄버거 SVG 내부 크기
    const hamburgerBox = await page.locator('button[aria-label="메뉴 열기"] img').boundingBox();
    results.push({ label: "G2 hamburger.width", actual: hamburgerBox?.width ?? 0, expected: SPEC.hamburgerWidth, tolerance: 2, pass: within(hamburgerBox?.width ?? 0, SPEC.hamburgerWidth, 2) });
    results.push({ label: "G2 hamburger.height", actual: hamburgerBox?.height ?? 0, expected: SPEC.hamburgerHeight, tolerance: 2, pass: within(hamburgerBox?.height ?? 0, SPEC.hamburgerHeight, 2) });

    // 우측 액션 블록 gap
    const actionsGap = await page.locator('header[role="banner"] > div').last().evaluate((el) => getComputedStyle(el).gap);
    results.push({ label: "G2 actions.gap", actual: parsePx(actionsGap), expected: SPEC.actionsGap, tolerance: 2, pass: within(parsePx(actionsGap), SPEC.actionsGap, 2) });

    // ========== G3 에셋 ==========
    const imgs = await page.$$eval("header img", (els) => (els as HTMLImageElement[]).map((im) => ({
      src: im.src, naturalWidth: im.naturalWidth, naturalHeight: im.naturalHeight, alt: im.alt,
    })));
    imgs.forEach((im, i) => {
      results.push({ label: `G3 img[${i}] naturalWidth (${im.alt || "no-alt"} ${im.src.split("/").pop()})`, actual: im.naturalWidth, expected: ">0", tolerance: 0, pass: im.naturalWidth > 0 });
    });
    results.push({ label: "G3 img count", actual: imgs.length, expected: 2, tolerance: 0, pass: imgs.length === 2 });

    // ========== G4 색상 ==========
    // header 배경
    const headerBg = headerStyle.backgroundColor;
    // rgba(0,0,0,0.04) 은 브라우저가 보통 "rgba(0, 0, 0, 0.04)" 로 정규화
    const bgOk = /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.04\s*\)/.test(headerBg);
    results.push({ label: "G4 header.backgroundColor", actual: headerBg, expected: SPEC.blackA100, tolerance: 0, pass: bgOk });

    // nav item color
    const navItemColorOk = navItemStyle.color === SPEC.gray900;
    results.push({ label: "G4 navItem.color", actual: navItemStyle.color, expected: SPEC.gray900, tolerance: 0, pass: navItemColorOk });

    // 고객센터 color
    const contactColor = await page.locator('header a[href="/contact"]').evaluate((el) => getComputedStyle(el).color);
    results.push({ label: "G4 contact.color", actual: contactColor, expected: SPEC.gray900, tolerance: 0, pass: contactColor === SPEC.gray900 });

    // 햄버거 버튼 배경
    const btnBg = await page.locator('button[aria-label="메뉴 열기"]').evaluate((el) => getComputedStyle(el).backgroundColor);
    const btnBgOk = /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.04\s*\)/.test(btnBg);
    results.push({ label: "G4 menuButton.backgroundColor", actual: btnBg, expected: SPEC.blackA100, tolerance: 0, pass: btnBgOk });

    // 출력
    console.log("");
    console.log("================ Header Section — G2/G3/G4 ================");
    let passCount = 0;
    for (const r of results) {
      const mark = r.pass ? "PASS" : "FAIL";
      console.log(`[${mark}] ${r.label}  actual=${r.actual}  expected=${r.expected}  tol=±${r.tolerance}`);
      if (r.pass) passCount++;
    }
    console.log("-----------------------------------------------------------");
    console.log(`summary: ${passCount}/${results.length} pass`);
    console.log("headerBox (page-level):", headerBox);
    console.log("===========================================================");

    return passCount === results.length ? 0 : 1;
  } finally {
    await browser.close();
  }
}

main().then((code) => process.exit(code)).catch((e) => { console.error(e); process.exit(2); });
