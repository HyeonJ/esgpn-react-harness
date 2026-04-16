type HeroCTAProps = {
  variant: "white" | "green";
  label: string;
  href?: string;
};

/**
 * HeroCTA -- pill-shaped CTA button for the hero section.
 * v4: semantic <a> or <button>, design tokens for colors/spacing/radius.
 */
export function HeroCTA({ variant, label, href }: HeroCTAProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-[var(--spacing-8)] py-[var(--spacing-4)] rounded-[var(--radius-full)] text-[length:var(--text-base-16sb-size)] font-semibold leading-[1.5] tracking-[-0.16px] whitespace-nowrap overflow-clip";

  const variantClasses =
    variant === "white"
      ? "bg-[var(--color-gray-000)] text-[var(--color-gray-900)]"
      : "bg-[var(--color-brand-500)] text-white";

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses}`}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={`${baseClasses} ${variantClasses}`}>
      {label}
    </button>
  );
}
