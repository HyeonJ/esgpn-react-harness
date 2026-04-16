import { HatchedDivider } from "@/components/ui/HatchedDivider";

/**
 * AboutOrganizationChart — About 조직도 페이지 3번째 섹션 "실행 구조" 트리.
 *
 * v4 원칙 (v1~v3 만성염증 4/4점 → 구조 의미 복원):
 * - absolute 제거: flex / column / gap 기반 flow 레이아웃
 * - 디자인 토큰 참조 (brand-500, brand-700, gray-100, gray-900, gray-000)
 * - 시맨틱 HTML: section + h2 sr-only + nav + ul/li (tree 의미)
 * - connector line = flow div + border (absolute 불필요)
 * - connector dot = `::after` pseudo-element (Tailwind after:)
 *
 * 트리 구조:
 *   Tier 2 (row 3 boxes)
 *     - COLiVE, ESG마인드 자격검정 (standalone pill, no children)
 *     - ESG실천 아이디어 경진대회 (primary, parent of col1)
 *     - 사회공헌활동 (primary, parent of col2)
 *   Tier 3 (각 parent 하위 col 3 boxes, ghost)
 *
 * Figma source: 89:1295 (flatten). crop box (0, 490, 1920, 880) — 내부 1920×390.
 * Baseline: figma-screenshots/about-organization-chart.png (1920×390).
 *
 * raster 에셋 0장 — 전부 HTML/CSS 재구성.
 */

const TIER2_BOX = "w-[302px] h-[50px] flex items-center justify-center font-bold text-[15px] tracking-[-0.3px]";
const TIER2_PILL = `${TIER2_BOX} rounded-full bg-[var(--color-brand-500)] text-white`;
const TIER2_PRIMARY = `${TIER2_BOX} rounded-[10px] bg-[var(--color-brand-700)] text-white`;
const TIER3_GHOST = "w-[302px] h-[57px] flex items-center justify-center text-[15px] font-medium tracking-[-0.3px] rounded-[6px] bg-[var(--color-gray-100)] text-[var(--color-gray-900)]";

/** Connector line + end dot. flow layout (absolute 없음). */
function Connector() {
  return (
    <div
      aria-hidden="true"
      className="h-[61px] w-[2px] bg-[var(--color-brand-700)] relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[-3px] after:h-[5px] after:w-[5px] after:rounded-full after:bg-[var(--color-brand-700)]"
    />
  );
}

export function AboutOrganizationChart() {
  return (
    <section
      aria-labelledby="about-org-chart-title"
      className="mx-auto flex w-full max-w-[1920px] flex-col items-center bg-gray-000"
      style={{ fontFamily: "var(--font-family-pretendard)" }}
    >
      <h2 id="about-org-chart-title" className="sr-only">
        ESGPN 실행 구조
      </h2>

      {/* 상단 divider with label */}
      <HatchedDivider label="실행 구조" />

      {/* 트리 — Tier 2 가로 + Tier 3 parent→children 중첩 */}
      <nav
        aria-label="ESGPN 실행 구조 트리"
        className="mt-[31px] mb-[17px]"
      >
        <ul className="flex items-start gap-[17px]">
          {/* Tier 2-1: standalone pill (no connector, no children) */}
          <li>
            <div className={TIER2_PILL}>COLiVE, ESG마인드 자격검정</div>
          </li>

          {/* Tier 2-2: parent with Tier 3 col1 */}
          <li className="flex flex-col items-center">
            <div className={TIER2_PRIMARY}>ESG실천 아이디어 경진대회</div>
            <Connector />
            <ul className="flex flex-col gap-[19px] mt-[10px]">
              <li className={TIER3_GHOST}>ESG 대학생 부문</li>
              <li className={TIER3_GHOST}>기업 실전사례 부문</li>
              <li className={TIER3_GHOST}>지역사회 부문</li>
            </ul>
          </li>

          {/* Tier 2-3: parent with Tier 3 col2 */}
          <li className="flex flex-col items-center">
            <div className={TIER2_PRIMARY}>사회공헌활동</div>
            <Connector />
            <ul className="flex flex-col gap-[19px] mt-[10px]">
              <li className={TIER3_GHOST}>ESG 실천 캠페인</li>
              <li className={TIER3_GHOST}>봉사활동(프로보노)</li>
              <li className={TIER3_GHOST}>기업 협력</li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>
  );
}
