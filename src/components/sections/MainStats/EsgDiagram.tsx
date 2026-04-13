/**
 * EsgDiagram — 우측 Group 10 (29:351) 전체 재현.
 * bbox: 678×535 (캔버스 x=990 y=252.5).
 *
 * 자식 4개가 inline-grid 1셀에 겹치는 원본 패턴:
 *   (1) ESG 3원 (ml=51  mt=0)   — Environmental / Social / Governance, mr=-12 오버랩
 *   (2) 설명 3컬럼 (ml=0   mt=404)  — 자본시장 / 소비 / 법적 공시
 *   (3) WHY? pill (ml=289.43 mt=280) — brand-500 pill
 *   (4) connector 6개 inline SVG — absolute 레이어 (grid 셀 크기 영향 X)
 *
 * Connector 방향 (baseline 육안 확정):
 *   - 상단 3개(WHY?→E/S/G): 화살표 머리는 원 방향 (위쪽 끝)
 *   - 하단 3개(WHY?→자본/소비/법적): 화살표 머리는 설명 박스 방향 (아래쪽 끝)
 *   - stroke: gray-300 (#c6cdcc), stroke-width 1
 *
 * 좌표계 (Group 10 원점 0,0 기준):
 *   E원 중앙 x = 51 + 100 = 151
 *   S원 중앙 x = 51 + 200 - 12 + 100 = 339  (design_context 계산상 338.5)
 *   G원 중앙 x = 51 + 2*(200-12) + 100 = 527
 *   E원 하단 y = 200
 *   설명 1 중앙 x = 107.5 (0 + 215/2)
 *   설명 2 중앙 x = 338.5 (231 + 107.5)
 *   설명 3 중앙 x = 569.5 (462 + 107.5)
 *   설명 상단 y = 404
 *   WHY? pill: ml=289.43 mt=280, w=98.145 h=44
 *     → left=289.43, right=387.575, top=280, bottom=324
 *     → 상단 중앙 (338.5, 280), 하단 중앙 (338.5, 324)
 *   connector bbox y 범위: 203.25~276.75(위), 327.25~400.75(아래)
 *     → 위쪽 라인 start y=276.75 (WHY? 상단 근처), end y=203.25 (원 아래)
 *     → 아래쪽 라인 start y=327.25 (WHY? 하단 근처), end y=400.75 (설명 위)
 *     → 꺾임 중간 y: 위쪽 240, 아래쪽 364 (각각 bbox 중앙)
 */

const STROKE = "var(--color-gray-300)";
const STROKE_W = 1;

// 원 안 텍스트 색
const TEXT_DARK = "var(--color-gray-900)";

// ESG 원 색 (rgba — tokens.css에 alpha variant 없음, inline 유지)
const RING_E = "rgba(79, 182, 84, 0.16)";
const RING_S = "rgba(79, 182, 84, 0.28)";
const RING_G = "rgba(79, 182, 84, 0.4)";

// 설명 3컬럼 데이터
const DESCRIPTIONS = [
  {
    title: "자본시장의 필수 요건",
    body: [
      "이제 ESG는 투자자의 의사결정 시",
      "기업 가치에 영향을 미치는",
      "핵심 비재무적 요소입니다.",
    ],
  },
  {
    title: "소비 트렌드의 변화",
    body: [
      "소비자들은 세상에 유익을 주는",
      "기업을 응원하며, 가치 소비가",
      "확산되고 있습니다.",
    ],
  },
  {
    title: "법적 공시 의무화",
    body: [
      "2030년부터 모든 코스피 상장사는",
      "ESG 정보를 의무적으로 공시해야",
      "하는 규제 환경에 직면해 있습니다.",
    ],
  },
] as const;

// ESG 원 데이터
const ESG_CIRCLES = [
  { bg: RING_E, en: "Environmental", ko: "환경" },
  { bg: RING_S, en: "Social", ko: "사회" },
  { bg: RING_G, en: "Governance", ko: "지배구조" },
] as const;

