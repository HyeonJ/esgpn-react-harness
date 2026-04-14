/**
 * NewsDetailBack — 목록으로 이동하기 버튼 (Figma 134:4123). 936×45.
 */
export function NewsDetailBack() {
  return (
    <section className="mx-auto flex w-[936px] items-center">
      <a
        href="/news"
        className="inline-flex items-center gap-[8px] rounded-full border border-[#d3d8de] bg-white px-[20px] py-[12px] text-[#1d2623] hover:bg-[#f5f6f7]"
        style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500, letterSpacing: -0.07 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 4L6 8l4 4" stroke="#1d2623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        목록으로 이동하기
      </a>
    </section>
  );
}
