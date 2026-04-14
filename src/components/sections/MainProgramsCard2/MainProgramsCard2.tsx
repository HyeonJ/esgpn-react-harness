import { FloatingCityLeft } from "./FloatingCityLeft";
import { FloatingCityMidRight } from "./FloatingCityMidRight";
import { FloatingCityTopRight } from "./FloatingCityTopRight";
import { ProgramCard } from "./ProgramCard";

/**
 * 메인페이지 Programs Card #2 (ESG 실천 아이디어 경진대회).
 * Figma 노드: 252:1066 (Group 14), 1416×805 중앙정렬.
 *
 * DOM 순서 (Figma와 동일):
 *   1. FloatingCityLeft (좌측 큰 city, -16deg baked-in, absolute)
 *   2. FloatingCityMidRight (우측 중간 city 타일, 직립, absolute)
 *   3. ProgramCard (카드 본체, absolute)
 *   4. FloatingCityTopRight (우측 상단 작은 city 타일, 직립, absolute)
 *
 * 내부 좌표계: (0, 0) ~ (1416, 805). 페이지 통합 시 x=252에 배치.
 */
interface MainProgramsCard2Props {
  className?: string;
}

export function MainProgramsCard2({ className }: MainProgramsCard2Props) {
  const base = "relative w-[1416px] h-[805px] mx-auto";
  return (
    <section
      className={className ? `${base} ${className}` : base}
      aria-label="ESG 실천 아이디어 경진대회 프로그램 카드"
      data-node-id="252:1066"
    >
      <FloatingCityLeft />
      <FloatingCityMidRight />
      <ProgramCard />
      <FloatingCityTopRight />
    </section>
  );
}
