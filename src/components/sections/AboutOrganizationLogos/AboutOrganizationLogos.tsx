import { HatchedDivider } from "@/components/ui/HatchedDivider";
import { PartnerLogoRow } from "./PartnerLogoRow";

/**
 * AboutOrganizationLogos — /about/organization 2번째 섹션 (운영주체 로고).
 * research/about-organization-logos.md / plan/about-organization-logos.md 기반.
 * baseline: figma-screenshots/about-organization-logos.png (1920×300).
 *
 * 수직 구성 (섹션 내부 좌표, full y=190 기준):
 *   divider "운영주체": 내부 y=84  (full y=274)
 *   로고 row:           내부 y=139 (full y=329)
 *   섹션 하단:          내부 y=300
 */
export function AboutOrganizationLogos() {
  return (
    <section className="relative max-w-[1920px] w-full h-[300px] bg-white mx-auto">
      {/* HatchedDivider with label */}
      <div className="absolute top-[84px] left-1/2 -translate-x-1/2">
        <HatchedDivider label="운영주체" />
      </div>

      {/* 3 로고 row, 중앙 정렬 */}
      <div className="absolute top-[139px] left-1/2 -translate-x-1/2">
        <PartnerLogoRow />
      </div>
    </section>
  );
}

export default AboutOrganizationLogos;
