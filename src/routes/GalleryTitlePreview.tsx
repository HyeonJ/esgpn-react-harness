import { GalleryTitle } from "@/components/sections/GalleryTitle";

/**
 * __preview/gallery-title — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/gallery-title.png (936×124).
 * 섹션 자체가 w-[936px] mx-auto → 1920 viewport 중앙정렬 → clip 492,0,936,124.
 */
export function GalleryTitlePreview() {
  return <GalleryTitle />;
}
