import { GalleryAgreements } from "@/components/sections/GalleryAgreements";

/**
 * Isolated preview route for visual regression testing.
 * bg-white wrapper ensures alpha=0 areas match baseline.
 * Section 자기정렬 (mx-auto w-[936px]) → 1920 viewport 중앙 936 영역.
 * 측정 시 clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 1024
 */
export function GalleryAgreementsPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <GalleryAgreements />
    </div>
  );
}
