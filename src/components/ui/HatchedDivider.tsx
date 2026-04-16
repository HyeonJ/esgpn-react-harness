/**
 * HatchedDivider — 좌/우 해치(//////) + 중앙 실선.
 *
 * About 페이지 섹션 경계 패턴 (Mission/Values/Vision에서 반복 등장).
 * 공통 승격 근거: about-mission 섹션 단독으로 2회 사용 + 후속 섹션 재사용 예상.
 *
 * 색상은 var(--color-gray-500) / var(--color-gray-400) 토큰 참조.
 * Figma 실측 대비: 해치 #97A29E(gray-500 일치), 실선 #B1B9B6(gray-400 #afb8b5 ≈ Δ2, 허용 범위).
 *
 * w-full + mx-auto로 부모가 배치 제어. 폭은 932px baseline 기준이나
 * max-w-[932px] 내에서 부모 컨테이너에 fit.
 */
export function HatchedDivider({ className = "" }: { className?: string }) {
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
