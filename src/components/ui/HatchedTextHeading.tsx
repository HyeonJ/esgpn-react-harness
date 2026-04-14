import hatchedTicks from "@/assets/ui/hatched-ticks.svg";

/**
 * HatchedTextHeading — 인라인 텍스트 + flex-1 라인 + 우측 6 ticks 빗금.
 *
 * 공통 컴포넌트 (gallery-agreements 314:7091, gallery-activities 재사용 예정).
 * contest 전용 `HatchedSectionHeading` (icon+title col 구조)과 다른 패턴이라 별도 분리.
 *
 * 구조 (Figma 314:7091 기준):
 *   row gap=8 items-center w-full
 *     <p> Pretendard Medium 16, lh 1.5, ls -0.16px, color #000
 *     <div> flex-1 h-0 border-t 1.5px #97A29E
 *     <img> 36×8 hatched ticks SVG (5개 빗금)
 *
 * agnostic props: agreements "업무 협약" / activities "관련 활동 및 수상" 모두 처리.
 */
export interface HatchedTextHeadingProps {
  text: string;
  className?: string;
}

export function HatchedTextHeading({ text, className = "" }: HatchedTextHeadingProps) {
  return (
    <div className={`flex w-full items-center gap-[8px] ${className}`}>
      <p
        className="whitespace-nowrap font-medium text-black"
        style={{
          fontSize: "16px",
          lineHeight: 1.5,
          letterSpacing: "-0.16px",
        }}
      >
        {text}
      </p>
      <div className="h-0 flex-1 border-t-[1.5px] border-[#97A29E]" />
      <img
        src={hatchedTicks}
        alt=""
        aria-hidden
        className="block h-[8px] w-[36px] shrink-0"
      />
    </div>
  );
}
