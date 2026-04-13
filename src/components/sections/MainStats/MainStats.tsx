import { StatItem } from "./StatItem";
import { EsgDiagram } from "./EsgDiagram";

/**
 * 메인페이지 Stats 섹션.
 * Figma 노드: 26:273 (Frame 2042062941), 1920×1040, 풀폭 white BG.
 *
 * 구조:
 *   root section: flex gap-63 items-center, px-252 py-200
 *     - 좌측 컬럼 675×437 (인디케이터 24 + 텍스트 579, gap 72)
 *       - 인디케이터: 큰 원 16×16 (y=199.5, 작은 점) + 작은 원 6×6 (y=221.5) — main-intro R7 패턴
 *       - 헤딩 블록 579×213 (gap 24)
 *       - stat 그룹 4개 494×112 (flex gap 32)
 *     - 우측 EsgDiagram 678×535
 */
export function MainStats() {
  return (
    <section
      className="relative w-[1920px] h-[1040px] mx-auto bg-white overflow-hidden flex items-center justify-center"
      style={{ paddingLeft: 252, paddingRight: 252, paddingTop: 200, paddingBottom: 200, gap: 63 }}
      aria-label="ESG 중요성 스탯"
      data-node-id="26:273"
    >
      {/* 좌측 컬럼: 인디케이터 + 텍스트 */}
      <div
        className="relative flex-none"
        style={{ width: 675, height: 437 }}
      >
        {/* 인디케이터 점 (Ellipse2 6×6 상단, Ellipse1 16×16 하단) — main-intro R7과 동일 */}
        <div className="absolute" style={{ left: 9, top: 199.5 }}>
          <div
            className="rounded-full"
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              backgroundColor: "var(--color-gray-300)",
            }}
          />
        </div>
        <div className="absolute" style={{ left: 4, top: 221.5 }}>
          <div
            className="rounded-full"
            aria-hidden="true"
            style={{
              width: 16,
              height: 16,
              border: "1px solid var(--color-gray-300)",
              backgroundColor: "transparent",
            }}
          />
        </div>

        {/* 텍스트 컬럼: 인디케이터(24) + gap 72 → left 96, w 579 */}
        <div
          className="absolute flex flex-col"
          style={{ left: 96, top: 0, width: 579, gap: 112 }}
        >
          {/* 헤딩 블록 (gap 24) */}
          <div className="flex flex-col" style={{ gap: 24 }}>
            {/* 헤딩 그룹 (gap 8) */}
            <div className="flex flex-col" style={{ gap: 8 }}>
              <p
                className="font-['Pretendard_Variable'] font-normal whitespace-nowrap"
                style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  letterSpacing: "-0.07px",
                  color: "var(--color-gray-500)",
                }}
              >
                ESG가 왜 중요할까?
              </p>
              <h2
                className="font-['Pretendard_Variable'] font-bold"
                style={{
                  fontSize: 48,
                  lineHeight: "56px",
                  letterSpacing: "0px",
                  color: "var(--color-gray-900)",
                }}
              >
                단순한 트렌드를 넘어,
                <br aria-hidden="true" />
                모두의 새로운 생존 문법
              </h2>
            </div>
            {/* 본문 2줄 */}
            <p
              className="font-['Pretendard_Variable'] font-normal"
              style={{
                fontSize: 16,
                lineHeight: 1.5,
                letterSpacing: "-0.16px",
                color: "var(--color-gray-900)",
              }}
            >
              이제 ESG는 기업의 성적표가 아닙니다. 우리가 살아가는
              <br aria-hidden="true" />
              사회와 지구를 지키기 위한 가장 현실적인 행동 지침이자 약속입니다.
            </p>
          </div>

          {/* stat 4개 — flex gap 32 items-center */}
          <div
            className="flex items-center"
            style={{ gap: 32 }}
          >
            <StatItem
              value="97"
              unit="%"
              caption={
                <>
                  ESG를 고려하는
                  <br aria-hidden="true" />
                  글로벌 투자자
                </>
              }
            />
            <StatItem
              value="85"
              unit="%"
              caption="ESG를 중시하는 소비자"
            />
            <StatItem
              value="70"
              unit="%"
              caption={
                <>
                  구직자
                  <br aria-hidden="true" />
                  기업 ESG 확인
                </>
              }
            />
            <StatItem
              value="2028"
              caption={
                <>
                  ESG 공시
                  <br aria-hidden="true" />
                  의무화 시작
                </>
              }
              width={116}
            />
          </div>
        </div>
      </div>

      {/* 우측 ESG 다이어그램 */}
      <EsgDiagram />
    </section>
  );
}

export default MainStats;
