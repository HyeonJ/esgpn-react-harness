import type { ReactNode } from "react";
import type { GalleryThumbInner } from "./data";

interface GalleryCardProps {
  /** 컨테이너 node-id (외곽 flex-col wrapper) */
  nodeId: string;
  /** 썸네일 컨테이너 (rounded-[24px]) node-id */
  thumbNodeId: string;
  titleNodeId: string;
  descNodeId: string;
  thumbSrc: string;
  thumbInner: GalleryThumbInner;
  title: ReactNode;
  desc: ReactNode;
  /** Award variant: 백플레이트 썸네일 + 위에 덮는 overlay 상장. variant="award" 시 사용 */
  variant?: "default" | "award";
  awardOverlaySrc?: string;
  /** 너비: 기본 flex-1, award variant은 456px */
  widthClass?: string;
}

/**
 * main-gallery 카드 1개. 업무협약 3 + Award 1 = 4회 사용.
 *
 * 구조:
 * ```
 * <div gap-[24px] flex-col items-start>
 *   <div thumbnail h-[302px] rounded-[24px] relative overflow-hidden> img(absolute %)
 *     [award variant: + overlay img object-cover size-full]
 *   <div text gap-[16px] items-center text-center>
 *     <p 24SB title>
 *     <p 14R desc whitespace-pre>
 * ```
 *
 * desc의 `whitespace-pre`는 들여쓰기 4칸 공백 보존을 위해 필수 (§2.4 규칙 #10).
 */
export function GalleryCard({
  nodeId,
  thumbNodeId,
  titleNodeId,
  descNodeId,
  thumbSrc,
  thumbInner,
  title,
  desc,
  variant = "default",
  awardOverlaySrc,
  widthClass,
}: GalleryCardProps) {
  const widthCls = widthClass ?? "flex-[1_0_0] min-h-px min-w-px";
  return (
    <div
      className={`flex flex-col gap-[24px] items-start relative shrink-0 ${widthCls}`}
      data-node-id={nodeId}
    >
      <div
        className="h-[302px] relative rounded-[24px] shrink-0 w-full"
        data-node-id={thumbNodeId}
      >
        {variant === "award" && awardOverlaySrc ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[24px]"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[24px]">
              <img
                alt=""
                className="absolute max-w-none"
                src={thumbSrc}
                style={{
                  top: thumbInner.top,
                  left: thumbInner.left,
                  width: thumbInner.width,
                  height: thumbInner.height,
                }}
              />
            </div>
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover rounded-[24px] size-full"
              src={awardOverlaySrc}
            />
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
            <img
              alt=""
              className="absolute max-w-none"
              src={thumbSrc}
              style={{
                top: thumbInner.top,
                left: thumbInner.left,
                width: thumbInner.width,
                height: thumbInner.height,
              }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[16px] items-center relative shrink-0 text-center text-white w-full">
        <p
          className="font-semibold text-[24px] leading-[1.4] min-w-full w-[min-content]"
          data-node-id={titleNodeId}
        >
          {title}
        </p>
        <div
          className="flex flex-col justify-center text-[14px] tracking-[0.28px] whitespace-nowrap leading-[0]"
          data-node-id={descNodeId}
        >
          <p className="leading-[1.5] whitespace-pre">{desc}</p>
        </div>
      </div>
    </div>
  );
}
