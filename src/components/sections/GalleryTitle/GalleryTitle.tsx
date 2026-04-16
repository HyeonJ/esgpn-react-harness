/**
 * GalleryTitle — /gallery 페이지 타이틀 섹션 (Figma 314:6837).
 *
 * v4 원칙:
 * - 구조 중심: section + h1 + p (flex items-end 하단 정렬)
 * - 디자인 토큰: font-family-pretendard, spacing-8, text-md-15r-*, gray-000
 * - 48/Bold/LH1.3/LS -1.92는 전용 토큰 부재 → inline (Rule of Three 2/3: NewsTitle + 본 섹션)
 * - ESGPN 교정: Figma 원본 "ESPGN" 오타를 프로젝트 공식 표기로 정정 (v4 지시 ⚠2-1)
 * - `text-black` 유지 (NewsTitle/ContestAbout 전례)
 *
 * Baseline: figma-screenshots/gallery-title.png (936×124).
 * 캔버스 좌표 (492, 180). clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 124 (preview 라우트 기준).
 */
export function GalleryTitle() {
  return (
    <section
      aria-labelledby="gallery-title-heading"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
    >
      <div
        className="flex w-[936px] items-end justify-center gap-[var(--spacing-8)]"
        data-node-id="314:6837"
      >
        <h1
          id="gallery-title-heading"
          className="shrink-0 whitespace-nowrap font-bold leading-[1.3] text-black"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: 48,
            letterSpacing: "-1.92px",
          }}
          data-node-id="314:6838"
        >
          실천이 만든 변화의 순간들,
          <br aria-hidden="true" />
          ESGPN 아카이브
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
          data-node-id="314:6839"
        >
          이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다.
          <br aria-hidden="true" />
          우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다.
        </p>
      </div>
    </section>
  );
}
