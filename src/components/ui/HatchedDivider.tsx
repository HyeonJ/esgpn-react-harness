/**
 * HatchedDivider — 좌/우 해치(//////) + 중앙 실선 (+ optional 중앙 라벨).
 *
 * About 페이지 섹션 경계 패턴 (Mission/Values/Vision/Organization).
 * v4 확장: `label` prop으로 중앙에 한글 라벨 (예: "운영주체") 배치 가능.
 *   - label 미제공 시 기존 단일 SVG(932×10) 유지 — 기존 사용처 backward-compatible.
 *   - label 제공 시 wrapper flex row + 좌우 SVG 분할 + HTML `<span>` 텍스트.
 *
 * 색상은 var(--color-gray-500) / var(--color-gray-400) 토큰 참조.
 * Figma 실측 대비: 해치 #97A29E(gray-500 일치), 실선 #B1B9B6(gray-400 #afb8b5 ≈ Δ2, 허용 범위).
 */
export function HatchedDivider({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  if (label) {
    // 확장 모드: 좌 (hatched + short solid) + label text + 우 (short solid + hatched)
    // baseline 측정: 좌 line x=535~925 (width 391) / 우 line x=994~1384 (width 391)
    // label 폭 약 54px, 좌우 gap ≈ 8px씩
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        role="presentation"
      >
        {/* 좌측: hatched + solid line */}
        <svg
          width="434"
          height="10"
          viewBox="0 0 434 10"
          fill="none"
          aria-hidden="true"
        >
          <g stroke="var(--color-gray-500)" strokeWidth="1">
            <line x1="0" y1="10" x2="7" y2="0" />
            <line x1="8" y1="10" x2="15" y2="0" />
            <line x1="16" y1="10" x2="23" y2="0" />
            <line x1="24" y1="10" x2="31" y2="0" />
          </g>
          <line
            x1="44"
            y1="5"
            x2="434"
            y2="5"
            stroke="var(--color-gray-400)"
            strokeWidth="1"
          />
        </svg>

        {/* 중앙 라벨 */}
        <span
          className="px-[8px] text-[12px] font-medium leading-none text-[var(--color-gray-500)]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          {label}
        </span>

        {/* 우측: solid line + hatched */}
        <svg
          width="434"
          height="10"
          viewBox="0 0 434 10"
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="5"
            x2="390"
            y2="5"
            stroke="var(--color-gray-400)"
            strokeWidth="1"
          />
          <g stroke="var(--color-gray-500)" strokeWidth="1">
            <line x1="402" y1="10" x2="409" y2="0" />
            <line x1="410" y1="10" x2="417" y2="0" />
            <line x1="418" y1="10" x2="425" y2="0" />
            <line x1="426" y1="10" x2="433" y2="0" />
          </g>
        </svg>
      </div>
    );
  }

  // 기본 모드 (기존 사용처 backward-compatible)
  return (
    <div className={`flex justify-center w-full ${className}`}>
      <svg
        width="932"
        height="10"
        viewBox="0 0 932 10"
        fill="none"
        aria-hidden="true"
      >
        {/* 좌측 해치 (4개 slash) */}
        <g stroke="var(--color-gray-500)" strokeWidth="1">
          <line x1="0" y1="10" x2="7" y2="0" />
          <line x1="8" y1="10" x2="15" y2="0" />
          <line x1="16" y1="10" x2="23" y2="0" />
          <line x1="24" y1="10" x2="31" y2="0" />
        </g>
        {/* 중앙 실선 */}
        <line
          x1="41"
          y1="5"
          x2="889"
          y2="5"
          stroke="var(--color-gray-400)"
          strokeWidth="1"
        />
        {/* 우측 해치 */}
        <g stroke="var(--color-gray-500)" strokeWidth="1">
          <line x1="900" y1="10" x2="907" y2="0" />
          <line x1="908" y1="10" x2="915" y2="0" />
          <line x1="916" y1="10" x2="923" y2="0" />
          <line x1="924" y1="10" x2="931" y2="0" />
        </g>
      </svg>
    </div>
  );
}
