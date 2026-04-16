import { ContestBenefits } from "@/components/sections/ContestBenefits";

/**
 * /__preview/contest-benefits — G1 픽셀 비교용 격리 라우트.
 *
 * Baseline: figma-screenshots/contest-benefits.png (1416×969).
 * 섹션은 mx-auto max-w-[1416px]로 자기정렬 (1920 viewport 중앙정렬).
 * clip 필수: --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969
 */
export function ContestBenefitsPreview() {
  return (
    <div className="bg-white">
      <ContestBenefits />
    </div>
  );
}
