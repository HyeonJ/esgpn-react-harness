import { Link } from "react-router-dom";

/**
 * News list page tabs section.
 * Figma source: 129:2196 (936×29, 2-tab border-bottom pill).
 * Active: "뉴스" gray-900 border-b-1.5 gray-900.
 * Inactive: "자료실" gray-400 border-b-1.5 gray-200.
 *
 * Note: 기존 `SectionTabs` (ui/) 는 글자 밑줄 패턴이라 구조가 다름 → 로컬 인라인 정의.
 * 3번째 border-bottom pill 탭 등장 시 공통 컴포넌트로 추출 (Rule of Three).
 */
export function NewsTabs() {
  const baseTab =
    "px-4 py-1 border-b-[1.5px] text-[length:var(--text-sm-14m-size)] font-[number:var(--text-sm-14m-weight)] leading-[var(--text-sm-14m-line-height)] tracking-[var(--text-sm-14m-letter-spacing)] text-center";

  return (
    <section
      aria-label="뉴스 목록 섹션 탭"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
      style={{ height: 30 }}
    >
      <nav
        aria-label="뉴스/자료실 탭"
        className="flex items-center justify-center gap-2"
      >
        <Link
          to="/news"
          aria-current="page"
          className={`${baseTab} border-gray-900 text-gray-900`}
        >
          뉴스
        </Link>
        <Link
          to="/resources"
          className={`${baseTab} border-gray-200 text-gray-400 hover:text-gray-700 transition-colors`}
        >
          자료실
        </Link>
      </nav>
    </section>
  );
}
