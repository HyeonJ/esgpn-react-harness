import { Link } from "react-router-dom";
import type { ListNewsItem } from "./data";
import dotSvg from "@/assets/news-featured/dot.svg";

interface NewsListItemProps {
  item: ListNewsItem;
}

/**
 * News List item (Figma 129:2622 / 129:2632 / ...) — 가로 레이아웃.
 *
 * 구조: article > div(content flex-1) + div(thumbnail 140×100)
 * content: title(20B -0.4) + summary(15R -0.1125, line-clamp-3) + meta(source · date)
 *
 * - border-b gray-300 + py-6 gap-5 (Figma spec)
 * - 썸네일 bg #d9d9d9 (alpha 부분 placeholder) + object-cover
 * - meta: source 13R gray-500 + 3px dot + time 13R gray-500
 *
 * main-news NewsCard와 구조 상이(세로), featured NewsFeaturedCard와도 상이(세로).
 * Rule of Three 미충족 → 로컬 유지.
 */
export function NewsListItem({ item }: NewsListItemProps) {
  return (
    <Link
      to={`/news/${encodeURIComponent(item.id)}`}
      className="block w-full text-inherit no-underline"
    >
    <article
      className="flex w-full items-center gap-5 border-b py-6"
      style={{ borderColor: "var(--color-gray-300)" }}
      data-node-id={item.id}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h3
            className="text-gray-900"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: "var(--text-xl-20b-size)",
              fontWeight: "var(--text-xl-20b-weight)",
              lineHeight: "var(--text-xl-20b-line-height)",
              letterSpacing: "-0.4px",
            }}
          >
            {item.title}
          </h3>
          <p
            className="line-clamp-2 overflow-hidden text-gray-700"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: "var(--text-md-15r-size)",
              fontWeight: "var(--text-md-15r-weight)",
              lineHeight: "var(--text-md-15r-line-height)",
              letterSpacing: "-0.1125px",
            }}
          >
            {item.summary}
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <span
            className="whitespace-nowrap text-gray-500"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: "var(--text-xs-13r-size)",
              fontWeight: "var(--text-xs-13r-weight)",
              lineHeight: "var(--text-xs-13r-line-height)",
            }}
          >
            {item.source}
          </span>
          <img
            src={dotSvg}
            alt=""
            aria-hidden="true"
            className="h-[3px] w-[3px] shrink-0"
          />
          <time
            className="whitespace-nowrap text-gray-500"
            dateTime={item.date}
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: "var(--text-xs-13r-size)",
              fontWeight: "var(--text-xs-13r-weight)",
              lineHeight: "var(--text-xs-13r-line-height)",
            }}
          >
            {item.date}
          </time>
        </div>
      </div>
      <div
        className="h-[100px] w-[140px] shrink-0 overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#d9d9d9" }}
      >
        <img
          src={item.thumbnailSrc}
          alt={item.thumbnailAlt}
          className="h-full w-full object-cover"
        />
      </div>
    </article>
    </Link>
  );
}
