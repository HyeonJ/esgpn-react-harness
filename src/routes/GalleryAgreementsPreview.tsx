import { GalleryAgreements } from "@/components/sections/GalleryAgreements";

/**
 * __preview/gallery-agreements — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/gallery-agreements.png (937×1024).
 * 섹션 w-[936px] mx-auto → 1920 viewport 중앙정렬 → clip 492,0,937,1024.
 */
export function GalleryAgreementsPreview() {
  return <GalleryAgreements />;
}
