import { AboutHeader } from "@/components/sections/AboutHeader";

/**
 * Isolated preview route for visual regression testing.
 * No Header/Footer -- matches baseline PNG (pure section only).
 * bg-white wrapper ensures alpha=0 areas match Framelink baseline.
 */
export function AboutHeaderPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <AboutHeader />
    </div>
  );
}
