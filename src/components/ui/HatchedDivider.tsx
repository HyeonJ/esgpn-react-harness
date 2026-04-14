import type { ReactNode } from "react";

/**
 * HatchedDivider — 좌우 해치(`///`) + 중앙 실선.
 * research/about-mission.md §3.1 측정치: 폭 932px, 높이 10px.
 * 공통 컴포넌트 (AboutMission 2개 + AboutValues 2개 = 4회 사용, Rule of Three 충족 후 승격).
 *
 * label prop 확장 (about-organization-logos):
 *  - label 미제공 시 기존 단일 SVG (932×10) 유지 — AboutMission/AboutValues backward-compatible.
 *  - label 제공 시 좌측 해치+라인 SVG + 중앙 텍스트 + 우측 라인+해치 SVG 분할 렌더.
 *    research/about-organization-logos.md §3.1 측정:
 *      좌 라인(x=535~925, w=390) · 라벨 영역(x=933~986) · 우 라인(x=994~1384, w=390).
 *      총 wrapper 폭 1920-2*491 = 938, 중앙 정렬은 부모에서 처리.
 */
export function HatchedDivider({
  className = "",
  label,
}: {
  className?: string;
  label?: ReactNode;
}) {
  if (label === undefined || label === null) {
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

  // label 분기 — 좌/우 분할. baseline 측정 기반:
  // 좌 해치(0~31, w=32) + 좌 라인(41~431, w=390) = 좌측 SVG 폭 432
  // 중앙 텍스트 약 54px (측정: 933~986)
  // 우 라인(0~390, w=390) + 우 해치(400~431, w=32) = 우측 SVG 폭 432
  return (
    <div
      className={`flex items-center ${className}`}
      aria-hidden="true"
    >
      {/* 좌측: 해치 + 라인 */}
      <svg width="432" height="10" viewBox="0 0 432 10" fill="none">
        <g stroke="#97A29E" strokeWidth="1">
          <line x1="0" y1="10" x2="7" y2="0" />
          <line x1="8" y1="10" x2="15" y2="0" />
          <line x1="16" y1="10" x2="23" y2="0" />
          <line x1="24" y1="10" x2="31" y2="0" />
        </g>
        <line x1="41" y1="5" x2="431" y2="5" stroke="#B1B9B6" strokeWidth="1" />
      </svg>

      {/* 중앙 텍스트 */}
      <span className="px-[8px] text-[13px] font-medium leading-[1] text-[#a4aeaa] whitespace-nowrap">
        {label}
      </span>

      {/* 우측: 라인 + 해치 */}
      <svg width="432" height="10" viewBox="0 0 432 10" fill="none">
        <line x1="0" y1="5" x2="390" y2="5" stroke="#B1B9B6" strokeWidth="1" />
        <g stroke="#97A29E" strokeWidth="1">
          <line x1="400" y1="10" x2="407" y2="0" />
          <line x1="408" y1="10" x2="415" y2="0" />
          <line x1="416" y1="10" x2="423" y2="0" />
          <line x1="424" y1="10" x2="431" y2="0" />
        </g>
      </svg>
    </div>
  );
}
