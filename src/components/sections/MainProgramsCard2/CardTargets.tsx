/**
 * inner 카드 하단 "주요 대상" 블록 (Figma 252:1104).
 * - 라벨 row: bullet 3×17 bg-#2D7EFF + "주요 대상" 18SB gray-900 lh 1.4 ls -0.27px
 * - ul 3 li: 16R gray-900 lh 1.5 ls -0.16px, disc marker color gray-900
 */
const ITEMS = [
  "대학생 · 청년",
  "대학 · 지역 혁신 조직",
  "ESG에 관심 있는 기업 · 기관",
];

export function CardTargets() {
  return (
    <div
      className="flex flex-col"
      style={{ gap: 12, width: 520 }}
      data-node-id="252:1104"
    >
      {/* 라벨 row */}
      <div
        className="flex items-center"
        style={{ gap: 8 }}
        data-node-id="252:1105"
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
              backgroundColor: "#2D7EFF",
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
          data-node-id="252:1107"
        >
          주요 대상
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
        data-node-id="252:1108"
      >
        {ITEMS.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
