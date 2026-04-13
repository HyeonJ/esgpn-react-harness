import clsx from "clsx";

export interface HeroCTAProps {
  /** white = bg-white + dark text, green = brand-500 + white text */
  variant: "white" | "green";
  label: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Hero 섹션 전용 CTA pill 버튼 (페이지 로컬).
 * Figma: text-base/16SB (16px / 600 / lh1.5 / ls -1px), padding 16/32, radius full.
 * Rule of Three: 두 번째 사용 사례 등장 시 공통 컴포넌트로 추출.
 */
export function HeroCTA({ variant, label, href, onClick }: HeroCTAProps) {
  const className = clsx(
    "inline-flex items-center justify-center",
    "px-8 py-4 rounded-full",
    "font-['Pretendard_Variable']",
    "text-[16px] font-semibold leading-[1.5] tracking-[-1px]",
    "transition-opacity hover:opacity-90",
    "whitespace-nowrap",
    variant === "white" && "bg-white text-[var(--color-gray-900)]",
    variant === "green" && "bg-[var(--color-brand-500)] text-white",
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  );
}
