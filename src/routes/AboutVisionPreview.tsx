import { AboutVision } from "@/components/sections/AboutVision";

/**
 * /__preview/about-vision — G1 캡처용 격리 라우트.
 * bg-white wrapper, Header/Footer 제외 (docs §6.1).
 */
export function AboutVisionPreview() {
  return (
    <div className="w-[1920px] min-h-[783px] mx-auto bg-white">
      <AboutVision />
    </div>
  );
}
