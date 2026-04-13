/**
 * capture.ts — Playwright 기반 단일 URL 캡처.
 *
 * 뷰포트: 1920 고정 폭, 높이는 fullPage.
 * 폰트 로드/이미지 로드/motion-reduce까지 대기 후 캡처.
 */
import { chromium, type Browser, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export type CaptureOptions = {
  url: string;
  outPath: string;
  viewportWidth?: number;
  viewportHeight?: number;
  fullPage?: boolean;
  clip?: { x: number; y: number; width: number; height: number };
};

export async function captureUrl(opts: CaptureOptions): Promise<void> {
  const width = opts.viewportWidth ?? 1920;
  const height = opts.viewportHeight ?? 1080;

  mkdirSync(dirname(opts.outPath), { recursive: true });

  const browser: Browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      locale: "ko-KR",
      timezoneId: "Asia/Seoul",
      reducedMotion: "reduce",
    });
    const page: Page = await context.newPage();

    await page.goto(opts.url, { waitUntil: "networkidle", timeout: 30_000 });
    // 폰트 로드 완료 대기
    await page.evaluate(() => document.fonts.ready);
    // 이미지 lazy-load 강제 로드 (스크롤 한번)
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let y = 0;
        const step = 400;
        const timer = setInterval(() => {
          window.scrollTo(0, y);
          y += step;
          if (y >= document.body.scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 50);
      });
    });
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: opts.outPath,
      fullPage: opts.fullPage ?? true,
      clip: opts.clip,
      type: "png",
    });
  } finally {
    await browser.close();
  }
}
