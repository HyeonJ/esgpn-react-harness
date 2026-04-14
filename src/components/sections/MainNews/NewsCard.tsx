import type { NewsItem } from "./data";
import dot from "@/assets/main-news/dot.svg";

interface NewsCardProps {
  item: NewsItem;
  /** Figma 노드 ID (카드별 data attr 기록용) */
  cardNodeId: string;
}

/**
 * 메인 뉴스 카드 — MainNews 섹션 로컬 컴포넌트.
 * /news 페이지 작업 시점에 구조 동일 확인 후 common ui로 승격 평가.
 */
export function NewsCard({ item, cardNodeId }: NewsCardProps) {
  return (
    <div
      className="border-b border-[#c6cdcc] flex gap-[20px] items-center py-[24px] w-full"
      data-node-id={cardNodeId}
    >
      <div className="flex flex-1 flex-col gap-[12px] items-start min-h-px min-w-px">
        <div className="flex flex-col gap-[8px] items-start w-full">
          <div className="flex flex-col justify-center text-[20px] text-[#1d2623] tracking-[-0.4px] whitespace-nowrap font-bold">
            <p className="leading-[1.4]">{item.title}</p>
          </div>
          <div className="flex flex-col justify-center min-w-full overflow-hidden text-[15px] text-[#5d6a66] text-ellipsis tracking-[-0.1125px] w-[min-content] max-h-[45px]">
            <p className="leading-[1.5] mb-0 line-clamp-2">{item.body}</p>
          </div>
        </div>
        <div className="flex gap-[8px] items-center overflow-clip">
          <div className="flex flex-col justify-center text-[13px] text-[#97a29e] whitespace-nowrap">
            <p className="leading-[1.5]">{item.source}</p>
          </div>
          <div className="relative size-[3px] shrink-0">
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={dot}
            />
          </div>
          <div className="flex flex-col justify-center text-[13px] text-[#97a29e] whitespace-nowrap">
            <p className="leading-[1.5]">{item.date}</p>
          </div>
        </div>
      </div>
      <div className="h-[100px] relative rounded-[16px] shrink-0 w-[140px] overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full"
          src={item.thumbnailSrc}
        />
      </div>
    </div>
  );
}
