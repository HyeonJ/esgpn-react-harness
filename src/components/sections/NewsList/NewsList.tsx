import { ListHeader } from "./ListHeader";
import { NewsListItem } from "./NewsListItem";
import { Pagination } from "./Pagination";
import { LIST_NEWS } from "./data";

/**
 * NewsList — /news 페이지 마지막 섹션 (Figma 129:2609, 936×1416).
 *
 * v4 원칙:
 * - 완전 HTML 재구성 (baked-in PNG 금지)
 * - 100% flex 레이아웃 (absolute 0)
 * - 디자인 토큰: font-family-pretendard, text-xl-20b-*, text-md-15r-*, text-base-16m-*, text-xs-13r-*, text-sm-14m-*, color-gray-300/400/500/700/900/100
 * - 시맨틱: section, article × 8, h3 × 8, time × 8, nav, ol × 2, button
 *
 * v1~v3에서 G1 20.37% ACCEPTED — v4는 완전 재구성으로 baseline 매칭 재도전.
 *
 * 공통 컴포넌트 미승격:
 * - NewsListItem: featured(세로 456w) / main-news(세로 376w) 와 구조 상이(가로 936w)
 * - Pagination: 1회 사용. 2번째 등장 시 `src/components/ui/Pagination.tsx`로 승격
 * - ListHeader: HatchedBar(featured)와 구조 달라(좌 해치 없음) 재사용 불가
 *
 * 섹션 자기정렬: mx-auto max-w-[1920px]. Preview 래퍼 의존 금지.
 * Baseline: figma-screenshots/news-list.png (937×1416).
 * clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 1416
 *
 * 총 N개 표시: Figma baseline "24"와 맞추기 위해 24로 고정 (LIST_NEWS.length=8과 별개).
 * 실제 서비스에선 API 응답의 total count를 주입.
 */
export function NewsList() {
  return (
    <section
      aria-labelledby="news-list-heading"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
    >
      <h2 id="news-list-heading" className="sr-only">
        뉴스 목록
      </h2>
      <div
        className="flex w-[936px] flex-col items-center gap-4 py-6"
        data-node-id="129:2609"
      >
        <div className="flex w-full flex-col gap-2">
          <ListHeader total={24} />
          <ol className="m-0 flex w-full list-none flex-col p-0">
            {LIST_NEWS.map((item) => (
              <li key={item.id} className="contents">
                <NewsListItem item={item} />
              </li>
            ))}
          </ol>
        </div>
        <Pagination current={1} total={10} />
      </div>
    </section>
  );
}
