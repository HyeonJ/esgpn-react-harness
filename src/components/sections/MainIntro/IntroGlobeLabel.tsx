import type { ReactNode } from "react";

import arrowIcon from "@/assets/main-intro/arrow-right-green.svg";

type IntroGlobeLabelProps = {
  title: string;
  body: ReactNode;
};

/**
 * A single label around the globe: title with arrow icon + description.
 * Right-aligned text, flex column layout.
 */
export function IntroGlobeLabel({ title, body }: IntroGlobeLabelProps) {
  return (
    <div className="flex flex-col gap-[var(--spacing-2)] items-end justify-center w-[181.85px]">
      <div className="flex gap-[var(--spacing-1)] items-center">
        <span className="font-bold text-[20px] leading-[1.4] tracking-[-0.4px] text-[var(--color-gray-900)] whitespace-nowrap">
          {title}
        </span>
        <div className="flex items-center justify-center size-[24px]">
          <img
            alt=""
            src={arrowIcon}
            className="w-[16px] h-[20.88px]"
          />
        </div>
      </div>
      <p className="font-normal text-[14px] leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-500)] text-right whitespace-nowrap">
        {body}
      </p>
    </div>
  );
}
