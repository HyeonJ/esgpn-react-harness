import { MainProgramsHeader } from "@/components/sections/MainProgramsHeader";

/**
 * Isolated preview route for visual regression testing.
 * No Header/Footer -- matches baseline PNG (pure section only).
 * 1920 viewport, section is 1416 mx-auto centered (x=252).
 * bg-white wrapper ensures alpha=0 areas match Framelink baseline.
 */
export function MainProgramsHeaderPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <MainProgramsHeader />
    </div>
  );
}
