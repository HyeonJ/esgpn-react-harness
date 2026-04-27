import { Link } from "react-router-dom";
import dotSvg from "@/assets/news-featured/dot.svg";
import { RELATED_NEWS, type RelatedNewsItem } from "./data";

/**
 * NewsDetailRelated — /news/:id 페이지 하단 "관련 뉴스" 섹션.
 *
 * Figma:
 *   Heading 134:4081 (936×28, "실천의 영감을 더해줄 또 다른 이야기들", Text-xl/20SB)
 *   List    134:4118 (936×486, 3 articles with border-b py-6 gap-5)
 *   Total section 936×538 (gap heading→list = 24px).
 *
 * v4 원칙:
 * - 완전 HTML 재구성 (T-011 composite raster 부채 해소)
 * - 100% flex, absolute 0
 * - 텍스트 모두 JSX literal (G8)
 * - 썸네일 자산은 NewsList와 공유 (thumb.jpg, thumb-b.png) — 동일 baseline이므로 재사용
 * - 로컬 RelatedItem (NewsListItem과 구조 동일하나 섹션 격리 원칙으로 로컬 유지)
 *
 * 시맨틱:
 *   <section aria-labelledby>
 *     <h2 id> heading
 *     <ol> 3× <li> → <article> with <h3> + <time>
 *
 * 자기 정렬: mx-auto max-w-[1920px]. Preview 래퍼 의존 금지.
 * Baseline: figma-screenshots/news-detail-related.png (936×486, list only).
 * clip: --clip-x 492 --clip-y 28 (heading height skip) --clip-w 936 --clip-h 486
 */
export function NewsDetailRelated() {
  return (
    <section
      aria-labelledby="news-detail-related-heading"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
    >
      <div
        className="flex w-[936px] flex-col gap-6"
        data-node-id="134:4118"
      >
        <h2
          id="news-detail-related-heading"
          className="m-0 text-gray-900"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: "-0.4px",
          }}
          data-node-id="134:4081"
        >
          실천의 영감을 더해줄 또 다른 이야기들
        </h2>
        <ol className="m-0 flex w-full list-none flex-col p-0">
          {RELATED_NEWS.map((item) => (
            <li key={item.id} className="contents">
              <RelatedItem item={item} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

interface RelatedItemProps {
  item: RelatedNewsItem;
}

function RelatedItem({ item }: RelatedItemProps) {
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
            className="m-0 text-gray-900"
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
            className="m-0 line-clamp-2 overflow-hidden text-gray-700"
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
