import arrowLeftSvg from "@/assets/main-news/arrow-left.svg";
import arrowRightSvg from "@/assets/main-news/arrow-right.svg";
import { TOTAL_COUNT, CURRENT_PAGE, TOTAL_PAGES } from "./data";

/**
 * Pagination controls -- "총 24개" (left) + "1/4" + arrow buttons (right).
 * Static display only (no interaction).
 */
export function NewsPager() {
  return (
    <div className="flex items-center justify-between w-full h-[24px]" data-node-id="40:963">
      <p className="font-normal text-[14px] leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-500)]">
        총 {TOTAL_COUNT}개
      </p>

      <div className="flex gap-[var(--spacing-1)] items-center">
        <span className="font-medium text-[15px] leading-[1.5] tracking-[-0.1125px] text-[var(--color-gray-500)]">
          {CURRENT_PAGE}/{TOTAL_PAGES}
        </span>

        <div className="flex gap-[4px] items-center">
          {/* Left arrow (Arrow Type 4: -90deg rotation) */}
          <button
            type="button"
            className="w-[24px] h-[24px] flex items-center justify-center"
            aria-label="이전 페이지"
            data-node-id="40:969"
          >
            <img
              src={arrowLeftSvg}
              alt=""
              className="w-[6px] h-[11px] -rotate-90"
              aria-hidden="true"
            />
          </button>

          {/* Right arrow (Arrow Type 5: +90deg rotation) */}
          <button
            type="button"
            className="w-[24px] h-[24px] flex items-center justify-center"
            aria-label="다음 페이지"
            data-node-id="40:970"
          >
            <img
              src={arrowRightSvg}
              alt=""
              className="w-[6px] h-[11px] rotate-90"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