export function EsgDiagram() {
  return (
    <div
      className="relative flex-none"
      style={{ width: 678, height: 535 }}
      data-node-id="29:351"
    >
      {/* (1) ESG 3원 — ml=51 mt=0 */}
      <div
        className="absolute flex items-center"
        style={{ left: 51, top: 0, paddingRight: 12 }}
      >
        {ESG_CIRCLES.map((c, i) => (
          <div
            key={c.en}
            className="rounded-full flex flex-col items-center justify-center"
            style={{
              width: 200,
              height: 200,
              backgroundColor: c.bg,
              marginRight: i < ESG_CIRCLES.length - 1 ? -12 : 0,
              paddingTop: 8,
              gap: 20,
            }}
          >
            <p
              className="font-['Pretendard_Variable'] font-bold whitespace-nowrap"
              style={{
                fontSize: 24,
                lineHeight: 1.4,
                letterSpacing: "-0.6px",
                color: TEXT_DARK,
              }}
            >
              {c.en}
            </p>
            <p
              className="font-['Pretendard_Variable'] font-normal text-center"
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                letterSpacing: "-0.27px",
                color: TEXT_DARK,
              }}
            >
              {c.ko}
            </p>
          </div>
        ))}
      </div>

      {/* (4) Connector SVG — absolute overlay, Group 10 전체 덮음 */}
      <svg
        className="absolute pointer-events-none"
        style={{ left: 0, top: 0 }}
        width={678}
        height={535}
        viewBox="0 0 678 535"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arrow-up"
            viewBox="0 0 10 10"
            refX="5"
            refY="2"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 8 L 5 0 L 10 8 Z" fill={STROKE} />
          </marker>
          <marker
            id="arrow-down"
            viewBox="0 0 10 10"
            refX="5"
            refY="8"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 5 10 L 10 2 Z" fill={STROKE} />
          </marker>
        </defs>

        {/* 상단 3개 — WHY? 위(338.5, 276.75)에서 E/S/G 원 하단(y=203.25)으로 */}
        {/* 1: WHY? → E원 (x 338.5 → 151) — ㄱ자: 수직↑ + 수평← + 수직↑ */}
        <path
          d="M 338.5 276.75 V 240 H 151 V 203.25"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          fill="none"
          markerEnd="url(#arrow-up)"
          data-node-id="29:324"
        />
        {/* 2: WHY? → S원 (x 338.5, 수직) */}
        <path
          d="M 338.5 276.75 V 203.25"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          fill="none"
          markerEnd="url(#arrow-up)"
          data-node-id="29:331"
        />
        {/* 3: WHY? → G원 (x 338.5 → 527) — ㄴ자 */}
        <path
          d="M 338.5 276.75 V 240 H 527 V 203.25"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          fill="none"
          markerEnd="url(#arrow-up)"
          data-node-id="29:335"
        />

        {/* 하단 3개 — WHY? 아래(338.5, 327.25)에서 설명 상단(y=400.75)으로 */}
        {/* 4: WHY? → 법적 (x 338.5 → 569.5) — ㄴ자 아래 */}
        <path
          d="M 338.5 327.25 V 364 H 569.5 V 400.75"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          fill="none"
          markerEnd="url(#arrow-down)"
          data-node-id="29:339"
        />
        {/* 5: WHY? → 소비 (x 338.5, 수직) */}
        <path
          d="M 338.5 327.25 V 400.75"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          fill="none"
          markerEnd="url(#arrow-down)"
          data-node-id="29:343"
        />
        {/* 6: WHY? → 자본시장 (x 338.5 → 107.5) — ㄱ자 아래 */}
        <path
          d="M 338.5 327.25 V 364 H 107.5 V 400.75"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          fill="none"
          markerEnd="url(#arrow-down)"
          data-node-id="29:347"
        />
      </svg>

      {/* (3) WHY? pill — ml=289.43 mt=280 */}
      <div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          left: 289.43,
          top: 280,
          width: 98.145,
          height: 44,
          backgroundColor: "var(--color-brand-500)",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <p
          className="font-['Pretendard_Variable'] font-bold whitespace-nowrap"
          style={{
            fontSize: 20,
            lineHeight: 1.4,
            letterSpacing: "-0.4px",
            color: "var(--color-gray-000)",
          }}
        >
          WHY?
        </p>
      </div>

      {/* (2) 설명 3컬럼 — ml=0 mt=404 */}
      <div
        className="absolute flex items-start"
        style={{ left: 0, top: 404, width: 678, gap: 16 }}
      >
        {DESCRIPTIONS.map((d) => (
          <div
            key={d.title}
            className="flex flex-col items-start text-center"
            style={{
              width: 215,
              gap: 16,
              paddingTop: 16,
              paddingBottom: 8,
            }}
          >
            <p
              className="font-['Pretendard_Variable'] font-bold"
              style={{
                fontSize: 20,
                lineHeight: 1.4,
                letterSpacing: "-0.4px",
                color: TEXT_DARK,
                width: "100%",
              }}
            >
              {d.title}
            </p>
            <p
              className="font-['Pretendard_Variable'] font-normal"
              style={{
                fontSize: 14,
                lineHeight: 1.5,
                letterSpacing: "-0.07px",
                color: TEXT_DARK,
                width: "100%",
              }}
            >
              {d.body.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < d.body.length - 1 ? <br aria-hidden="true" /> : null}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EsgDiagram;
