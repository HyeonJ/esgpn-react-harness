import { NewsCard } from "./NewsCard";
import { NewsPager } from "./NewsPager";
import { NEWS_ITEMS } from "./data";

/**
 * Right column -- pagination controls + 5 news cards stacked vertically.
 * Flex-col layout, no absolute positioning.
 */
export function NewsList() {
  return (
    <div
      className="flex flex-col gap-[var(--spacing-2)] items-start justify-center py-[var(--spacing-6)] w-[748px] shrink-0 h-full"
      data-node-id="40:1418"
    >
      <NewsPager />

      <div className="flex flex-col items-start flex-1 w-full" data-node-id="43:336">
        {NEWS_ITEMS.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
