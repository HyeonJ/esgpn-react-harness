import { AboutValues } from "@/components/sections/AboutValues";

/**
 * /__preview/about-values — G1 캡처용 격리 라우트.
 * bg-white wrapper, Header/Footer 제외 (docs §6.1).
 */
export function AboutValuesPreview() {
  return (
    <div className="w-[1920px] min-h-[722px] mx-auto bg-white">
      <AboutValues />
    </div>
  );
}
