/**
 * 메인페이지 Programs Header 섹션.
 * Figma 노드: 252:987 (Frame 2042062907), 1416×261, 중앙정렬, BG transparent.
 *
 * 구조:
 *   root section: flex-col gap-24 items-center py-24 text-center
 *     - 252:988 heading block (flex-col gap-8 items-center)
 *         eyebrow 252:989 (14R gray-500, ls -0.07px)
 *         title 252:990 (48B gray-900, lh 56px, 2줄 고정 <br/>)
 *     - 252:991 body (16R gray-900, lh 1.5, ls -0.16px, 2줄 고정 <br/>)
 *
 * 에셋: 0개 (순수 텍스트). 동적 에셋 없음.
 */
export function MainProgramsHeader() {
  return (
    <section
      className="relative mx-auto w-[1416px] h-[261px] bg-transparent flex flex-col items-center text-center"
      style={{ gap: 24, paddingTop: 24, paddingBottom: 24 }}
      aria-label="ESGPN 핵심 프로그램 소개"
      data-node-id="252:987"
    >
      {/* 252:988 — heading block */}
      <div
        className="flex flex-col items-center justify-center w-full"
        style={{ gap: 8 }}
        data-node-id="252:988"
      >
        {/* 252:989 — eyebrow */}
        <p
          className="font-['Pretendard_Variable'] font-normal whitespace-nowrap"
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            letterSpacing: "-0.07px",
            color: "var(--color-gray-500)",
          }}
          data-node-id="252:989"
        >
          ESGPN 핵심 프로그램
        </p>

        {/* 252:990 — title */}
        <h2
          className="font-['Pretendard_Variable'] font-bold w-full"
          style={{
            fontSize: 48,
            lineHeight: "56px",
            letterSpacing: "0px",
            color: "var(--color-gray-900)",
          }}
          data-node-id="252:990"
        >
          ESG를 배우고, 실천하고,
          <br aria-hidden="true" />
          성장하는 여정
        </h2>
      </div>

      {/* 252:991 — body */}
      <p
        className="font-['Pretendard_Variable'] font-normal w-full"
        style={{
          fontSize: 16,
          lineHeight: 1.5,
          letterSpacing: "-0.16px",
          color: "var(--color-gray-900)",
        }}
        data-node-id="252:991"
      >
        이론 교육부터 자격 인증, 실제 프로젝트 참여까지, ESG를 실천할 수 있는
        <br aria-hidden="true" />
        핵심 역량을 기르고 사회적 가치를 함께 창출해 나갑니다.
      </p>
    </section>
  );
}
