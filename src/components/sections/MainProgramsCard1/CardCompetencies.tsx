/**
 * inner 카드 하단 필수 역량 블록 (Figma 252:1050).
 * - 라벨 row: bullet 3×17 + "필수 역량" 18SB gray-900 lh 1.4 ls -0.27px
 * - ul 6 li: 16R gray-900 lh 1.5 ls -0.16px, disc marker color gray-900
 */
const ITEMS = [
  "지역사회와 상생으로 균형잡힌 지속가능성 실천",
  "사회적 가치 창출로 고객 신뢰와 브랜드 가치 제고",
  "윤리적 의사결정과 투명한 정보 공개로 조직 신뢰 제고",
  "지역 사회 ESG 문제 해결",
  "취약계층·청년대상 ESG 교육",
  "대학·기업·지자체 협력 프로젝트",
];

export function CardCompetencies() {
  return (
    <div
      className="flex flex-col"
      style={{ gap: 12, width: 456 }}
      data-node-id="252:1050"
    >
      {/* 라벨 row */}
      <div
        className="flex items-center"
        style={{ gap: 8 }}
        data-node-id="252:1051"
      >
        <div
          className="flex items-center justify-center"
          style={{ paddingTop: 4, paddingBottom: 4 }}
        >
          <div
            className="shrink-0"
            style={{
              width: 3,
              height: 17,
              borderRadius: 24,
              backgroundColor: "#4fb654",
            }}
            aria-hidden="true"
          />
        </div>
        <p
          className="font-['Pretendard_Variable'] font-semibold"
          style={{
            fontSize: 18,
            lineHeight: 1.4,
            letterSpacing: "-0.27px",
            color: "#1d2623",
          }}
        >
          필수 역량
        </p>
      </div>

      {/* ul */}
      <ul
        className="font-['Pretendard_Variable'] font-normal list-disc marker:text-[#1d2623]"
        style={{
          fontSize: 16,
          lineHeight: 1.5,
          letterSpacing: "-0.16px",
          color: "#1d2623",
          paddingLeft: 24,
        }}
        data-node-id="252:1054"
      >
        {ITEMS.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
