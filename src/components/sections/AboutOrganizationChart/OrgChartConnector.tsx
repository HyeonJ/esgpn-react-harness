/**
 * OrgChartConnector — 수직 라인 2 px + 끝 dot (r=2.5, #0C3B0E).
 * viewBox `-3 0 6 (height+6)` 로 중심축 0을 wrapper left+3에 맞춤.
 * 배치 시 `left-[957px]` → 화면 라인 x=959~960 (strokeWidth 2 pixel-align).
 * baseline §3.3: 라인 h=61, dot 지름 ~5 px (cy = height + 3).
 */
export function OrgChartConnector({
  height = 61,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const totalHeight = height + 6;
  return (
    <svg
      width="6"
      height={totalHeight}
      viewBox={`-3 0 6 ${totalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={height}
        stroke="#0C3B0E"
        strokeWidth="2"
        strokeLinecap="butt"
      />
      <circle cx="0" cy={height + 3} r="2.5" fill="#0C3B0E" />
    </svg>
  );
}

export default OrgChartConnector;
