import chevronLeft from "@/assets/news-list/chevron-left.svg";
import chevronRight from "@/assets/news-list/chevron-right.svg";
import chevronDoubleLeft from "@/assets/news-list/chevron-double-left.svg";
import chevronDoubleRight from "@/assets/news-list/chevron-double-right.svg";

interface PaginationProps {
  current: number; // 1-based
  total: number;
}

/**
 * News List Pagination (Figma 129:2702).
 *
 * 구조: [<<] [<] [1] [2] ... [total] [>] [>>]
 * - 각 버튼 size-6 (24×24) rounded-lg
 * - active page: bg-gray-100 + text-gray-900 (14M)
 * - inactive page: text-gray-400 (14M)
 * - chevron: 16×16 wrapper, SVG는 11×11 viewBox gray-400 stroke
 *
 * news-featured/Pager와 독립 — Pager는 도트 페이지네이션(featured 전용).
 * Rule of Three 미충족 (1회 사용) → 로컬 유지.
 */
export function Pagination({ current, total }: PaginationProps) {
  return (
    <nav
      aria-label="뉴스 목록 페이지네이션"
      className="flex items-center gap-2"
      data-node-id="129:2702"
    >
      <button
        type="button"
        aria-label="첫 페이지"
        className="flex size-6 items-center justify-center rounded-lg"
      >
        <span className="flex size-4 items-center justify-center">
          <img
            src={chevronDoubleLeft}
            alt=""
            aria-hidden="true"
            className="h-[11px] w-[12px]"
          />
        </span>
      </button>
      <button
        type="button"
        aria-label="이전 페이지"
        className="flex size-6 items-center justify-center rounded-lg"
      >
        <span className="flex size-4 items-center justify-center">
          <img
            src={chevronLeft}
            alt=""
            aria-hidden="true"
            className="h-[11px] w-[7px]"
          />
        </span>
      </button>
      <ol className="m-0 flex list-none items-center gap-1 p-0">
        {Array.from({ length: total }).map((_, i) => {
          const page = i + 1;
          const isActive = page === current;
          return (
            <li key={page}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                aria-label={
                  isActive ? `${page} 페이지 (현재)` : `${page} 페이지`
                }
                className={
                  "flex size-6 items-center justify-center rounded-lg " +
                  (isActive ? "bg-gray-100" : "")
                }
              >
                <span
                  className={isActive ? "text-gray-900" : "text-gray-400"}
                  style={{
                    fontFamily: "var(--font-family-pretendard)",
                    fontSize: "var(--text-sm-14m-size)",
                    fontWeight: "var(--text-sm-14m-weight)",
                    lineHeight: "var(--text-sm-14m-line-height)",
                  }}
                >
                  {page}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        aria-label="다음 페이지"
        className="flex size-6 items-center justify-center rounded-lg"
      >
        <span className="flex size-4 items-center justify-center">
          <img
            src={chevronRight}
            alt=""
            aria-hidden="true"
            className="h-[11px] w-[7px]"
          />
        </span>
      </button>
      <button
        type="button"
        aria-label="마지막 페이지"
        className="flex size-6 items-center justify-center rounded-lg"
      >
        <span className="flex size-4 items-center justify-center">
          <img
            src={chevronDoubleRight}
            alt=""
            aria-hidden="true"
            className="h-[11px] w-[12px]"
          />
        </span>
      </button>
    </nav>
  );
}
