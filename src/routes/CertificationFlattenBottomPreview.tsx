import { CertificationFlattenBottom } from "@/components/sections/CertificationFlattenBottom";

/**
 * /__preview/certification-flatten-bottom — G1 픽셀 비교용 격리 라우트.
 *
 * Baseline: figma-screenshots/certification-flatten-bottom.png (1920×2149).
 * 섹션 자체가 풀폭 1920 — clip 불필요, compare-section.sh로 직접 비교 가능.
 */
export function CertificationFlattenBottomPreview() {
  return (
    <div className="bg-white">
      <CertificationFlattenBottom />
    </div>
  );
}
