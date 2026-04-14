/**
 * BenefitCard — contest-benefits 섹션 로컬 카드 (304×203).
 * Figma 302:5089~302:6490 (6회 사용). 타 페이지 재등장 시 `src/components/ui/BenefitCard.tsx`로 승격.
 *
 * 레이아웃 (layout_1YD3UK):
 *   column, items-center, justify-center, gap 16, padding 16, w=304 hug-h
 *   bg #EFF0F0, rounded 20
 *
 * 내부 텍스트 블록 (layout_BGOLAZ): column gap 8 fill
 *   제목  Pretendard 600 18 / 1.4em / -1.5% (=-0.27px) / #0A0A0A CENTER
 *   설명  Pretendard 500 14 / 1.5em / -0.5% (=-0.07px) / #4A5565 CENTER (2줄, U+2028 → <br/>)
 */
export interface BenefitCardProps {
  icon: string;
  iconAlt?: string;
  title: string;
  /** 두 줄 설명 (Figma \L = U+2028 기준 분리된 튜플) */
  lines: readonly [string, string];
}

export function BenefitCard({ icon, iconAlt = "", title, lines }: BenefitCardProps) {
  return (
    <div className="flex w-[304px] flex-col items-center justify-center gap-4 rounded-[20px] bg-[#EFF0F0] p-4">
      <img
        src={icon}
        alt={iconAlt}
        aria-hidden={iconAlt === "" ? true : undefined}
        className="block size-[80px] shrink-0"
      />
      <div className="flex w-full flex-col items-stretch gap-2">
        <h3
          className="text-center font-semibold text-[#0A0A0A]"
          style={{
            fontSize: "18px",
            lineHeight: 1.4,
            letterSpacing: "-0.27px",
          }}
        >
          {title}
        </h3>
        <p
          className="text-center font-medium text-[#4A5565]"
          style={{
            fontSize: "14px",
            lineHeight: 1.5,
            letterSpacing: "-0.07px",
          }}
        >
          {lines[0]}
          <br />
          {lines[1]}
        </p>
      </div>
    </div>
  );
}
