import { MainNews } from "@/components/sections/MainNews";

/**
 * __preview/main-news — G1 픽셀 비교용 격리 라우트.
 * 1920×1040 풀폭. baseline: figma-screenshots/main-news.png (1920×1040).
 *
 * 외곽 wrapper는 `bg-white` (docs §6.1 규칙). 섹션 자체가 `#f3f3f3` 배경 보유.
 */
export function MainNewsPreview() {
  return (
    <div className="bg-white">
      <MainNews />
    </div>
  );
}
