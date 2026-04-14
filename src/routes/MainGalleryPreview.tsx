import { MainGallery } from "@/components/sections/MainGallery";

/**
 * __preview/main-gallery — G1 픽셀 비교용 격리 라우트.
 * 1920×1888 풀폭. baseline: figma-screenshots/main-gallery.png (1920×1888).
 *
 * 외곽 wrapper는 `bg-white`. 섹션 내부에 `#0c3b0e` 기반 BG + blend 오버레이.
 */
export function MainGalleryPreview() {
  return (
    <div className="bg-white">
      <MainGallery />
    </div>
  );
}
