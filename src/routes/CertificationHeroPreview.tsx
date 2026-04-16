import { CertificationHero } from "@/components/sections/CertificationHero";

/**
 * Isolated preview route for visual regression testing.
 *
 * Baseline `figma-screenshots/certification-hero.png` is 1920×827 (full-page crop 0~827).
 * CertificationHero section is exactly 1920×827 with overflow-hidden, so no
 * extra preview padding is needed — overflow-hidden clips the circle's top (-300).
 */
export function CertificationHeroPreview() {
  return (
    <div className="mx-auto w-[1920px] bg-white">
      <CertificationHero />
    </div>
  );
}
