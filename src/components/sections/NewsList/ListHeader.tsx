import hatchBar from "@/assets/news-featured/hatch-bar.svg";
import dividerLine from "@/assets/news-featured/divider-line.svg";

interface ListHeaderProps {
  total: number;
}

/**
 * NewsList 상단 헤더 (Figma 129:2611) — "총 N개" + 실선 + 우 해치.
 *
 * HatchedBar(news-featured)와 구조 달라 (좌 해치 없음) 재사용 불가.
 * - 좌: "총 N개" 텍스트 (16M, -0.16px)
 * - 중앙: 실선 flex-1 (h=1.5px, divider-line.svg)
 * - 우: 해치바 36×8 (hatch-bar.svg)
 */
export function ListHeader({ total }: ListHeaderProps) {
  return (
    <div
      className="flex w-full items-center gap-2"
      data-node-id="129:2611"
    >
      <p
        className="shrink-0 whitespace-nowrap text-gray-900"
        style={{
          fontFamily: "var(--font-family-pretendard)",
          fontSize: "var(--text-base-16m-size)",
          fontWeight: "var(--text-base-16m-weight)",
          lineHeight: "var(--text-base-16m-line-height)",
          letterSpacing: "-0.16px",
        }}
      >
        총 {total}개
      </p>
      <img
        src={dividerLine}
        alt=""
        aria-hidden="true"
        className="h-[1.5px] min-w-0 flex-1"
      />
      <img
        src={hatchBar}
        alt=""
        aria-hidden="true"
        className="h-2 w-9 shrink-0"
      />
    </div>
  );
}
