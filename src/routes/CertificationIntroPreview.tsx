import { CertificationIntro } from "@/components/sections/CertificationIntro";

/**
 * Isolated preview route for visual regression testing.
 *
 * Baseline `figma-screenshots/certification-intro.png` is 1416×291.
 * Section is self-centering (mx-auto max-w-[1416px]).
 * Preview wrapper provides 1920px full-viewport stage (matches Figma canvas).
 */
export function CertificationIntroPreview() {
  return (
    <div className="mx-auto w-[1920px] bg-white">
      <CertificationIntro />
    </div>
  );
}
