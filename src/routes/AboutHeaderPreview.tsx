import { AboutHeader } from "@/components/sections/AboutHeader";

/**
 * __preview/about-header — G1 픽셀 비교용 격리 라우트.
 *
 * v3: AboutHeader 섹션은 Header fixed clearance 위해 pt-[169px] + h-[542px] 내장.
 * Preview에서는 Header 없으므로 첫 88px(Header 영역)을 negative margin으로 가려
 * baseline(1920×454, about-full.png y=88 crop)과 1:1 비교 가능.
 */
export function AboutHeaderPreview() {
  return (
    <div className="w-[1920px] h-[454px] overflow-hidden mx-auto bg-white">
      <div className="-mt-[88px]">
        <AboutHeader />
      </div>
    </div>
  );
}
