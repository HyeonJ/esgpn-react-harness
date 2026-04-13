/**
 * 사업 1행: title + dotted line(flex-grow) + body wrapper(py-6px + width 308) + body.
 * Figma 26:188/26:191/26:197 패턴 충실 재현.
 *
 * pill은 부모(IntroLeftColumn)에서 absolute 배치, 본 컴포넌트는 본문 행만 책임.
 */
export type IntroBusinessRowProps = {
  title: string;
  lineSrc: string;
  /** 본문 1행 line 1 */
  bodyLine1: string;
  /** 본문 1행 line 2 (br로 강제 줄바꿈) */
  bodyLine2: string;
};

export function IntroBusinessRow({ title, lineSrc, bodyLine1, bodyLine2 }: IntroBusinessRowProps) {
  return (
    <div className="flex items-start gap-3 w-full">
      <p
        className="font-['Pretendard_Variable'] font-bold whitespace-nowrap shrink-0"
        style={{
          fontSize: 24,
          lineHeight: 1.4,
          letterSpacing: "-0.6px",
          color: "var(--color-gray-900)",
        }}
      >
        {title}
      </p>
      {/* Figma dotted line: flex-grow, h-34, 중앙 점선은 negative inset으로 살짝 오버. */}
      <div className="flex-1 min-w-0 relative" style={{ height: 34 }}>
        <div className="absolute" style={{ inset: "0 -2.93% 0 -2.93%" }}>
          <img src={lineSrc} alt="" aria-hidden="true" className="block w-full h-full select-none" />
        </div>
      </div>
      {/* Body wrapper: py-6, width 308. 본문은 2줄 강제(br). */}
      <div className="flex items-center justify-center shrink-0" style={{ paddingTop: 6, paddingBottom: 6 }}>
        <p
          className="font-['Pretendard_Variable'] font-normal"
          style={{
            width: 308,
            fontSize: 14,
            lineHeight: 1.5,
            letterSpacing: "-0.07px",
            color: "var(--color-gray-900)",
          }}
        >
          {bodyLine1}
          <br aria-hidden="true" />
          {bodyLine2}
        </p>
      </div>
    </div>
  );
}
