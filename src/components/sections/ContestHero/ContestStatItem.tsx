/**
 * ContestStatItem — 경진대회 Hero 하단 Stats 3개 공용 아이템.
 * 노드: 299:4412 / 299:4416 / 299:4420 (240×hug, col gap 12, center)
 * value: 48 Bold 또는 40 Bold (중간 "이론부터 실행"만 40)
 * caption: Pretendard 16 Medium, lineHeight 1.5, tracking -0.16, white
 */
export type ContestStatItemProps = {
  value: string;
  caption: string;
  valueSize?: 48 | 40;
};

export function ContestStatItem({ value, caption, valueSize = 48 }: ContestStatItemProps) {
  // letterSpacing: size × -4% — 48→-1.92px, 40→-1.6px
  const valueLetterSpacing = valueSize === 48 ? "-1.92px" : "-1.6px";
  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ width: 240, gap: 12 }}
    >
      <p
        className="font-['Pretendard_Variable'] font-bold text-white"
        style={{
          fontSize: valueSize,
          lineHeight: 1.3,
          letterSpacing: valueLetterSpacing,
          margin: 0,
        }}
      >
        {value}
      </p>
      <p
        className="font-['Pretendard_Variable'] font-medium text-white"
        style={{
          fontSize: 16,
          lineHeight: 1.5,
          letterSpacing: "-0.16px",
          margin: 0,
        }}
      >
        {caption}
      </p>
    </div>
  );
}
