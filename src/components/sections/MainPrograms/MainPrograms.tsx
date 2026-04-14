import { useState } from "react";
import { MainProgramsHeader } from "@/components/sections/MainProgramsHeader";
import { MainProgramsCard1 } from "@/components/sections/MainProgramsCard1";
import { MainProgramsCard2 } from "@/components/sections/MainProgramsCard2";
import { MainProgramsCard3 } from "@/components/sections/MainProgramsCard3";
import { ProgramsTabs, type ProgramTabId } from "./ProgramsTabs";

/**
 * Programs 슬라이더 래퍼 (MainProgramsHeader + 탭 + active 카드).
 *
 * Figma 디자인 의도: 3개 variant를 탭으로 토글하는 슬라이더.
 * Figma 프레임은 디자인 가시성을 위해 3 카드를 세로 누적 export하지만,
 * 실제 UX는 한 번에 1 카드만 visible. 탭 클릭으로 전환.
 *
 * 기존 개별 섹션 컴포넌트(MainProgramsCard1/2/3)는 그대로 재사용 —
 * 격리 preview 라우트(/__preview/main-programs-card{1,2,3})도 유지.
 */
export function MainPrograms() {
  const [active, setActive] = useState<ProgramTabId>(1);

  return (
    <>
      <MainProgramsHeader />
      <div className="w-full flex justify-center" style={{ paddingBottom: 24 }}>
        <ProgramsTabs active={active} onSelect={setActive} />
      </div>
      {active === 1 && <MainProgramsCard1 />}
      {active === 2 && <MainProgramsCard2 />}
      {active === 3 && <MainProgramsCard3 />}
    </>
  );
}

export default MainPrograms;
