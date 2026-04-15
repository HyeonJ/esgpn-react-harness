/**
 * NewsTitle — 뉴스 페이지 타이틀 (Figma 129:2557).
 * 936×124, 좌 Heading3 + 우 Heading3.
 * Figma 원본은 placeholder ("Amazon bets $233M..."). 사전 추정 카피 사용.
 */
export function NewsTitle() {
  return (
    <section className="mx-auto w-[936px]">
      <div className="flex items-end gap-[32px]">
        <h3
          className="font-bold text-black whitespace-nowrap"
          style={{ fontSize: 48, lineHeight: 1.3, letterSpacing: -1.92 }}
        >
          지식으로 여는
          <br />
          지속 가능한 내일
        </h3>
        <p
          className="flex-1 text-right font-normal text-black"
          style={{ fontSize: 15, lineHeight: 1.5, letterSpacing: -0.1125 }}
        >
          ESG 실천의 현장과 인사이트를 한곳에서 만나보세요.
          <br />
          최신 뉴스와 자료로 지속 가능한 미래를 함께 탐색합니다.
        </p>
      </div>
    </section>
  );
}
