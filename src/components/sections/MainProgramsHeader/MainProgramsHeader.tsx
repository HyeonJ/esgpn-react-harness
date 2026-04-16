/**
 * MainProgramsHeader -- "ESGPN 핵심 프로그램" intro section on the landing page.
 *
 * v4 principles:
 * - Semantic HTML: <section> with <h2> for main heading
 * - All text is HTML (zero raster, zero images)
 * - Design tokens from tokens.css (colors, spacing, typography)
 * - Flex layout, zero absolute-positioned elements
 * - token_ratio target >= 0.2
 */
export function MainProgramsHeader() {
  return (
    <section
      className="flex flex-col items-center text-center mx-auto w-[1416px]"
      style={{
        gap: "var(--spacing-6)",
        paddingTop: "var(--spacing-6)",
        paddingBottom: "var(--spacing-6)",
      }}
      aria-label="ESGPN 핵심 프로그램 소개"
      data-node-id="252:987"
    >
      {/* Heading block: eyebrow + title */}
      <div
        className="flex flex-col items-center justify-center w-full"
        style={{ gap: "var(--spacing-2)" }}
        data-node-id="252:988"
      >
        {/* Eyebrow label */}
        <p
          className="font-normal text-[14px] leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-500)] whitespace-nowrap"
          data-node-id="252:989"
        >
          ESGPN 핵심 프로그램
        </p>

        {/* Main heading */}
        <h2
          className="font-bold text-[length:var(--text-display-01-size)] leading-[var(--text-display-01-line-height)] text-[var(--color-gray-900)]"
          data-node-id="252:990"
        >
          ESG를 배우고, 실천하고,
          <br />
          성장하는 여정
        </h2>
      </div>

      {/* Description body */}
      <p
        className="font-normal text-[16px] leading-[1.5] tracking-[-0.16px] text-[var(--color-gray-900)] w-full"
        data-node-id="252:991"
      >
        이론 교육부터 자격 인증, 실제 프로젝트 참여까지, ESG를 실천할 수 있는
        <br />
        핵심 역량을 기르고 사회적 가치를 함께 창출해 나갑니다.
      </p>
    </section>
  );
}
