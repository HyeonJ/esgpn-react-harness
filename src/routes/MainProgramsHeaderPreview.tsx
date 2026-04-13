import { MainProgramsHeader } from "@/components/sections/MainProgramsHeader";

/**
 * __preview/main-programs-header — G1 픽셀 비교용 격리 라우트.
 * 1416×261 단독 렌더 → baseline(figma-screenshots/main-programs-header.png) 1:1.
 * clip 파라미터 불필요.
 */
export function MainProgramsHeaderPreview() {
  return (
    <div className="w-[1416px] min-h-[261px] mx-auto">
      <MainProgramsHeader />
    </div>
  );
}
