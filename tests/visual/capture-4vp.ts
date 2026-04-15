/**
 * capture-4vp.ts — 4뷰포트 (375/768/1440/1920) 스크린샷 일괄 캡처.
 *
 * 사용:
 *   npx tsx tests/visual/capture-4vp.ts "/main" main-final
 *   → docs/v3-refactor-screenshots/main-final-{mobile-375,tablet-768,laptop-1440,desktop-1920}.png
 *
 * 옵션:
 *   --outdir <경로>  : 출력 디렉토리 변경 (기본 docs/v3-refactor-screenshots)
 *   --open            : 모바일/태블릿에서 드로어 연 상태 캡처 (햄버거 버튼 자동 클릭)
 *   --suffix-open <s> : --open 시 파일명에 붙일 suffix (기본 "-open")
 */
import { chromium, type Browser } from "@playwright/test";
import { mkdirSync } from "node:fs";

const VIEWPORTS = [
  { label: "mobile-375", width: 375, height: 812 },
  { label: "tablet-768", width: 768, height: 1024 },
  { label: "laptop-1440", width: 1440, height: 900 },
  { label: "desktop-1920", width: 1920, height: 1080 },
] as const;

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
function flag(name: string): boolean {
  return process.argv.includes(name);
}

const positional = process.argv.slice(2).filter((a) => !a.startsWith("--"));
// 간단 파싱: 첫번째 비옵션 = route, 두번째 = prefix
const route = positional[0] ?? "/";
const prefix = positional[1] ?? "capture";
const outdir = arg("--outdir") ?? "docs/v3-refactor-screenshots";
const openDrawer = flag("--open");
const suffixOpen = arg("--suffix-open") ?? "-open";

mkdirSync(outdir, { recursive: true });

const baseUrl = "http://127.0.0.1:5173";

async function capture(browser: Browser, vp: (typeof VIEWPORTS)[number]) {
  // desktop-1920은 드로어 열기 대상 아님 — 스킵
  if (openDrawer && vp.width >= 1280) return;

  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(baseUrl + route, { waitUntil: "networkidle", timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);

  if (openDrawer) {
    // 햄버거 버튼 클릭 (aria-label로 탐색)
    const btn = page.locator('button[aria-label="메뉴 열기"]').first();
    await btn.click({ timeout: 5000 });
    await page.waitForTimeout(150);
  }

  const suffix = openDrawer ? suffixOpen : "";
  const outPath = `${outdir}/${prefix}-${vp.label}${suffix}.png`;
  await page.screenshot({ path: outPath, fullPage: !openDrawer, type: "png" });
  console.log(`captured: ${outPath}`);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  try {
    for (const vp of VIEWPORTS) await capture(browser, vp);
  } finally {
    await browser.close();
  }
})();
