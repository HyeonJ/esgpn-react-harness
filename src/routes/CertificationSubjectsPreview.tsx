import { CertificationSubjects } from "@/components/sections/CertificationSubjects";

/**
 * Isolated preview route for visual regression testing.
 *
 * Baseline `figma-screenshots/certification-subjects.png` would be 1416×411.
 * Section is self-centering (mx-auto max-w-[1416px]).
 * Preview wrapper provides 1920px full-viewport stage (matches Figma canvas).
 *
 * clip for capture: --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 411
 */
export function CertificationSubjectsPreview() {
  return (
    <div className="mx-auto w-[1920px] bg-white">
      <CertificationSubjects />
    </div>
  );
}
