import { AboutVision } from "@/components/sections/AboutVision";

/**
 * Isolated preview route for visual regression testing.
 * No Header/Footer — matches baseline PNG (pure section only).
 * bg-white wrapper ensures opaque white regions match Framelink baseline.
 */
export function AboutVisionPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <AboutVision />
    </div>
  );
}
