import { ContestBenefits } from "@/components/sections/ContestBenefits";

/**
 * __preview/contest-benefits — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/contest-benefits.png (1416×969).
 * 섹션 1416 content, 1920 viewport 중앙정렬 → clip 필수
 *   --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969
 */
export function ContestBenefitsPreview() {
  return (
    <div className="w-[1416px] mx-auto bg-white">
      <ContestBenefits />
    </div>
  );
}
