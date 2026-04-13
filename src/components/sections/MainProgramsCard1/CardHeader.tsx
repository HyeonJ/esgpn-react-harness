import progressBar from "@/assets/main-programs-card1/progress-bar.svg";

/**
 * inner 카드 상단 블록 (Figma 252:1017).
 * - progress bar SVG (520×20)
 * - h1 "ESG마인드 자격검정" (36B gray-900 lh 1.3 ls -1.08px)
 * - 체크리스트 2줄 (bullet 3×16 rounded-24 + 16M 텍스트)
 */
const CHECK_ROWS = [
  "ESG를 알고 있는 사람이 아니라 ESG를 실천할 수 있는 사람을 인증하는 자격",
  "ESG 실천을 위한 기관의 역할과 ESG에 필요한 교육 생태계 구축을 목적으로 개발",
];

export function CardHeader() {
  return (
    <div
      className="flex flex-col w-[520px]"
      style={{ gap: 16 }}
      data-node-id="252:1017"
    >
      {/* progress bar row */}
      <div
        className="flex items-center w-full"
        style={{ height: 20, gap: 4 }}
        data-node-id="252:1018"
      >
        <img
          src={progressBar}
          alt=""
          aria-hidden="true"
          className="block"
          style={{ width: 520, height: 20 }}
        />
      </div>

      {/* h1 */}
      <h2
        className="font-['Pretendard_Variable'] font-bold"
        style={{
          fontSize: 36,
          lineHeight: 1.3,
          letterSpacing: "-1.08px",
          color: "#1d2623",
        }}
        data-node-id="252:1024"
      >
        ESG마인드 자격검정
      </h2>

      {/* 체크리스트 2줄 */}
      <div
        className="flex flex-col w-full"
        style={{ gap: 12 }}
        data-node-id="252:1025"
      >
        {CHECK_ROWS.map((text, i) => (
          <div key={i} className="flex items-start" style={{ gap: 8 }}>
            {/* bullet wrapper: py-4 → 24 total with 16 inner */}
            <div
              className="flex items-center justify-center"
              style={{ paddingTop: 4, paddingBottom: 4 }}
            >
              <div
                className="shrink-0"
                style={{
                  width: 3,
                  height: 16,
                  borderRadius: 24,
                  backgroundColor: "#4fb654",
                }}
                aria-hidden="true"
              />
            </div>
            <p
              className="font-['Pretendard_Variable'] font-medium flex-1"
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
    </div>
  );
}
