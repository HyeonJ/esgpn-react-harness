import { Link } from "react-router-dom";
import type { FeaturedNewsItem } from "./data";
import dotSvg from "@/assets/news-featured/dot.svg";

interface NewsFeaturedCardProps {
  item: FeaturedNewsItem;
}

/**
 * Featured news card — 456w, 이미지 상단 + 텍스트 블록 세로.
 * Figma 129:2579 / 129:2589 동일 구조.
 *
 * - title: 24B LH1.4 tracking -0.6 (토큰 %값과 절대값 괴리로 inline)
 * - summary: 15R LH1.5 tracking -0.1125 (text-md-15r 토큰 + inline tracking)
 * - meta: 14R LH1.5 tracking -0.07 + 3px dot + time
 *
 * 구조: article > figure(img) + div(h3 + p) + footer(span + img + time)
 * 100% flex, absolute 0.
 */
export function NewsFeaturedCard({ item }: NewsFeaturedCardProps) {
  return (
    <Link
      to={`/news/${encodeURIComponent(item.id)}`}
      className="block text-inherit no-underline"
    >
    <article className="flex flex-col gap-6" data-node-id={item.id}>
      <div className="aspect-[456/280] overflow-hidden rounded-2xl">
        <img
          src={item.thumbnailSrc}
          alt={item.thumbnailAlt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-6 pr-4">
        <div className="flex flex-col gap-4">
          <h3
            className="font-bold text-gray-900"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: 24,
              lineHeight: 1.4,
              letterSpacing: "-0.6px",
            }}
          >
            {item.title}
          </h3>
          <p
            className="line-clamp-3 overflow-hidden text-gray-700"
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
        <div className="flex items-center gap-2">
          <span
            className="text-gray-500"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: 14,
              lineHeight: 1.5,
              letterSpacing: "-0.07px",
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
            className="text-gray-500"
            dateTime={item.date}
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: 14,
              lineHeight: 1.5,
              letterSpacing: "-0.07px",
            }}
          >
            {item.date}
          </time>
        </div>
      </div>
    </article>
    </Link>
  );
}
