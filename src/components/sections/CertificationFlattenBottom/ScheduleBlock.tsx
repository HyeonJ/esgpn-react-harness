import headingIcon from "@/assets/certification-flatten-bottom/heading-icon.png";

/**
 * ScheduleBlock — 2026년 시험 일정 테이블 + pagination.
 *
 * v4 구조: h2 + table (caption sr-only + thead + tbody + th scope) + nav pagination.
 * 배경 zebra는 tbody tr:nth-child() + Tailwind. table wrapper로 rounded 구현.
 * Chevron은 인라인 SVG (lucide 미사용, 기존 컨벤션 일치).
 *
 * 상수: 5행 (24회~20회). 실제 5번째 행부터 반복. Figma에 24/23/22/21/20회만.
 */
const EXAM_ROUNDS = [
  { round: "24회", signup: "2026.03.01 - 03.15", exam: "2026.03.20", result: "2026.04.03", status: "접수 진행중" },
  { round: "23회", signup: "2026.03.01 - 03.15", exam: "2026.03.20", result: "2026.04.03", status: "접수 완료" },
  { round: "22회", signup: "2026.03.01 - 03.15", exam: "2026.03.20", result: "2026.04.03", status: "접수 완료" },
  { round: "21회", signup: "2026.03.01 - 03.15", exam: "2026.03.20", result: "2026.04.03", status: "접수 완료" },
  { round: "20회", signup: "2026.03.01 - 03.15", exam: "2026.03.20", result: "2026.04.03", status: "접수 완료" },
] as const;

const PAGINATION_PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

function ChevronIcon({ double, direction }: { double: boolean; direction: "left" | "right" }) {
  const d = direction === "left"
    ? (double ? "M11 16 L6 11 L11 6 M17 16 L12 11 L17 6" : "M14 16 L8 10 L14 4")
    : (double ? "M5 6 L10 11 L5 16 M11 6 L16 11 L11 16" : "M8 4 L14 10 L8 16");
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScheduleBlock() {
  return (
    <div className="flex w-full flex-col items-center gap-12 py-16">
      {/* heading cluster (동일 구조, Process와 같은 아이콘 재사용) */}
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
            id="cfb-schedule-title"
            className="w-full text-center text-[32px] font-bold leading-[1.3] tracking-[-0.96px]"
            style={{ fontFamily: "var(--font-family-pretendard)" }}
          >
            2026년 시험 일정
          </h2>
          <p
            className="w-full text-[16px] font-normal leading-[1.5] tracking-[-0.16px]"
            style={{ fontFamily: "var(--font-family-pretendard)" }}
          >
            간편한 온라인 신청으로 ESG마인드 자격검정에 도전하세요
          </p>
        </div>
      </div>

      {/* table + pagination */}
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="w-full overflow-hidden rounded-[20px] border-[1.5px] border-white/8">
          <table className="w-full border-collapse" aria-labelledby="cfb-schedule-title">
            <caption className="sr-only">2026년 ESG마인드 자격검정 회차별 시험 일정</caption>
            <thead>
              <tr className="bg-[#caeb69]">
                <th
                  scope="col"
                  className="w-[80px] whitespace-nowrap px-6 py-5 text-center text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-brand-700"
                  style={{ fontFamily: "var(--font-family-pretendard)" }}
                >
                  회차
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-5 text-center text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-brand-700"
                  style={{ fontFamily: "var(--font-family-pretendard)" }}
                >
                  접수기간
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-5 text-center text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-brand-700"
                  style={{ fontFamily: "var(--font-family-pretendard)" }}
                >
                  시험일
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-5 text-center text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-brand-700"
                  style={{ fontFamily: "var(--font-family-pretendard)" }}
                >
                  발표일
                </th>
                <th
                  scope="col"
                  className="w-[140px] whitespace-nowrap px-6 py-5 text-center text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-brand-700"
                  style={{ fontFamily: "var(--font-family-pretendard)" }}
                >
                  진행 상태
                </th>
              </tr>
            </thead>
            <tbody>
              {EXAM_ROUNDS.map((r, i) => {
                const isEven = i % 2 === 1;
                return (
                  <tr
                    key={r.round}
                    className="bg-[#014527]"
                    style={isEven ? { backgroundImage: "linear-gradient(0deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04))" } : undefined}
                  >
                    <td
                      className="w-[80px] whitespace-nowrap px-6 py-5 text-center text-[16px] font-bold leading-[1.5] tracking-[0.32px] text-[#caeb69]"
                      style={{ fontFamily: "var(--font-family-pretendard)" }}
                    >
                      {r.round}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-5 text-center text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-white"
                      style={{ fontFamily: "var(--font-family-pretendard)" }}
                    >
                      {r.signup}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-5 text-center text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-white"
                      style={{ fontFamily: "var(--font-family-pretendard)" }}
                    >
                      {r.exam}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-5 text-center text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-white"
                      style={{ fontFamily: "var(--font-family-pretendard)" }}
                    >
                      {r.result}
                    </td>
                    <td
                      className="w-[140px] whitespace-nowrap px-6 py-5 text-center text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-white"
                      style={{ fontFamily: "var(--font-family-pretendard)" }}
                    >
                      {r.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <nav aria-label="시험 일정 페이지네이션" className="flex items-center gap-2">
          <button
            type="button"
            aria-label="첫 페이지"
            className="flex size-6 items-center justify-center rounded-lg text-white/60"
          >
            <ChevronIcon double direction="left" />
          </button>
          <button
            type="button"
            aria-label="이전 페이지"
            className="flex size-6 items-center justify-center rounded-lg text-white/60"
          >
            <ChevronIcon double={false} direction="left" />
          </button>
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {PAGINATION_PAGES.map((n) => {
              const isCurrent = n === 1;
              return (
                <li key={n}>
                  <button
                    type="button"
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={`${n} 페이지`}
                    className={
                      isCurrent
                        ? "flex size-6 items-center justify-center rounded-lg bg-white/14 text-center text-[14px] font-medium leading-[1.5] text-white"
                        : "flex size-6 items-center justify-center rounded-lg text-center text-[14px] font-medium leading-[1.5] text-white/60"
                    }
                    style={{ fontFamily: "var(--font-family-pretendard)" }}
                  >
                    {n}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            aria-label="다음 페이지"
            className="flex size-6 items-center justify-center rounded-lg text-white/60"
          >
            <ChevronIcon double={false} direction="right" />
          </button>
          <button
            type="button"
            aria-label="마지막 페이지"
            className="flex size-6 items-center justify-center rounded-lg text-white/60"
          >
            <ChevronIcon double direction="right" />
          </button>
        </nav>
      </div>
    </div>
  );
}
