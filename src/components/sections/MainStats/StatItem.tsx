import type { ReactNode } from "react";

/**
 * StatItem — main-stats 로컬 컴포넌트.
 * Rule of Three의 "세 번째 시점 공통화" 원칙에 따라, 경진대회·자격검정 페이지
 * 실제 Figma 스펙 확인 전까지는 `src/components/ui/` 로 승격하지 않는다.
 *
 * Figma 패턴 (29:381, 29:380, 29:379):
 *   p.text-[0px].tracking-[-0.96px] 부모에 span 2개:
 *     - 숫자 span: text-[48px] font-bold tracking-[-1.92px]
 *     - 단위 span: text-[14px] font-normal tracking-[-0.07px]
 *   → baseline inline 정렬 (48B 숫자와 14R 단위가 같은 줄)
 * stat 4 (29:378, "2028")만 단위 없음 → 단순 p.text-[48px].
 */
export type StatItemProps = {
  value: string;
  unit?: string;
  caption: ReactNode;
  width?: number;
};

export function StatItem({ value, unit, caption, width = 94 }: StatItemProps) {
  return (
    <div
      className="flex flex-col items-start justify-center"
      style={{ width, gap: 8 }}
    >
      {unit ? (
        <p
          className="font-['Pretendard_Variable'] font-bold whitespace-nowrap"
          style={{
            fontSize: 0,
            lineHeight: 0,
            letterSpacing: "-0.96px",
            color: "var(--color-gray-900)",
          }}
        >
          <span
            style={{
              fontSize: 48,
              lineHeight: 1.3,
              letterSpacing: "-1.92px",
            }}
          >
            {value}
          </span>
          <span
            className="font-normal"
            style={{
              fontSize: 14,
              lineHeight: 1.5,
              letterSpacing: "-0.07px",
            }}
          >
            {unit}
          </span>
        </p>
      ) : (
        <p
          className="font-['Pretendard_Variable'] font-bold whitespace-nowrap"
          style={{
            fontSize: 48,
            lineHeight: 1.3,
            letterSpacing: "-1.92px",
            color: "var(--color-gray-900)",
          }}
        >
          {value}
        </p>
      )}
      <p
        className="font-['Pretendard_Variable'] font-normal"
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          letterSpacing: "-0.07px",
          color: "var(--color-gray-500)",
          minWidth: "100%",
        }}
      >
        {caption}
      </p>
    </div>
  );
}

export default StatItem;
