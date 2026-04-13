/**
 * playwright.config.ts — test 러너는 아직 사용하지 않고 직접 chromium API 호출 중이지만,
 * 향후 @playwright/test 기반 E2E 도입 시 참조될 공통 설정 파일.
 */
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  timeout: 60_000,
  use: {
    headless: true,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
    viewport: { width: 1920, height: 1080 },
    reducedMotion: "reduce",
  },
});
