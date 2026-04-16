import { CertificationStats } from "@/components/sections/CertificationStats";

/**
 * Isolated preview route for visual regression testing.
 *
 * Baseline `figma-screenshots/certification-stats.png` is 1920×194, transparent background.
 * Figma 299:3862 자체는 배경 투명이므로 baseline도 흰 배경 위 흰 텍스트 상태.
 * Preview도 흰 배경으로 맞춰 G1 diff는 1px divider 2줄만 비교 대상이 된다.
 */
export function CertificationStatsPreview() {
  return (
    <div className="mx-auto w-[1920px] bg-white">
      <CertificationStats />
    </div>
  );
}
