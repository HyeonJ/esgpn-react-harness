import type { ReactNode } from "react";

type IntroBusinessRowProps = {
  title: string;
  lineSrc: string;
  body: ReactNode;
};

/**
 * A single business row: title + dotted line + body text.
 * Pure flex layout. Pill label is rendered by parent.
 */
export function IntroBusinessRow({
  title,
  lineSrc,
  body,
}: IntroBusinessRowProps) {
  return (
    <article className="flex gap-[var(--spacing-3)] items-start w-full">
      <h3 className="shrink-0 font-bold text-[24px] leading-[1.4] tracking-[-0.6px] text-[var(--color-gray-900)] whitespace-nowrap">
        {title}
      </h3>
      <div className="flex-1 h-[34px] min-w-px overflow-visible">
        <img alt="" className="block max-w-none size-full" src={lineSrc} />
      </div>
      <div className="shrink-0 flex items-start py-[6px]">
        <p className="font-normal text-[14px] leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-900)] w-[308px]">
          {body}
        </p>
      </div>
    </article>
  );
}
