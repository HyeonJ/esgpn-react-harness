import { Link } from "react-router-dom";

/**
 * NewsDetailBack — /news/:id 페이지 하단 "목록으로 이동하기" 버튼 섹션 (Figma 134:4123).
 *
 * 시맨틱: <nav aria-label="뉴스 목록으로 이동"> + 단일 <Link to="/news">
 *   - `<button>` + navigate() 대신 `<Link>` 선택 (SEO + 비JS 동작 보장)
 *
 * 디자인:
 *   - Frame 12 (134:4123) 936×45 / flex-col items-start justify-center
 *   - Button (134:4120) 140×45 pill — 1.5px border #c6cdcc / rounded-2xl / bg white / px-5 py-3
 *   - Text (134:4121) "목록으로 이동하기" — text-sm/14M gray-400 (Figma 원본은 "목록으도" typo; 의도 반영)
 *
 * 자기정렬: mx-auto max-w-[1920px] w-full — Preview 래퍼 의존 금지.
 * Baseline: figma-screenshots/news-detail-back.png (937×47, flat composite).
 * clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 45
 */
export function NewsDetailBack() {
  return (
    <nav
      aria-label="뉴스 목록으로 이동"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
    >
      <div
        className="flex w-[936px] flex-col items-start justify-center"
        data-node-id="134:4123"
      >
        <Link
          to="/news"
          className="inline-flex items-center justify-center rounded-2xl border-[1.5px] bg-white px-5 py-3 text-[color:var(--color-gray-400)]"
          style={{
            borderColor: "var(--color-gray-300)",
            fontFamily: "var(--font-family-pretendard)",
            fontSize: "var(--text-sm-14m-size)",
            fontWeight: "var(--text-sm-14m-weight)",
            lineHeight: "var(--text-sm-14m-line-height)",
            letterSpacing: "var(--text-sm-14m-letter-spacing)",
          }}
          data-node-id="134:4120"
        >
          <span data-node-id="134:4121">목록으로 이동하기</span>
        </Link>
      </div>
    </nav>
  );
}
