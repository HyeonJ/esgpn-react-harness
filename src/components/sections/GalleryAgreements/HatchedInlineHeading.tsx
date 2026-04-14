/**
 * HatchedInlineHeading — 좌측 텍스트 + 가운데 stretch 라인 + 우측 4개 해치.
 * Gallery 페이지의 섹션 헤딩 패턴 (314:7091 / activities도 동일).
 *
 * 기존 HatchedDivider/HatchedSectionHeading과 다른 변형:
 *  - HatchedSectionHeading: 아이콘+타이틀 위, 932×10 풀 디바이더 아래
 *  - HatchedInlineHeading (이것): 텍스트 좌, 라인 stretch, 우 hatch (single row)
 *
 * 두 번째 사용처(gallery-activities) 등장 시 ui/로 승격 검토.
 */
export interface HatchedInlineHeadingProps {
  title: string;
  /** 외부 wrapper width 조절용 */
  className?: string;
}

export function HatchedInlineHeading({ title, className = "" }: HatchedInlineHeadingProps) {
  return (
    <div className={`flex w-full items-center gap-[8px] ${className}`}>
      <p
        className="shrink-0 whitespace-nowrap font-medium text-black"
        style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: -0.16 }}
      >
        {title}
      </p>
      {/* 가운데 stretch 라인 */}
      <div className="h-0 flex-1 min-w-0 relative">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <svg className="block w-full" height="2" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" stroke="#B1B9B6" strokeWidth="1" />
          </svg>
        </div>
      </div>
      {/* 우측 4개 해치 (36×8) */}
      <svg width="36" height="8" viewBox="0 0 36 8" fill="none" aria-hidden="true">
        <g stroke="#97A29E" strokeWidth="1">
          <line x1="0" y1="8" x2="7" y2="0" />
          <line x1="9" y1="8" x2="16" y2="0" />
          <line x1="18" y1="8" x2="25" y2="0" />
          <line x1="27" y1="8" x2="34" y2="0" />
        </g>
      </svg>
    </div>
  );
}
