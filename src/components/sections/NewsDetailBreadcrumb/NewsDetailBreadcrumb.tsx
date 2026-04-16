import { Link } from "react-router-dom";

/**
 * NewsDetailBreadcrumb — /news/:id 페이지 "이전으로" 내비게이션 섹션 (Figma 134:4156).
 *
 * 시맨틱: <nav aria-label="breadcrumb"> + 단일 <Link to="/news">
 * (트레일이 아닌 "이전으로" 버튼형 링크이므로 <ol> 대신 단일 링크가 정확)
 *
 * 구성:
 * - Arrow Type 4 (chevron down, -90° → left) — 24×24 컨테이너, 11×6 inline SVG
 * - 텍스트: "이전으로" — text-sm/14M tokens, gray-500
 *
 * Baseline: figma-screenshots/news-detail-breadcrumb.png (936×24).
 * 캔버스 좌표 (492, 140). clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 24.
 */
export function NewsDetailBreadcrumb() {
  return (
    <nav
      aria-label="breadcrumb"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
    >
      <div className="w-[936px]" data-node-id="134:4156">
        <Link
          to="/news"
          className="inline-flex items-center gap-[var(--spacing-1)] text-[color:var(--color-gray-500)]"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: "var(--text-sm-14m-size)",
            fontWeight: "var(--text-sm-14m-weight)",
            lineHeight: "var(--text-sm-14m-line-height)",
            letterSpacing: "var(--text-sm-14m-letter-spacing)",
          }}
        >
          <span
            className="inline-flex size-[24px] items-center justify-center"
            data-node-id="134:4124"
            aria-hidden="true"
          >
            {/* Arrow Type 4: 11×6 chevron-down path, -rotate-90 → left chevron.
                 viewBox 0 0 11 6 유지, transform으로 회전. */}
            <svg
              width="6"
              height="11"
              viewBox="0 0 11 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotate(-90deg)" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.14645 0.146447C5.34171 -0.0488155 5.65829 -0.0488155 5.85355 0.146447L10.8536 5.14645C11.0488 5.34171 11.0488 5.65829 10.8536 5.85355C10.6583 6.04882 10.3417 6.04882 10.1464 5.85355L5.5 1.20711L0.853553 5.85355C0.658291 6.04882 0.341709 6.04882 0.146447 5.85355C-0.0488155 5.65829 -0.0488155 5.34171 0.146447 5.14645L5.14645 0.146447Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span data-node-id="134:4155">이전으로</span>
        </Link>
      </div>
    </nav>
  );
}
