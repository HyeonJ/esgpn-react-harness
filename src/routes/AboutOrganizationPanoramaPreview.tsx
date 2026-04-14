import { AboutOrganizationPanorama } from "@/components/sections/AboutOrganizationPanorama";

/**
 * /__preview/about-organization-panorama — G1 캡처용 격리 라우트.
 * bg-white wrapper, Header/Footer 제외 (docs §6.1).
 */
export function AboutOrganizationPanoramaPreview() {
  return (
    <div className="w-[1920px] min-h-[440px] mx-auto bg-white">
      <AboutOrganizationPanorama />
    </div>
  );
}
