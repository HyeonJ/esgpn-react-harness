/**
 * HatchedInlineDecor — 헤딩 텍스트 옆 가로 실선 + 우측 6개 대각 tick.
 *
 * Figma 314:7093 (Vector 8, 825w 실선) + 314:7094 (6 ticks 6×8 each, 6px 간격).
 * 색: `--color-gray-500` (#97A29E).
 * flex-1로 부모 flex 안에서 헤딩 텍스트 오른쪽을 꽉 채우며 늘어난다.
 *
 * gallery-agreements 로컬 컴포넌트 — gallery-activities 작성 시 폭 prop화 + 승격 검토.
 */
export function HatchedInlineDecor() {
  return (
    <div
      className="flex flex-1 items-center gap-[8px]"
      aria-hidden="true"
      data-node-id="314:7094"
    >
      <div
        className="h-px flex-1 bg-[var(--color-gray-500)]"
        data-node-id="314:7093"
      />
      <svg
        width="36"
        height="8"
        viewBox="0 0 36 8"
        fill="none"
        className="block shrink-0"
      >
        <g
          stroke="var(--color-gray-500)"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {/* 6 ticks — 대각선 6×8, 6px 간격 */}
          <line x1="0" y1="8" x2="6" y2="0" />
          <line x1="6" y1="8" x2="12" y2="0" />
          <line x1="12" y1="8" x2="18" y2="0" />
          <line x1="18" y1="8" x2="24" y2="0" />
          <line x1="24" y1="8" x2="30" y2="0" />
          <line x1="30" y1="8" x2="36" y2="0" />
        </g>
      </svg>
    </div>
  );
}
