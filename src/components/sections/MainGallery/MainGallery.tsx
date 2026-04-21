import { GalleryBackground } from "./GalleryBackground";
import { GalleryHeading } from "./GalleryHeading";
import { DividerLabel } from "./DividerLabel";
import { GalleryCard } from "./GalleryCard";
import { ViewAllButton } from "./ViewAllButton";
import { partnershipCards, awardCard } from "./data";
import dividerPartnership from "@/assets/main-gallery/divider-partnership.svg";
import dividerAward from "@/assets/main-gallery/divider-award.svg";

/**
 * MainGallery -- "ESGPN 아카이브" section on the landing page.
 *
 * v4 principles:
 * - Semantic HTML: <section>, <h2>, <article>, <figure>
 * - All text is HTML (zero raster text)
 * - Design tokens from tokens.css (brand-700, gray-000/300, spacing)
 * - Flex/grid layout for content; absolute only for decorative BG layers
 * - GalleryCard as local component (4x total)
 * - Background: 3-layer composite (green base + cityscape luminosity + paper multiply)
 *
 * v1-v3 anti-pattern: magic 77, abs 16, token 0 -- worst "chronic inflammation" section.
 * v4 fix: flex/grid for all content, absolute only for BG layers.
 */
export function MainGallery() {
  return (
    <section
      className="relative flex flex-col items-stretch gap-[var(--spacing-12)] w-full max-w-[1920px] pt-[120px] pb-[200px] px-[252px] mx-auto"
      data-node-id="43:545"
    >
      <GalleryBackground />

      {/* Content layer (above BG) */}
      <div className="relative z-10 flex flex-col items-stretch gap-[var(--spacing-12)]">
        <GalleryHeading />

        {/* Partnership block */}
        <div
          className="flex flex-col items-center justify-center gap-[var(--spacing-6)] pb-[var(--spacing-10)]"
          data-node-id="43:1851"
        >
          <DividerLabel
            label="업무 협약"
            svgSrc={dividerPartnership}
            nodeId="43:1818"
          />

          {/* 3-column card row */}
          <div
            className="flex items-start self-stretch gap-[var(--spacing-6)]"
            data-node-id="43:1844"
          >
            {partnershipCards.map((card) => (
              <GalleryCard key={card.nodeId} {...card} widthClass="flex-1" />
            ))}
          </div>

          <ViewAllButton nodeId="43:1854" />
        </div>

        {/* Award block */}
        <div
          className="flex flex-col items-center justify-center gap-[var(--spacing-6)] pb-[var(--spacing-10)]"
          data-node-id="43:1880"
        >
          <DividerLabel
            label="관련 활동 및 수상"
            svgSrc={dividerAward}
            nodeId="43:1881"
          />

          {/* Single centered card */}
          <div
            className="flex justify-center items-center self-stretch"
            data-node-id="43:1885"
          >
            <GalleryCard {...awardCard} widthClass="w-[456px]" />
          </div>

          <ViewAllButton nodeId="43:1901" />
        </div>
      </div>
    </section>
  );
}
