import arrowChevron from "@/assets/main-programs-card2/arrow-chevron.svg";

/**
 * 하늘 blue CTA bar (Figma 252:1112).
 * bg #A5D9FF rounded-[48px] h=64 w=600 py-16 px-24.
 * 좌: "자세히 보기" 20B #0C173B lh 1.4 ls -0.4px.
 * 우: 화살표 3겹 오버랩 (gap -16 달성: 각 화살표 mr-[-16px] + container pr-[16px]).
 */
export function CardCtaBar() {
  return (
    <div
      className="flex items-center justify-between rounded-[48px]"
      style={{
        backgroundColor: "#A5D9FF",
        height: 64,
        width: 600,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 24,
      }}
      data-node-id="252:1112"
    >
      <span
        className="font-['Pretendard_Variable'] font-bold"
        style={{
          fontSize: 20,
          lineHeight: 1.4,
          letterSpacing: "-0.4px",
          color: "#0C173B",
        }}
        data-node-id="252:1113"
      >
        자세히 보기
      </span>

      <div
        className="flex items-center"
        style={{ paddingRight: 16 }}
        data-node-id="252:1114"
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
