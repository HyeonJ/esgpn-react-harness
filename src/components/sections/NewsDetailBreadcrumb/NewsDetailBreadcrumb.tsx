/**
 * NewsDetailBreadcrumb — 뉴스 상세 Breadcrumb (Figma 134:4156).
 * 936×24. ← 화살표 + "뉴스" 링크.
 */
export function NewsDetailBreadcrumb() {
  return (
    <nav aria-label="뉴스 경로" className="mx-auto flex w-[936px] items-center">
      <a href="/news" className="flex items-center gap-[4px] text-[#1d2623]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" stroke="#1d2623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500, letterSpacing: -0.07 }}>뉴스</span>
      </a>
    </nav>
  );
}
