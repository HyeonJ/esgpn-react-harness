import iconPoint from "@/assets/main-programs-card2/icon-point.svg";

/**
 * inner 카드 중단 3 포인트 블록 (Figma 252:1088).
 * 아이콘 20×20 (blue circle stroke + check) + 16M 텍스트, gap=12. 행간 16.
 * 3개 아이콘 모두 동일 icon-point.svg (§4.3 검증: 시각 차 육안 구분 불가).
 */
const ROWS = [
  "SDGs · ESG 기반 현장 문제해결",
  "대학 · 청년 · 지역 연계 팀 프로젝트",
  "대회로 끝나지 않고 실천과제로 연결",
];

export function CardPoints() {
  return (
    <div
      className="flex flex-col"
      style={{ gap: 16, width: 253 }}
      data-node-id="252:1088"
    >
      {ROWS.map((text, i) => (
        <div key={i} className="flex items-center" style={{ gap: 12 }}>
          <img
            src={iconPoint}
            alt=""
            aria-hidden="true"
            className="block shrink-0"
            style={{ width: 20, height: 20 }}
          />
          <p
            className="font-['Pretendard_Variable'] font-medium"
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              letterSpacing: "-0.16px",
              color: "#1d2623",
            }}
          >
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}
