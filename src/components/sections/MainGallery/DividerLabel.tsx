interface DividerLabelProps {
  label: string;
  svgSrc: string;
  /** 좌우 라인 SVG wrapper node-id */
  leftLineNodeId: string;
  rightLineNodeId: string;
  labelNodeId: string;
  /** 섹션 블록 내부 divider row 의 node-id */
  nodeId: string;
}

/**
 * 중앙 텍스트 + 좌우 SVG 수평선. Figma 43:1818 / 43:1881 재사용.
 * SVG는 `inset-[-0.75px_-0.11%]` 하드 inset 대신 `h-px w-full` 확장 + 이미지 full로 구현:
 * Figma 원본은 높이 0 컨테이너에 -0.75px inset으로 1.5px 두께 라인을 얹는 방식인데,
 * 시각적 결과가 동일하도록 `h-0 flex-1 min-*-px` + 절대 배치 img 로 복제.
 */
export function DividerLabel({
  label,
  svgSrc,
  leftLineNodeId,
  rightLineNodeId,
  labelNodeId,
  nodeId,
}: DividerLabelProps) {
  return (
    <div
      className="flex gap-[16px] items-center relative shrink-0 w-full"
      data-node-id={nodeId}
    >
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-node-id={leftLineNodeId}>
        <div className="absolute inset-[-0.75px_-0.11%]">
          <img alt="" className="block max-w-none size-full" src={svgSrc} />
        </div>
      </div>
      <p
        className="font-semibold text-[20px] text-[#caeb69] text-center tracking-[-0.4px] whitespace-nowrap leading-[1.4]"
        data-node-id={labelNodeId}
      >
        {label}
      </p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-node-id={rightLineNodeId}>
        <div className="absolute inset-[-0.75px_-0.11%]">
          <img alt="" className="block max-w-none size-full" src={svgSrc} />
        </div>
      </div>
    </div>
  );
}
