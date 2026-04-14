import arrowIcon from "@/assets/main-gallery/arrow-icon.svg";

interface ViewAllButtonProps {
  /** pill 버튼 node-id */
  nodeId: string;
  /** 내부 텍스트 node-id */
  labelNodeId: string;
  /** arrow wrapper node-id */
  arrowNodeId: string;
  /** 내부 icon-stroke node-id */
  iconNodeId: string;
  href?: string;
}

/**
 * 전체보기 pill CTA. Partnership/Award 블록 공용 (2회).
 * `rgba(255,255,255,0.14)` bg + `rounded-full` + `pl-[24px] pr-[16px] py-[12px]`.
 * Arrow SVG는 down-arrow 원본을 `rotate-90`으로 우측 화살로 변환.
 */
export function ViewAllButton({
  nodeId,
  labelNodeId,
  arrowNodeId,
  iconNodeId,
  href,
}: ViewAllButtonProps) {
  const Inner = (
    <>
      <div
        className="flex flex-col justify-center text-center text-white text-[16px] tracking-[-0.16px] whitespace-nowrap leading-[0] font-semibold"
        data-node-id={labelNodeId}
      >
        <p className="leading-[1.5]">전체보기</p>
      </div>
      <div
        className="h-[24px] relative shrink-0 w-[23px]"
        data-node-id={arrowNodeId}
        data-name="Arrow Type 4"
      >
        <div
          className="absolute flex inset-[27.08%_32.27%_27.08%_42.73%] items-center justify-center"
          style={{ containerType: "size" }}
        >
          <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
            <div
              className="relative size-full"
              data-node-id={iconNodeId}
              data-name="Icon (Stroke)"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={arrowIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
  const cls =
    "bg-[rgba(255,255,255,0.14)] flex gap-[2px] items-center justify-center pl-[24px] pr-[16px] py-[12px] relative rounded-full shrink-0";

  if (href) {
    return (
      <a href={href} className={cls} data-node-id={nodeId}>
        {Inner}
      </a>
    );
  }
  return (
    <div className={cls} data-node-id={nodeId}>
      {Inner}
    </div>
  );
}
