export type ProgramTabId = 1 | 2 | 3;

export interface ProgramsTabsProps {
  active: ProgramTabId;
  onSelect: (id: ProgramTabId) => void;
}

const TABS: { id: ProgramTabId; label: string }[] = [
  { id: 1, label: "ESG마인드 자격검정" },
  { id: 2, label: "ESG 실천 아이디어 경진대회" },
  { id: 3, label: "사회공헌활동" },
];

/**
 * Programs 탭 바 (3개). Figma 노드 252:993.
 * - 간격 16px, 각 탭: flex-col gap 4 (dot 6px + label 16SB + 2px indicator bar)
 * - active: brand-500 (#4fb654), inactive: gray-400 (#afb8b5)
 * - dot은 CSS div 로 구현 (main-intro 인디케이터 패턴 재사용)
 */
export function ProgramsTabs({ active, onSelect }: ProgramsTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 px-4" role="tablist" aria-label="프로그램 선택 탭">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const color = isActive ? "var(--color-brand-500)" : "var(--color-gray-400)";
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(tab.id)}
            className="flex flex-col items-center justify-center gap-1 bg-transparent border-0 cursor-pointer p-0"
          >
            <div
              className="rounded-full shrink-0"
              style={{ width: 6, height: 6, backgroundColor: color }}
              aria-hidden="true"
            />
            <div className="flex flex-col items-start w-full">
              <span className="flex items-center justify-center px-2">
                <span
                  className="font-['Pretendard_Variable'] font-semibold whitespace-nowrap"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.5,
                    letterSpacing: "-0.16px",
                    color,
                  }}
                >
                  {tab.label}
                </span>
              </span>
              <div
                className="w-full shrink-0"
                style={{ height: 2, backgroundColor: color }}
                aria-hidden="true"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
