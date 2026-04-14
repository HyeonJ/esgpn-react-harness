import { HatchedDivider } from "@/components/ui/HatchedDivider";
import { ValueCard } from "./ValueCard";
import icon1 from "@/assets/about-values/icon-1.png";
import icon2 from "@/assets/about-values/icon-2.png";
import icon3 from "@/assets/about-values/icon-3.png";
import icon4 from "@/assets/about-values/icon-4.png";

/**
 * AboutValues — /about 페이지 Values 섹션 (2×2 그리드).
 * research/about-values.md, plan/about-values.md 기반.
 * baseline: figma-screenshots/about-values.png (1920×722).
 * 카드 centerX: 714 (좌) / 1205 (우). canvas center=960 기준 대칭.
 */
export function AboutValues() {
  return (
    <section className="relative w-[1920px] h-[722px] bg-white mx-auto">
      {/* 상단 divider */}
      <HatchedDivider className="absolute top-0 left-1/2 -translate-x-1/2" />

      {/* 카드 1 — 좌상 */}
      <ValueCard
        icon={icon1}
        iconW={144}
        iconH={141}
        title="선언을 넘어선 실천의 축적"
        descLine1="지속가능성은 구호가 아닌 교육과 실천의 반복으로 완성됩니다."
        descLine2="실천 방안을 발굴하고 행동으로 옮기는 프로세스를 구축합니다."
        className="absolute left-[714px] top-[85px] -translate-x-1/2"
      />

      {/* 카드 2 — 우상 */}
      <ValueCard
        icon={icon2}
        iconW={138}
        iconH={141}
        title="차세대 ESG 전문인력 양성"
        descLine1="청년을 ESG 실천의 출발점이자 확산 주체로 세우고,"
        descLine2="체계적인 교육 및 프로그램을 통해 전문성을 갖춘 인재를 양성합니다."
        className="absolute left-[1205px] top-[85px] -translate-x-1/2"
      />

      {/* 카드 3 — 좌하 */}
      <ValueCard
        icon={icon3}
        iconW={131}
        iconH={150}
        title="사회의 새로운 행동기준 정립"
        descLine1="ESG를 기업만의 평가 지표가 아닌, 우리 사회 전체가 지켜야 할"
        descLine2="행동 기준으로 정의하고 이를 위한 활동 프로그램을 지원합니다."
        className="absolute left-[714px] top-[385px] -translate-x-1/2"
      />

      {/* 카드 4 — 우하 */}
      <ValueCard
        icon={icon4}
        iconW={151}
        iconH={150}
        title="실천적 연대 플랫폼 구축"
        descLine1="대학, 산업체, 지역사회가 지속가능한 미래를 현실로 만들어가는"
        descLine2="네트워크 허브 역할을 수행하며, 사회공헌 모델을 제시합니다."
        className="absolute left-[1205px] top-[385px] -translate-x-1/2"
      />

      {/* 하단 divider */}
      <HatchedDivider className="absolute bottom-0 left-1/2 -translate-x-1/2" />
    </section>
  );
}
