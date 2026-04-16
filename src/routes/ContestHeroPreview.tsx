import { ContestHero } from "@/components/sections/ContestHero";

/**
 * Isolated preview route for visual regression testing.
 *
 * Baseline `figma-screenshots/contest-hero.png` is 1920×1134:
 *   - Figma frame 299:4807: 818px logical height
 *   - Circle (956×956) bottom-aligned inside inner Frame (1113×640)
 *     → 956 - 640 = 316px visual overflow above the frame
 *   - Framelink renders full bounding box → 818 + 316 = 1134
 *
 * Preview wrapper adds 316px top padding so that the page scrollHeight
 * matches the baseline, and the overflowing circle renders fully.
 */
export function ContestHeroPreview() {
  return (
    <div
      className="mx-auto w-[1920px] bg-white overflow-visible"
      style={{ paddingTop: 316 }}
    >
      <ContestHero />
    </div>
  );
}
