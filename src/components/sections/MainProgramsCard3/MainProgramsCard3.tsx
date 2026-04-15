import { ProgramCard } from "@/components/ui/ProgramCard";
import { FloatingCityTopLeft } from "./FloatingCityTopLeft";
import { FloatingCityBottomLeft } from "./FloatingCityBottomLeft";
import { FloatingCityRight } from "./FloatingCityRight";
import progressBar from "@/assets/main-programs-card3/progress-bar.svg";
import dividerDashed from "@/assets/main-programs-card3/divider-dashed.svg";
import arrowChevron from "@/assets/main-programs-card3/arrow-chevron.svg";
import iconCheckFilled from "@/assets/main-programs-card3/icon-check-filled.svg";
import iconCheckStroke from "@/assets/main-programs-card3/icon-check-stroke.svg";

/**
 * 메인페이지 Programs Card #3 (ESG 실천 네트워크 사회공헌활동).
 * Figma 노드: 252:1119 (Group 15), 1416×805 중앙정렬.
 *
 * Rule of Three 확정 지점 — 공통 ProgramCard(ui/ProgramCard.tsx) 사용.
 * decoration 3종(floating city)은 섹션 로컬 유지.
 *
 * DOM 순서 (Figma와 동일):
 *   1. FloatingCityTopLeft (좌상 회전 baked-in)
 *   2. FloatingCityBottomLeft (좌하 upright)
 *   3. FloatingCityRight (우측 upright)
 *   4. ProgramCard (카드 본체, left-400)
 *
 * 색상 차이점: CTA bar가 주황(#ff842d)이라 CTA 텍스트가 흰색(card1/2는 어두운색).
 * 타이틀은 2줄 + 2째 줄 accent span(#ff8521) 패턴.
 */
interface MainProgramsCard3Props {
  className?: string;
}

export function MainProgramsCard3({ className }: MainProgramsCard3Props) {
  const base = "relative max-w-[1416px] w-full xl:h-[805px] mx-auto overflow-hidden xl:overflow-visible";
  return (
    <section
      className={className ? `${base} ${className}` : base}
      aria-label="ESG 실천 네트워크 사회공헌활동 프로그램 카드"
      data-node-id="252:1119"
    >
      <FloatingCityTopLeft />
      <FloatingCityBottomLeft />
      <FloatingCityRight />
      <ProgramCard
        outerBg="#3b1a0c"
        ctaBg="#ff842d"
        ctaTextColor="#ffffff"
        checklistBulletColor="#ff842d"
        pointsBulletColor="#ff8521"
        title={
          <>
            ESG 실천 네트워크(ESGPN)
            <br />
            <span style={{ color: "#ff8521" }}>사회공헌활동</span>
          </>
        }
        checklist={[
          "ESG실천네트워크의 사회공헌활동은 일회성 봉사가 아닌 문제해결형 프로젝트",
        ]}
        points={[
          { icon: iconCheckFilled, text: "전문가 재능나눔 활동 전개" },
          { icon: iconCheckStroke, text: "평생직업교육 공로상 수상" },
          { icon: iconCheckStroke, text: "로컬크리에이터" },
        ]}
        pointsLabel="사회공헌활동 특징"
        pointsItems={[
          "대학의 교육 역량 활용",
          "지역 일자리 · 서비스 연계",
          "ESG 성과를 사회적 가치로 환원",
        ]}
        progressBarSvg={progressBar}
        dividerSvg={dividerDashed}
        arrowChevronSvg={arrowChevron}
        iconsBlockWidth={236}
        bottomBlockWidth={520}
        dataNodeId="252:1123"
        cardCtaNodeId="252:1166"
        nodeIds={{
          inner: "252:1124",
          header: "252:1125",
          title: "252:1132",
          icons: "258:1375",
          bottom: "258:1392",
          bottomLabel: "258:1393",
          ul: "258:1397",
          arrows: "252:1168",
          divider: "252:1164",
        }}
      />
    </section>
  );
}
