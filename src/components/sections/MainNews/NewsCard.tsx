import { Link } from "react-router-dom";
import type { NewsItem } from "./data";
import dotSvg from "@/assets/main-news/dot.svg";

interface NewsCardProps {
  item: NewsItem;
}

/**
 * Individual news card -- title, body (2-line clamp), source/date meta, thumbnail.
 * Flex layout, zero absolute positioning.
 */
export function NewsCard({ item }: NewsCardProps) {
  return (
    <Link
      to={`/news/${encodeURIComponent(item.id)}`}
      className="block w-full text-inherit no-underline"
    >
    <article
      className="flex gap-[var(--spacing-5)] items-center py-[var(--spacing-6)] border-b border-[var(--color-gray-300)] w-full"
      data-node-id={item.id}
    >
      {/* Text content */}
      <div className="flex flex-col gap-[var(--spacing-3)] items-start flex-1 min-w-0">
        {/* Title + Body */}
        <div className="flex flex-col gap-[var(--spacing-2)] items-start w-full">
          <h3 className="font-bold text-[20px] leading-[1.4] tracking-[-0.4px] text-[var(--color-gray-900)]">
            {item.title}
          </h3>
          <p className="font-normal text-[15px] leading-[1.5] tracking-[-0.1125px] text-[var(--color-gray-700)] w-full overflow-hidden text-ellipsis line-clamp-2">
            {item.body}
          </p>
        </div>

        {/* Source / dot / date */}
        <div className="flex gap-[var(--spacing-2)] items-center">
          <span className="font-normal text-[13px] leading-[1.5] text-[var(--color-gray-500)]">
            {item.source}
          </span>
          <img
            src={dotSvg}
            alt=""
            className="w-[3px] h-[3px] shrink-0"
            aria-hidden="true"
          />
          <time
            className="font-normal text-[13px] leading-[1.5] text-[var(--color-gray-500)]"
            dateTime={item.date}
          >
            {item.date}
          </time>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="w-[140px] h-[100px] rounded-[16px] overflow-hidden shrink-0">
        <img
          src={item.thumbnailSrc}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
    </article>
    </Link>
  );
}
