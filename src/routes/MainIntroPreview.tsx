import { MainIntro } from "@/components/sections/MainIntro";

/**
 * __preview/main-intro — G1 픽셀 비교용 격리 라우트.
 * Header/Footer 없이 단독 렌더 → baseline (figma-screenshots/main-intro.png) 1:1 비교.
 */
export function MainIntroPreview() {
  return (
    <div className="w-[1920px] min-h-[1040px] mx-auto">
      <MainIntro />
    </div>
  );
}
