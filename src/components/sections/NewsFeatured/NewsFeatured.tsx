import { HatchedBar } from "./HatchedBar";
import { NewsFeaturedCard } from "./NewsFeaturedCard";
import { FeaturedPager } from "./FeaturedPager";
import { FEATURED_NEWS } from "./data";

/**
 * NewsFeatured — /news 페이지 주요 뉴스 섹션 (Figma 129:2560, 936×568).
 *
 * v4 원칙:
 * - 구조 중심: section > h2(sr-only) + div(HatchedBar + (ul+nav))
 * - 100% flex 레이아웃 (absolute 0)
 * - 디자인 토큰: font-family-pretendard, text-md-15r-*, gray-000/500/700/900
 * - 시맨틱 요소: section, article, h3, time, nav, button, ul, ol
 *
 * 공통 컴포넌트 미승격:
 * - NewsFeaturedCard: featured(세로 456w) vs list(가로 936w) 구조 상이 + 아직 2회만 사용
 *   → Rule of Three 미충족. news-list 섹션 구현 시 재평가
 * - HatchedBar: About의 HatchedDivider와 viewBox/stroke 다름 (8px bar vs 10px dash-dot)
 *   → 2번째 패턴, 로컬 유지
 *
 * 섹션 자기정렬: mx-auto max-w-[1920px]. Preview 래퍼 의존 금지.
 * Baseline: figma-screenshots/news-featured.png (938×569).
 * clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 569
 */
export function NewsFeatured() {
  return (
    <section
      aria-labelledby="news-featured-heading"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
    >
      <h2 id="news-featured-heading" className="sr-only">
        주요 뉴스
      </h2>
      <div
        className="flex w-[936px] flex-col items-center gap-5"
        data-node-id="129:2560"
      >
        <HatchedBar />
        <div className="flex w-full flex-col items-center gap-8">
          <ul className="m-0 flex w-full list-none gap-6 p-0">
            {FEATURED_NEWS.map((item) => (
              <li key={item.id} className="min-w-0 flex-1">
                <NewsFeaturedCard item={item} />
              </li>
            ))}
          </ul>
          <FeaturedPager total={4} activeIndex={0} />
        </div>
      </div>
    </section>
  );
}
