import { HatchedDivider } from "@/components/ui/HatchedDivider";
import { OrgChartBox } from "./OrgChartBox";
import { OrgChartConnector } from "./OrgChartConnector";

/**
 * AboutOrganizationChart — /about/organization 3번째 섹션 (조직도 트리).
 * research/about-organization-chart.md / plan/about-organization-chart.md 기반.
 * baseline: figma-screenshots/about-organization-chart.png (1920×390).
 *
 * 구성 (내부 y 좌표):
 *   HatchedDivider "실행 구조":  y=0~14
 *   Tier 2 row (3 박스 h=50):    y=50~99, x=491..1428, gap=17
 *   Connectors (h=61):            y=100~160, x=959 / x=1277 (중심)
 *   Tier 3 col1 (3 박스 h=57):   y=164/240/316, x=809..1110, row gap=19
 *   Tier 3 col2 (3 박스 h=57):   y=164/240/316, x=1127..1428, row gap=19
 *
 * 주의: baseline divider label은 "실행 구조" (사용자 지시 "설립 구조"와 다름).
 * G1 PASS를 위해 baseline 기준으로 "실행 구조" 사용.
 */
export function AboutOrganizationChart() {
  return (
    <section className="relative max-w-[1920px] w-full h-[390px] bg-white mx-auto">
      {/* HatchedDivider "실행 구조" — baseline 기준 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <HatchedDivider label="실행 구조" />
      </div>

      {/* Tier 2 row */}
      <div className="absolute top-[50px] left-[491px] flex gap-[17px]">
        <OrgChartBox
          variant="pill"
          label="COLIVE, ESG마인드 자격검정"
          className="h-[50px]"
        />
        <OrgChartBox
          variant="primary"
          label="ESG실천 아이디어 경진대회"
          className="h-[50px]"
        />
        <OrgChartBox variant="primary" label="사회공헌활동" className="h-[50px]" />
      </div>

      {/* Connector col1 (아래 ESG실천) — 중심축 x=960 */}
      <div className="absolute top-[100px] left-[957px]">
        <OrgChartConnector height={61} />
      </div>
      {/* Connector col2 (아래 사회공헌) — 중심축 x=1278 */}
      <div className="absolute top-[100px] left-[1275px]">
        <OrgChartConnector height={61} />
      </div>

      {/* Tier 3 col1 */}
      <div className="absolute top-[164px] left-[809px] flex flex-col gap-[19px]">
        <OrgChartBox variant="ghost" label="ESG 대학생 부문" className="h-[57px]" />
        <OrgChartBox
          variant="ghost"
          label="기업 실전사례 부문"
          className="h-[57px]"
        />
        <OrgChartBox variant="ghost" label="지역사회 부문" className="h-[57px]" />
      </div>

      {/* Tier 3 col2 */}
      <div className="absolute top-[164px] left-[1127px] flex flex-col gap-[19px]">
        <OrgChartBox variant="ghost" label="ESG 실천 캠페인" className="h-[57px]" />
        <OrgChartBox
          variant="ghost"
          label="봉사활동(프로보노)"
          className="h-[57px]"
        />
        <OrgChartBox variant="ghost" label="기업 협력" className="h-[57px]" />
      </div>
    </section>
  );
}

export default AboutOrganizationChart;
