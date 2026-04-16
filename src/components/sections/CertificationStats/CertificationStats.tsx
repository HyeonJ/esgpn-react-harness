/**
 * CertificationStats — /certification 페이지의 통계 바.
 * Figma node: 299:3862 (1920×194, page y=633~827 overlap 영역)
 *
 * 구조:
 *   - <section> 풀폭 1920, height 194, flex-row gap-4 items/justify center, py-12
 *   - 섹션 자체 배경은 투명 (페이지에선 Hero raster 배경 위에 overlay되는 영역)
 *   - 3 stat (숫자+설명) + 2 세로 divider (1px #C6CDCC, height 64)
 *
 * v4 원칙:
 *   - 시맨틱: <section aria-labelledby>, <h2 sr-only>, <ul>/<li> 통계 목록, <dl>/<dt>/<dd>로 숫자/라벨 페어
 *   - absolute 0 (flex-row만), 에셋 0 (CSS divider)
 *   - 토큰: --color-gray-000 (white), --color-gray-300 (#C6CDCC), --spacing-*, --font-family-pretendard
 */

interface StatItemProps {
  big: string;
  small: string;
  bigSize: 40 | 48;
  bigLetterSpacing: string;
}

function StatItem({ big, small, bigSize, bigLetterSpacing }: StatItemProps) {
  return (
    <li className="flex w-[240px] shrink-0 list-none">
      <dl className="flex w-full flex-col items-center gap-3 text-center">
        <dt
          className="w-full font-bold text-gray-000"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: bigSize,
            lineHeight: 1.3,
            letterSpacing: bigLetterSpacing,
          }}
        >
          {big}
        </dt>
        <dd
          className="w-full font-medium text-gray-000"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: 16,
            lineHeight: 1.5,
            letterSpacing: "-0.16px",
          }}
        >
          {small}
        </dd>
      </dl>
    </li>
  );
}

function DividerLine() {
  return (
    <span
      role="separator"
      aria-orientation="vertical"
      className="inline-block shrink-0"
      style={{
        width: 1,
        height: 64,
        backgroundColor: "var(--color-gray-300)",
      }}
    />
  );
}

export function CertificationStats() {
  return (
    <section
      aria-labelledby="certification-stats-title"
      className="mx-auto flex w-full max-w-[1920px] flex-row items-center justify-center gap-4"
      style={{
        height: 194,
        paddingTop: "var(--spacing-12)",
        paddingBottom: "var(--spacing-12)",
      }}
    >
      <h2 id="certification-stats-title" className="sr-only">
        자격검정 성과
      </h2>
      <ul className="flex flex-row items-center justify-center gap-4 p-0">
        <StatItem big="1,500+" small="자격 취득자" bigSize={48} bigLetterSpacing="-1.92px" />
        <DividerLine />
        <StatItem big="이론부터 실행" small="체계적 과정" bigSize={40} bigLetterSpacing="-1.6px" />
        <DividerLine />
        <StatItem big="100%" small="온라인 응시" bigSize={48} bigLetterSpacing="-1.92px" />
      </ul>
    </section>
  );
}
