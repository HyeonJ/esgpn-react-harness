import { ProgramCard } from "@/components/ui/ProgramCard";
import { FloatingCity } from "./FloatingCity";
import { FloatingLeafBottom } from "./FloatingLeafBottom";
import { FloatingLeafTop } from "./FloatingLeafTop";
import progressBar from "@/assets/main-programs-card1/progress-bar.svg";
import dividerDashed from "@/assets/main-programs-card1/divider-dashed.svg";
import arrowChevron from "@/assets/main-programs-card1/arrow-chevron.svg";
import iconCheckFilled from "@/assets/main-programs-card1/icon-check-filled.svg";
import iconCheckStroke from "@/assets/main-programs-card1/icon-check-stroke.svg";

/**
 * 메인페이지 Programs Card #1 (ESG마인드 자격검정).
 * Figma 노드: 252:1013 (Group 13), 1416×805 중앙정렬.
 *
 * 공통 ProgramCard(ui/ProgramCard.tsx)를 사용. decoration 3종은 섹션 로컬 유지.
 *
 * DOM 순서 (Figma와 동일):
 *   1. FloatingCity (우측 city, absolute)
 *   2. ProgramCard (카드 본체, absolute)
 *   3. FloatingLeafBottom (좌하 leaf, absolute, -24deg)
 *   4. FloatingLeafTop (좌상 leaf, absolute, -12deg)
 */
interface MainProgramsCard1Props {
  className?: string;
}

export function MainProgramsCard1({ className }: MainProgramsCard1Props) {
  const base = "relative max-w-[1416px] w-full h-[805px] mx-auto overflow-hidden xl:overflow-visible";
  return (
    <section
      className={className ? `${base} ${className}` : base}
      aria-label="ESG마인드 자격검정 프로그램 카드"
      data-node-id="252:1013"
    >
      <FloatingCity />
      <ProgramCard
        outerBg="#0c3b0e"
        ctaBg="#caeb69"
        ctaTextColor="#0c3b0e"
        checklistBulletColor="#4fb654"
        pointsBulletColor="#4fb654"
        title="ESG마인드 자격검정"
        checklist={[
          "ESG를 알고 있는 사람이 아니라 ESG를 실천할 수 있는 사람을 인증하는 자격",
          "ESG 실천을 위한 기관의 역할과 ESG에 필요한 교육 생태계 구축을 목적으로 개발",
        ]}
        points={[
          { icon: iconCheckFilled, text: "ESG 개념 / 용어 / 실천 전반" },
          { icon: iconCheckStroke, text: "온라인 시험 진행" },
          { icon: iconCheckStroke, text: "공식 자격증 발급" },
        ]}
        pointsLabel="필수 역량"
        pointsItems={[
          "지역사회와 상생으로 균형잡힌 지속가능성 실천",
          "사회적 가치 창출로 고객 신뢰와 브랜드 가치 제고",
          "윤리적 의사결정과 투명한 정보 공개로 조직 신뢰 제고",
          "지역 사회 ESG 문제 해결",
          "취약계층·청년대상 ESG 교육",
          "대학·기업·지자체 협력 프로젝트",
        ]}
        progressBarSvg={progressBar}
        dividerSvg={dividerDashed}
        arrowChevronSvg={arrowChevron}
        iconsBlockWidth={236}
        bottomBlockWidth={456}
        dataNodeId="252:1015"
        cardCtaNodeId="252:1058"
        nodeIds={{
          inner: "252:1016",
          header: "252:1017",
          title: "252:1024",
          icons: "252:1034",
          bottom: "252:1050",
          bottomLabel: "252:1051",
          ul: "252:1054",
          arrows: "252:1060",
          divider: "252:1056",
        }}
      />
      <FloatingLeafBottom />
      <FloatingLeafTop />
    </section>
  );
}
