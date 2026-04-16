import arrowIcon from "@/assets/main-gallery/arrow-icon.svg";

interface ViewAllButtonProps {
  /** Figma data-node-id */
  nodeId: string;
  /** Optional link href */
  href?: string;
}

/**
 * "View All" pill CTA button.
 * Rounded-full pill with semi-transparent white bg (rgba(255,255,255,0.14)).
 * Contains "전체보기" text + right-pointing arrow chevron.
 */
export function ViewAllButton({ nodeId, href }: ViewAllButtonProps) {
  const Tag = href ? "a" : "button";

  return (
    <Tag
      className="inline-flex items-center justify-center gap-[2px] rounded-[var(--radius-full)] bg-[var(--color-white-opacity-300)] py-[var(--spacing-3)] pl-[var(--spacing-6)] pr-[var(--spacing-4)]"
      data-node-id={nodeId}
      {...(href ? { href } : { type: "button" as const })}
    >
      <span className="text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-[var(--color-gray-000)]">
        전체보기
      </span>
      <span className="flex items-center justify-center w-[23px] h-[24px]">
        <img alt="" src={arrowIcon} className="w-[6px] h-[11px]" />
      </span>
    </Tag>
  );
}
