import { AboutHeader } from "@/components/sections/AboutHeader";

/**
 * __preview/about-header — G1 픽셀 비교용 격리 라우트.
 * Header/Footer 없이 단독 렌더 → baseline (figma-screenshots/about-header.png, 1920×454)과 1:1 비교.
 */
export function AboutHeaderPreview() {
  return (
    <div className="w-[1920px] min-h-[454px] mx-auto bg-white">
      <AboutHeader />
    </div>
  );
}
