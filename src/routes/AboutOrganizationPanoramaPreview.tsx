import { AboutOrganizationPanorama } from "@/components/sections/AboutOrganizationPanorama";

/**
 * Isolated preview route for visual regression testing.
 * No Header/Footer — matches baseline PNG (pure section only).
 * bg-white wrapper ensures alpha=0 areas match Framelink baseline.
 */
export function AboutOrganizationPanoramaPreview() {
  return (
    <div className="w-[1920px] h-[440px] mx-auto bg-white overflow-hidden">
      <AboutOrganizationPanorama />
    </div>
  );
}
