import headingIcon from "@/assets/certification-flatten-bottom/heading-icon.png";
import stepArrowLine from "@/assets/certification-flatten-bottom/step-arrow-line.svg";

/**
 * ProcessBlock — 자격검정 응시방법 및 절차 안내 (4단계).
 *
 * v4 구조: h2 + ol + li + h3 + ul/li 시맨틱. flex 전용, absolute는 heading icon overflow 컨테이너 1개.
 * 토큰: brand-700 (pill text), gap-*, p-*, text-white, white/opacity.
 *
 * 디자인 색 #caeb69 (ESG lime)는 Figma 토큰에 없어 직접 hex 사용.
 * mix-blend-hard-light는 heading icon에만 적용 (아이콘 color pop).
 */
const STEPS = [
  {
    n: "1단계",
    title: "접수",
    desc: "접수 및 응시료 납부",
    bullets: ["홈페이지 회원가입", "검정 신청서 작성", "응시료 결제 (30,000원)"],
  },
  {
    n: "2단계",
    title: "시험 응시",
    desc: "온라인 시험 진행",
    bullets: ["지정된 시험 일시", "온라인 시험 플랫폼 접속", "60분간 객관식 50문항 응시"],
  },
  {
    n: "3단계",
    title: "결과 확인",
    desc: "합격자 발표",
    bullets: ["시험 후 2주 이내 발표", "홈페이지에서 결과 확인", "70점 이상 합격"],
  },
  {
    n: "4단계",
    title: "자격증 발급",
    desc: "자격증 수령",
    bullets: ["자격증 발급 신청", "우편 또는 방문 수령", "PDF 전자 자격증 다운로드"],
  },
] as const;

function PillChevrons() {
  // step pill 옆 3개 오른쪽 화살표 (SVG 인라인, 3조각 ">" 반복)
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M9 8 L15 16 L9 24" stroke="#CAEB69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8 L21 16 L15 24" stroke="#CAEB69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 8 L27 16 L21 24" stroke="#CAEB69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProcessBlock() {
  return (
    <div className="flex w-full flex-col items-center gap-12 py-16">
      {/* heading cluster */}
      <div className="flex w-[364px] flex-col items-center gap-4">
        <div className="relative size-[120px] overflow-hidden mix-blend-hard-light">
          <img
            src={headingIcon}
            alt=""
            aria-hidden
            className="absolute left-[-5.4%] top-[-41.97%] block h-[189.63%] w-[106.67%] max-w-none"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2 text-white">
          <h2
            id="cfb-process-title"
            className="w-full text-center text-[32px] font-bold leading-[1.3] tracking-[-0.96px]"
            style={{ fontFamily: "var(--font-family-pretendard)" }}
          >
            응시방법 및 절차 안내
          </h2>
          <p
            className="w-full text-[16px] font-normal leading-[1.5] tracking-[-0.16px]"
            style={{ fontFamily: "var(--font-family-pretendard)" }}
          >
            간편한 온라인 신청으로 ESG마인드 자격검정에 도전하세요
          </p>
        </div>
      </div>

      {/* step wrapper (arrow line + steps row) */}
      <div className="flex w-full flex-col items-center gap-8">
        {/* arrow line — 4 step 상단 고정 선 936×25 */}
        <img
          src={stepArrowLine}
          alt=""
          aria-hidden
          className="block h-[25px] w-[936px] shrink-0"
        />

        {/* 4 step columns */}
        <ol
          aria-labelledby="cfb-process-title"
          className="m-0 flex w-full list-none items-start gap-[72px] p-0"
        >
          {STEPS.map((s) => (
            <li key={s.n} className="flex min-w-0 flex-1 flex-col items-start gap-6">
              <div className="flex w-full flex-col items-start gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-8 items-center justify-center rounded-full bg-[#caeb69] px-4 py-1 text-[15px] font-semibold leading-[1.5] tracking-[-0.11px] text-brand-700"
                    style={{ fontFamily: "var(--font-family-pretendard)" }}
                  >
                    {s.n}
                  </span>
                  <PillChevrons />
                </div>
                <div className="flex w-full flex-col gap-1 text-white">
                  <h3
                    className="text-[24px] font-bold leading-[1.4] tracking-[-0.6px]"
                    style={{ fontFamily: "var(--font-family-pretendard)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-[16px] font-medium leading-[1.5] tracking-[-0.16px]"
                    style={{ fontFamily: "var(--font-family-pretendard)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
              <ul className="m-0 flex w-full list-none flex-col gap-3 p-0">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span aria-hidden className="block h-[14px] w-[2px] shrink-0 rounded-full bg-brand-500" />
                    <span
                      className="text-[14px] font-normal leading-[1.5] tracking-[-0.07px] text-white"
                      style={{ fontFamily: "var(--font-family-pretendard)" }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
