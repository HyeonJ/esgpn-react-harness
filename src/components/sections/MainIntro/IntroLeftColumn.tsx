import { IntroBusinessRow } from "./IntroBusinessRow";

import dottedLineShort from "@/assets/main-intro/dotted-line-short.svg";
import dottedLineLong from "@/assets/main-intro/dotted-line-long.svg";

const PILLS = ["주요사업 01", "주요사업 02", "주요사업 03"];

/**
 * Left column: page indicator dots + heading group + 3 business rows.
 *
 * v4: pure flex/grid layout, no positioned elements.
 * The business section uses a grid overlay where:
 * - pill column (gap-56) and business rows (gap-32) share a single grid cell
 * - pills are offset via padding to align with row titles
 */
export function IntroLeftColumn() {
  return (
    <div className="flex gap-[72px] items-start shrink-0">
      {/* Page progress indicator: large circle + small dot */}
      <div
        className="flex flex-col gap-[var(--spacing-4)] items-center justify-center self-stretch shrink-0 w-[24px]"
        aria-hidden="true"
      >
        <div className="w-[16px] h-[16px] rounded-full border border-[var(--color-gray-300)]" />
        <div className="w-[6px] h-[6px] rounded-full bg-[var(--color-gray-300)]" />
      </div>

      {/* Text + business content */}
      <div className="flex flex-col gap-[112px] items-start shrink-0">
        {/* Heading group */}
        <header className="flex flex-col gap-[var(--spacing-6)] items-start justify-center w-full">
          <div className="flex flex-col gap-[var(--spacing-2)] items-start w-full">
            <p className="font-normal text-[14px] leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-500)] whitespace-nowrap">
              ESGPN이란?
            </p>
            <h2 className="font-bold text-[length:var(--text-display-01-size)] leading-[var(--text-display-01-line-height)] tracking-[var(--text-display-01-letter-spacing)] text-[var(--color-gray-900)] w-full">
              ESG 실천을 위한 연대 플랫폼
            </h2>
          </div>
          <p className="font-normal text-[16px] leading-[1.5] tracking-[-0.16px] text-[var(--color-gray-900)] w-full">
            ESG실천네트워크(ESGPN : ESG Practice Network)는 ESG{" "}
            <span className="font-bold text-[var(--color-brand-500)] tracking-[-0.16px]">
              교육, 자격, 참여, 사회공헌
            </span>
            을<br aria-hidden="true" />
            실천하는 연대 플랫폼입니다. 대학, 학회, 산업체, 지역사회가 함께
            <br aria-hidden="true" />
            지속가능한 미래를 행동으로 구현 하는 것을 목표로 합니다.
          </p>
        </header>

        {/* Business section: overlapping grid (pill column + content rows) */}
        <div className="grid" style={{ gridTemplateColumns: "1fr", gridTemplateRows: "1fr" }}>
          {/* Pill column: 3 pills stacked vertically with gap-56 */}
          <div
            className="col-start-1 row-start-1 self-start justify-self-start flex flex-col gap-[var(--spacing-14)] items-start"
            style={{ width: 94 }}
          >
            {PILLS.map((label) => (
              <span
                key={label}
                className="bg-[var(--color-brand-500)] text-[var(--color-gray-000)] font-semibold text-[14px] leading-[1.5] tracking-[-0.07px] whitespace-nowrap px-[var(--spacing-3)] py-[var(--spacing-1)] rounded-[24px] text-center w-full"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Business rows: offset by ml=20 mt=26 from pills */}
          <nav
            aria-label="주요사업 목록"
            className="col-start-1 row-start-1 self-start justify-self-start flex flex-col gap-[var(--spacing-8)] items-start w-[600px] ml-[20px] mt-[26px]"
          >
            <IntroBusinessRow
              title="ESG 실천방안 발굴"
              lineSrc={dottedLineShort}
              body={<>지속가능한 미래를 위해 대학과 지역사회, 산업체가<br aria-hidden="true" />즉시 적용할 수 있는 행동 모델을 연구하고 개발합니다.</>}
            />
            <IntroBusinessRow
              title="ESG 창업 프로그램"
              lineSrc={dottedLineShort}
              body={<>ESG 가치를 혁신적인 비즈니스 모델로 전환하여 새로운<br aria-hidden="true" />사회적 가치를 창출하는 창업 지원 체계를 구축합니다.</>}
            />
            <IntroBusinessRow
              title="ESG 자격 및 교육"
              lineSrc={dottedLineLong}
              body={<>&lsquo;ESG마인드&rsquo; 자격검정과 체계적인 교육 과정을 운영하여<br aria-hidden="true" />실무 역량을 갖춘 차세대 ESG 전문 인력을 양성합니다.</>}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
