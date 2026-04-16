import hatchBar from "@/assets/news-featured/hatch-bar.svg";
import dividerLine from "@/assets/news-featured/divider-line.svg";

/**
 * 뉴스 Featured 상단 해치 구분선 (Figma 129:2561).
 * 구조: 좌 해치(36×8) + 중앙 실선(flex-1, h=1.5px) + 우 해치(36×8).
 *
 * 기존 `HatchedDivider`(About)는 viewBox 10 dash-dot 형태라 시각적으로 다름.
 * Rule of Three 미충족(2번째 패턴) → 로컬 유지.
 */
export function HatchedBar() {
  return (
    <div
      aria-hidden="true"
      className="flex h-2 w-full items-center gap-2"
      data-node-id="129:2561"
    >
      <img
        src={hatchBar}
        alt=""
        aria-hidden="true"
        className="h-2 w-9 shrink-0"
      />
      <img
        src={dividerLine}
        alt=""
        aria-hidden="true"
        className="h-[1.5px] w-full flex-1"
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
