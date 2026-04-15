import { NewsCard } from "./NewsCard";
import { NewsPager } from "./NewsPager";
import { NEWS_ITEMS } from "./data";

/**
 * 우측 748px 컬럼: 상단 컨트롤 + 5 카드 세로 나열.
 * 카드별 border-b (모든 카드 포함, Figma 그대로).
 */
export function NewsList() {
  return (
    <div
      className="flex flex-col gap-[8px] h-full items-start justify-center py-[24px] shrink-0 w-full xl:w-[748px]"
      data-node-id="40:1418"
    >
      <NewsPager />
      <div
        className="flex flex-1 flex-col items-start min-h-px min-w-px w-full"
        data-node-id="43:336"
      >
        {NEWS_ITEMS.map((item) => (
          <NewsCard key={item.id} item={item} cardNodeId={item.id} />
        ))}
      </div>
    </div>
  );
}
