import { FloatingCity } from "./FloatingCity";
import { FloatingLeafBottom } from "./FloatingLeafBottom";
import { FloatingLeafTop } from "./FloatingLeafTop";
import { ProgramCard } from "./ProgramCard";

/**
 * 메인페이지 Programs Card #1 (ESG마인드 자격검정).
 * Figma 노드: 252:1013 (Group 13), 1416×805 중앙정렬.
 *
 * DOM 순서 (Figma와 동일):
 *   1. FloatingCity (우측 city, absolute)
 *   2. ProgramCard (카드 본체, absolute)
 *   3. FloatingLeafBottom (좌하 leaf, absolute, -24deg)
 *   4. FloatingLeafTop (좌상 leaf, absolute, -12deg)
 *
 * 내부 좌표계: (0, 0) ~ (1416, 805). 페이지 통합 시 x=252에 배치.
 */
interface MainProgramsCard1Props {
  className?: string;
}

export function MainProgramsCard1({ className }: MainProgramsCard1Props) {
  const base = "relative w-[1416px] h-[805px] mx-auto";
  return (
    <section
      className={className ? `${base} ${className}` : base}
      aria-label="ESG마인드 자격검정 프로그램 카드"
      data-node-id="252:1013"
    >
      <FloatingCity />
      <ProgramCard />
      <FloatingLeafBottom />
      <FloatingLeafTop />
    </section>
  );
}
