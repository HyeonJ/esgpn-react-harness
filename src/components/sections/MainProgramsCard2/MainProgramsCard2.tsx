import { ProgramCard } from "@/components/ui/ProgramCard";
import { FloatingCityLeft } from "./FloatingCityLeft";
import { FloatingCityMidRight } from "./FloatingCityMidRight";
import { FloatingCityTopRight } from "./FloatingCityTopRight";
import progressBar from "@/assets/main-programs-card2/progress-bar.svg";
import dividerDashed from "@/assets/main-programs-card2/divider-dashed.svg";
import arrowChevron from "@/assets/main-programs-card2/arrow-chevron.svg";
import iconPoint from "@/assets/main-programs-card2/icon-point.svg";

/**
 * 메인페이지 Programs Card #2 (ESG 실천 아이디어 경진대회).
 * Figma 노드: 252:1066 (Group 14), 1416×805 중앙정렬.
 *
 * 공통 ProgramCard(ui/ProgramCard.tsx)를 사용. decoration 3종은 섹션 로컬 유지.
 *
 * DOM 순서 (Figma와 동일):
 *   1. FloatingCityLeft (-16deg baked-in)
 *   2. FloatingCityMidRight (upright)
 *   3. ProgramCard (카드 본체)
 *   4. FloatingCityTopRight (upright)
 */
interface MainProgramsCard2Props {
  className?: string;
}

export function MainProgramsCard2({ className }: MainProgramsCard2Props) {
  const base = "relative max-w-[1416px] w-full h-[805px] mx-auto";
  return (
    <section
      className={className ? `${base} ${className}` : base}
      aria-label="ESG 실천 아이디어 경진대회 프로그램 카드"
      data-node-id="252:1066"
    >
      <FloatingCityLeft />
      <FloatingCityMidRight />
      <ProgramCard
        outerBg="#0C173B"
        ctaBg="#A5D9FF"
        ctaTextColor="#0C173B"
        checklistBulletColor="#3F9FFF"
        pointsBulletColor="#2D7EFF"
        title="ESG 실천 아이디어 경진대회"
        checklist={[
          "ESG를 아이디어 → 실행 → 사회적 가치로 연결하는 실천형 프로그램",
          "ESG 실천을 위한 기관의 역할과 ESG에 필요한 교육 생태계 구축을 목적으로 개발",
        ]}
        points={[
          { icon: iconPoint, text: "SDGs · ESG 기반 현장 문제해결" },
          { icon: iconPoint, text: "대학 · 청년 · 지역 연계 팀 프로젝트" },
          { icon: iconPoint, text: "대회로 끝나지 않고 실천과제로 연결" },
        ]}
        pointsLabel="주요 대상"
        pointsItems={[
          "대학생 · 청년",
          "대학 · 지역 혁신 조직",
          "ESG에 관심 있는 기업 · 기관",
        ]}
        progressBarSvg={progressBar}
        dividerSvg={dividerDashed}
        arrowChevronSvg={arrowChevron}
        iconsBlockWidth={253}
        bottomBlockWidth={520}
        dataNodeId="252:1069"
        cardCtaNodeId="252:1112"
        nodeIds={{
          inner: "252:1070",
          header: "252:1071",
          title: "252:1078",
          icons: "252:1088",
          bottom: "252:1104",
          bottomLabel: "252:1105",
          ul: "252:1108",
          arrows: "252:1114",
          divider: "252:1110",
        }}
      />
      <FloatingCityTopRight />
    </section>
  );
}
