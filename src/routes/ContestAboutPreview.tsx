import { ContestAbout } from "@/components/sections/ContestAbout";

/**
 * __preview/contest-about — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/contest-about.png (1416×459).
 * 섹션이 1416 너비 content이므로 그대로 렌더. clip 불필요.
 */
export function ContestAboutPreview() {
  return (
    <div className="w-[1416px] mx-auto bg-white">
      <ContestAbout />
    </div>
  );
}
