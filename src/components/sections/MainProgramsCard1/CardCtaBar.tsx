import arrowChevron from "@/assets/main-programs-card1/arrow-chevron.svg";

/**
 * 연두 CTA bar (Figma 252:1058).
 * bg #caeb69 rounded-[48px] h=64 w=600 py-16 px-24.
 * 좌: "자세히 보기" 20B #0c3b0e lh 1.4 ls -0.4px.
 * 우: 화살표 3겹 오버랩 (gap -16 달성: 각 화살표 mr-[-16px] + container pr-[16px]).
 */
export function CardCtaBar() {
  return (
    <div
      className="flex items-center justify-between rounded-[48px]"
      style={{
        backgroundColor: "#caeb69",
        height: 64,
        width: 600,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 24,
      }}
      data-node-id="252:1058"
    >
      <span
        className="font-['Pretendard_Variable'] font-bold"
        style={{
          fontSize: 20,
          lineHeight: 1.4,
          letterSpacing: "-0.4px",
          color: "#0c3b0e",
        }}
      >
        자세히 보기
      </span>

      <div
        className="flex items-center"
        style={{ paddingRight: 16 }}
        data-node-id="252:1060"
      >
        {[0, 1, 2].map((i) => (
          <img
            key={i}
            src={arrowChevron}
            alt=""
            aria-hidden="true"
            className="block shrink-0"
            style={{ width: 32, height: 32, marginRight: -16 }}
          />
        ))}
      </div>
    </div>
  );
}
