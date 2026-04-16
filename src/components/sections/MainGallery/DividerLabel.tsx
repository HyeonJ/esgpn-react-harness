interface DividerLabelProps {
  /** Label text displayed between divider lines */
  label: string;
  /** SVG src for the divider line */
  svgSrc: string;
  /** Figma data-node-id for the row container */
  nodeId: string;
}

/**
 * Horizontal divider with centered label text.
 * Structure: [--- line ---] label [--- line ---]
 * Line: SVG with white/0.28 stroke, flex-1 to fill available space.
 * Label: 20px SemiBold #caeb69 (lime green).
 */
export function DividerLabel({ label, svgSrc, nodeId }: DividerLabelProps) {
  return (
    <div
      className="flex items-center self-stretch gap-[var(--spacing-4)]"
      data-node-id={nodeId}
    >
      <img
        alt=""
        src={svgSrc}
        className="flex-1 h-[2px]"
      />
      <span className="text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-[#caeb69] whitespace-nowrap">
        {label}
      </span>
      <img
        alt=""
        src={svgSrc}
        className="flex-1 h-[2px]"
      />
    </div>
  );
}
