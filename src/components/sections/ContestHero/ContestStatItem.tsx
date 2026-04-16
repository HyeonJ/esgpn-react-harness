/**
 * Local stat item for Contest Hero.
 * Figma nodes: 299:4412 / 299:4416 / 299:4420 (width=240, gap=12, col center).
 * value typography: Pretendard Bold 48 or 40, lineHeight 1.3, tracking -4%.
 * caption typography: Pretendard Medium 16, lineHeight 1.5, tracking -1%.
 */
export type ContestStatItemProps = {
  value: string;
  caption: string;
  /** 48 default (numbers like 1,500+, 100%); 40 for text value "이론부터 실행". */
  valueSize?: 48 | 40;
};

export function ContestStatItem({
  value,
  caption,
  valueSize = 48,
}: ContestStatItemProps) {
  const valueTracking = valueSize === 48 ? "-1.92px" : "-1.6px";

  return (
    <div className="flex w-[240px] flex-col items-center gap-3 text-center text-gray-000">
      <strong
        className="font-bold"
        style={{
          fontSize: valueSize,
          lineHeight: 1.3,
          letterSpacing: valueTracking,
        }}
      >
        {value}
      </strong>
      <span
        style={{
          fontSize: "var(--text-base-16m-size)",
          fontWeight: "var(--text-base-16m-weight)" as unknown as number,
          lineHeight: "var(--text-base-16m-line-height)",
          letterSpacing: "var(--text-base-16m-letter-spacing)",
        }}
      >
        {caption}
      </span>
    </div>
  );
}
