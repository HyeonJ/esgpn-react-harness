import type { ReactNode } from "react";

type StatItemProps = {
  value: string;
  unit?: string;
  caption: ReactNode;
};

/**
 * A single stat metric: large number (+ optional unit) above a caption.
 *
 * Figma pattern: parent <p> at text-[0px] with inline <span> children
 * for the 48B number and 14R unit so they share a baseline.
 * The 2028 variant has no unit, so it skips the wrapper trick.
 */
export function StatItem({ value, unit, caption }: StatItemProps) {
  return (
    <div className="flex flex-col gap-[var(--spacing-2)] items-start justify-center">
      {unit ? (
        <p className="font-bold leading-[0] text-[0px] text-[var(--color-gray-900)] tracking-[-0.96px] whitespace-nowrap">
          <span className="leading-[1.3] text-[length:var(--text-display-01-size)] tracking-[-1.92px]">
            {value}
          </span>
          <span className="font-normal leading-[1.5] text-[14px] tracking-[-0.07px]">
            {unit}
          </span>
        </p>
      ) : (
        <p className="font-bold leading-[1.3] text-[length:var(--text-display-01-size)] text-[var(--color-gray-900)] tracking-[-1.92px] whitespace-nowrap">
          {value}
        </p>
      )}
      <p className="font-normal leading-[1.5] text-[14px] text-[var(--color-gray-500)] tracking-[-0.07px]">
        {caption}
      </p>
    </div>
  );
}
