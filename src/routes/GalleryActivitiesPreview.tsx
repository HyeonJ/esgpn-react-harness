import { GalleryActivities } from "@/components/sections/GalleryActivities";

/**
 * __preview/gallery-activities — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/gallery-activities.png (937×519).
 * 섹션 w-[936px] mx-auto → 1920 viewport 중앙정렬 → clip 491,0,937,519.
 */
export function GalleryActivitiesPreview() {
  return <GalleryActivities />;
}
