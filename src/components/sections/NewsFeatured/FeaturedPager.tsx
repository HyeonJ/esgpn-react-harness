import chevronLeft from "@/assets/news-featured/chevron-left.svg";
import chevronRight from "@/assets/news-featured/chevron-right.svg";

interface FeaturedPagerProps {
  total: number;
  activeIndex: number;
}

/**
 * Featured 카드 페이지네이션 (Figma 129:2599).
 *
 * 구조: 좌 화살표 버튼 + 4개 dot (첫번째 32×6 active, 나머지 6×6) + 우 화살표 버튼
 * - 버튼: 40×40 rounded-full, border #d3d8de (Figma raw, 토큰 부재)
 * - 아이콘: chevron SVG는 상단 caret(^) 형태 → 회전해서 좌/우 화살표로 사용
 *   - 좌: -rotate-90 (< 모양)
 *   - 우: rotate-90  (> 모양)
 * - 아이콘 wrapper 28×28 (Figma ArrowType4 inset 27.08% 기준)
 * - active dot: 32×6 rounded-[24] bg-gray-900
 * - inactive dot: 6×6 rounded-full bg-[#d9d9d9] (Figma raw)
 *
 * 현재 static UI. 클릭 핸들러는 Phase 다음 단계에서 추가.
 */
export function FeaturedPager({ total, activeIndex }: FeaturedPagerProps) {
  return (
    <nav
      aria-label="주요 뉴스 페이지네이션"
      className="flex items-center gap-4"
      data-node-id="129:2599"
    >
      <button
        type="button"
        aria-label="이전 페이지"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3d8de] bg-white"
      >
        <span className="flex h-7 w-7 items-center justify-center">
          <img
            src={chevronLeft}
            alt=""
            aria-hidden="true"
            className="h-[6px] w-[11px] -rotate-90"
          />
        </span>
      </button>
      <ol className="m-0 flex list-none items-center gap-1.5 p-0">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={i}>
              {isActive ? (
                <span
                  aria-current="true"
                  aria-label={`현재 ${i + 1} / ${total} 페이지`}
                  className="block h-1.5 w-8 rounded-[24px] bg-gray-900"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="block h-1.5 w-1.5 rounded-full bg-[#d9d9d9]"
                />
              )}
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        aria-label="다음 페이지"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3d8de] bg-white"
      >
        <span className="flex h-7 w-7 items-center justify-center">
          <img
            src={chevronRight}
            alt=""
            aria-hidden="true"
            className="h-[6px] w-[11px] rotate-90"
          />
        </span>
      </button>
    </nav>
  );
}
