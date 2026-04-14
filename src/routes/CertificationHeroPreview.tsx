import { CertificationHero } from "@/components/sections/CertificationHero";

/**
 * __preview/certification-hero — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/certification-hero.png (1920×633, full-page 0~633 crop).
 * Preview에 TopNav 없으므로 baseline 상단 88px (TopNav 영역) 차이 ACCEPTED.
 * 풀폭 1920이라 clip 불필요.
 */
export function CertificationHeroPreview() {
  return <CertificationHero />;
}
