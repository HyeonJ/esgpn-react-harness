import { GalleryTitle } from "@/components/sections/GalleryTitle";

/**
 * __preview/gallery-title — G1 픽셀 비교용 격리 라우트.
 *
 * v3: GalleryTitle은 Header clearance 위해 pt-[180px] 내장 (Figma page-y=180).
 * Preview에서는 Header 없으므로 -mt-[180px]로 pt 상쇄, baseline(936×124)과 1:1 비교.
 */
export function GalleryTitlePreview() {
  return (
    <div className="overflow-hidden">
      <div className="-mt-[180px]">
        <GalleryTitle />
      </div>
    </div>
  );
}
