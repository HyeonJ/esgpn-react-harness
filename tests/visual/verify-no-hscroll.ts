/**
 * verify-no-hscroll.ts — 1920 네이티브 모니터 가로스크롤바 검증.
 *
 * 각 라우트를 viewport 1903 (= 1920 - 17px 세로스크롤바) 에서 로드하고
 * document.documentElement.scrollWidth <= 1903 인지 체크한다.
 * 1903보다 크면 가로스크롤이 발생하는 것이므로 FAIL 로 리포트.
 *
 * 실행: npx tsx tests/visual/verify-no-hscroll.ts
 */
import { chromium, type Browser } from "@playwright/test";

const BASE = "http://localhost:5173";
const ROUTES = [
  "/",
  "/about",
  "/about/organization",
  "/contest",
  "/certification",
  "/news",
  "/news/1",
  "/gallery",
  "/contact",
];

const VIEWPORT_WIDTH = 1903; // 1920 - 17(scrollbar)
const VIEWPORT_HEIGHT = 1080;

type Result = {
  route: string;
  scrollWidth: number;
  clientWidth: number;
  pass: boolean;
};

async function main(): Promise<void> {
  const browser: Browser = await chromium.launch();
  const results: Result[] = [];

  try {
    const context = await browser.newContext({
      viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
      deviceScaleFactor: 1,
      locale: "ko-KR",
      timezoneId: "Asia/Seoul",
      reducedMotion: "reduce",
    });

    for (const route of ROUTES) {
      const page = await context.newPage();
      const url = `${BASE}${route}`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
        await page.evaluate(() => document.fonts.ready);
        // 이미지 로드 안정화
        await page.waitForTimeout(400);

        const metrics = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        const pass = metrics.scrollWidth <= VIEWPORT_WIDTH;
        results.push({
          route,
          scrollWidth: metrics.scrollWidth,
          clientWidth: metrics.clientWidth,
          pass,
        });
      } catch (err) {
        results.push({
          route,
          scrollWidth: -1,
          clientWidth: -1,
          pass: false,
        });
        console.error(`[ERROR] ${route}:`, err);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  console.log("\n=== verify-no-hscroll @ viewport 1903 ===");
  for (const r of results) {
    const tag = r.pass ? "PASS" : "FAIL";
    console.log(
      `[${tag}] ${r.route.padEnd(24)} scrollWidth=${r.scrollWidth} clientWidth=${r.clientWidth}`
    );
  }
  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} PASS`);
  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
