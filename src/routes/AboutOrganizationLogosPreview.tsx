import { AboutOrganizationLogos } from "@/components/sections/AboutOrganizationLogos";

/**
 * __preview/about-organization-logos — G1 픽셀 비교용 격리 라우트.
 * baseline figma-screenshots/about-organization-logos.png (1920×300)과 1:1 비교.
 */
export function AboutOrganizationLogosPreview() {
  return (
    <div className="w-[1920px] min-h-[300px] mx-auto bg-white">
      <AboutOrganizationLogos />
    </div>
  );
}
