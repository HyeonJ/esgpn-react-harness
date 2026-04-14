import arrowLeft from "@/assets/main-news/arrow-left.svg";
import arrowRight from "@/assets/main-news/arrow-right.svg";
import { TOTAL_COUNT, CURRENT_PAGE, TOTAL_PAGES } from "./data";

/**
 * 우측 상단 컨트롤 바: "총 N개" + "current/total" + 좌/우 화살표.
 * 화살표는 Figma와 동일하게 24×24 wrapper + inset absolute + rotate inner + size-full img.
 * interaction 없음 (static).
 */
export function NewsPager() {
  return (
    <div
      className="flex h-[24px] items-center justify-between w-full shrink-0"
      data-node-id="40:963"
    >
      <p
        className="text-[14px] text-[#97a29e] tracking-[-0.07px] whitespace-nowrap leading-[1.5]"
        data-node-id="43:337"
      >
        총 {TOTAL_COUNT}개
      </p>
      <div
        className="flex gap-[4px] items-center shrink-0"
        data-node-id="40:966"
      >
        <p
          className="font-medium text-[15px] text-[#97a29e] tracking-[-0.1125px] whitespace-nowrap leading-[1.5]"
          data-node-id="40:967"
        >
          {CURRENT_PAGE}/{TOTAL_PAGES}
        </p>
        <div className="flex gap-[4px] items-center shrink-0" data-node-id="40:968">
          <div
            className="relative shrink-0 size-[24px]"
            data-node-id="40:969"
            data-name="Arrow Type 4"
          >
            <div
              className="absolute flex inset-[27.08%_39.58%_27.08%_35.42%] items-center justify-center"
              style={{ containerType: "size" }}
            >
              <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
                <div className="relative size-full">
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={arrowLeft}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="relative shrink-0 size-[24px]"
            data-node-id="40:970"
            data-name="Arrow Type 5"
          >
            <div
              className="absolute flex inset-[27.08%_32.27%_27.08%_42.73%] items-center justify-center"
              style={{ containerType: "size" }}
            >
              <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
                <div className="relative size-full">
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={arrowRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
