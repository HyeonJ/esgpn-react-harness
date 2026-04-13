import { MainProgramsCard1 } from "@/components/sections/MainProgramsCard1";

/**
 * __preview/main-programs-card1 — G1 픽셀 비교용 격리 라우트.
 * 1416×805 단독 렌더 → baseline(figma-screenshots/main-programs-card1.png) 1:1.
 * clip 파라미터 불필요.
 */
export function MainProgramsCard1Preview() {
  return (
    <div className="w-[1416px] h-[805px] mx-auto bg-white">
      <MainProgramsCard1 />
    </div>
  );
}
