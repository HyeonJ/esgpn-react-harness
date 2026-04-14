import { ContestHero } from "@/components/sections/ContestHero";

/**
 * __preview/contest-hero — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/contest-hero.png (1920×1134).
 *
 * 섹션 자체는 h=818이나 상단 316px(큰 원) overflow가 있어 baseline은 1134.
 * 래퍼 pt-316으로 overflow 영역을 캡처 가능한 영역에 포함한다
 * (섹션은 overflow-visible이므로 pt padding이 있는 흰 영역 위로 원이 올라와 보임).
 */
export function ContestHeroPreview() {
  return (
    <div
      className="w-[1920px] mx-auto bg-white"
      style={{ paddingTop: 316, overflow: "visible" }}
    >
      <ContestHero />
    </div>
  );
}
