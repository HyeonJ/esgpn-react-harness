import { MainHero } from "@/components/sections/MainHero";

/**
 * __preview/main-hero — G1 픽셀 비교용 격리 라우트.
 * Header/Footer 없이 Hero 단독 렌더 → baseline (figma-screenshots/main-hero.png)과 1:1 비교.
 */
export function MainHeroPreview() {
  return (
    <div className="w-[1920px] min-h-[1040px] mx-auto">
      <MainHero />
    </div>
  );
}
