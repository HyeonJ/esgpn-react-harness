import { ContestAbout } from "@/components/sections/ContestAbout";

/**
 * Isolated preview route for visual regression testing.
 * bg-white wrapper ensures alpha=0 areas match baseline.
 * Section 자기정렬 (mx-auto max-w-[1416px]) → 1920 viewport 중앙 1416 영역.
 * 측정 시 clip: --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 459
 */
export function ContestAboutPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <ContestAbout />
    </div>
  );
}
