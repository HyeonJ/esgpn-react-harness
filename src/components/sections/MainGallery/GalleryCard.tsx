import type { GalleryCardData } from "./data";

interface GalleryCardProps extends GalleryCardData {
  /** Additional class for width control (e.g., "w-[456px]" for award) */
  widthClass?: string;
}

/**
 * Gallery card: thumbnail (h-302, rounded-24) + title + desc below.
 * Used for both partnership (3-column, flex-1) and award (456px centered) variants.
 *
 * Award variant has dual-image thumbnail:
 *   bottom layer = card2-thumb (backing)
 *   top layer = award-thumb (main, object-cover)
 */
export function GalleryCard({
  nodeId,
  thumbSrc,
  title,
  desc,
  awardBacking,
  widthClass,
}: GalleryCardProps) {
  return (
    <article
      className={`flex flex-col items-stretch gap-[var(--spacing-6)] ${widthClass ?? ""}`}
      data-node-id={nodeId}
    >
      {/* Thumbnail container */}
      <figure className="relative h-[302px] rounded-[24px] overflow-hidden">
        {awardBacking && (
          <img
            alt=""
            src={awardBacking.src}
            className="absolute inset-0 object-cover size-full"
          />
        )}
        <img
          alt=""
          src={thumbSrc}
          className="absolute inset-0 object-cover size-full"
        />
      </figure>

      {/* Text block */}
      <div className="flex flex-col items-center gap-[var(--spacing-4)]">
        <h3
          className="text-[24px] font-semibold leading-[1.4] text-[var(--color-gray-000)] text-center whitespace-pre-line"
        >
          {title}
        </h3>
        <p
          className="text-[14px] font-normal leading-[1.5] tracking-[0.28px] text-[var(--color-gray-000)] text-center whitespace-pre-line"
        >
          {desc}
        </p>
      </div>
    </article>
  );
}
