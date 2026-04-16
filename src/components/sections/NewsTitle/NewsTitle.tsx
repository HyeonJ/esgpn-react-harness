/**
 * NewsTitle — /news 페이지 타이틀 섹션 (Figma 129:2557).
 *
 * v4 원칙:
 * - 구조 중심: section + h1 + p (absolute 0, flex/items-end 정렬)
 * - 디자인 토큰: font-family-pretendard, spacing-8, text-md-15r-*, gray-000
 * - 48/Bold/LH1.3/LS -1.92는 토큰 부재 → inline (향후 text-4xl-48b 토큰 추가 시 교체 용이)
 * - near-black `text-black` 유지 (ContestAbout 전례)
 *
 * Baseline: figma-screenshots/news-title.png (936×124).
 * 캔버스 좌표 (492, 217). clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 124.
 */
export function NewsTitle() {
  return (
    <section
      aria-labelledby="news-title-heading"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
    >
      <div
        className="flex w-[936px] items-end justify-center gap-[var(--spacing-8)]"
        data-node-id="129:2557"
      >
        <h1
          id="news-title-heading"
          className="flex-1 min-w-0 font-bold leading-[1.3] text-black"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: 48,
            letterSpacing: "-1.92px",
          }}
          data-node-id="129:2558"
        >
          지식으로 여는
          <br aria-hidden="true" />
          지속 가능한 내일
        </h1>
        <p
          className="flex-1 min-w-0 text-right text-black"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: "var(--text-md-15r-size)",
            fontWeight: "var(--text-md-15r-weight)",
            lineHeight: "var(--text-md-15r-line-height)",
            letterSpacing: "var(--text-md-15r-letter-spacing)",
          }}
          data-node-id="129:2559"
        >
          단순한 소식을 넘어, 실질적인 변화의 실마리가 될
          <br aria-hidden="true" />
          전문적인 지식과 최신 동향을 기록합니다.
        </p>
      </div>
    </section>
  );
}
