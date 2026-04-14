/**
 * HatchedDivider — 좌우 해치(`///`) + 중앙 실선.
 * research/about-mission.md §3.1 측정치: 폭 932px, 높이 10px.
 * 공통 컴포넌트 (AboutMission 2개 + AboutValues 2개 = 4회 사용, Rule of Three 충족 후 승격).
 */
export function HatchedDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="932"
      height="10"
      viewBox="0 0 932 10"
      fill="none"
      aria-hidden="true"
    >
      {/* 좌측 해치 */}
      <g stroke="#97A29E" strokeWidth="1">
        <line x1="0" y1="10" x2="7" y2="0" />
        <line x1="8" y1="10" x2="15" y2="0" />
        <line x1="16" y1="10" x2="23" y2="0" />
        <line x1="24" y1="10" x2="31" y2="0" />
      </g>
      {/* 중앙 실선 */}
      <line x1="41" y1="5" x2="889" y2="5" stroke="#B1B9B6" strokeWidth="1" />
      {/* 우측 해치 */}
      <g stroke="#97A29E" strokeWidth="1">
        <line x1="900" y1="10" x2="907" y2="0" />
        <line x1="908" y1="10" x2="915" y2="0" />
        <line x1="916" y1="10" x2="923" y2="0" />
        <line x1="924" y1="10" x2="931" y2="0" />
      </g>
    </svg>
  );
}
