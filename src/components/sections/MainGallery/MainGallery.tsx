import { GalleryBackground } from "./GalleryBackground";
import { GalleryHeading } from "./GalleryHeading";
import { DividerLabel } from "./DividerLabel";
import { GalleryCard } from "./GalleryCard";
import { ViewAllButton } from "./ViewAllButton";
import { partnershipCards, awardCard } from "./data";
import dividerPartnership from "@/assets/main-gallery/divider-partnership.svg";
import dividerAward from "@/assets/main-gallery/divider-award.svg";

/**
 * 메인페이지 Gallery 섹션 (Figma 43:545 "Frame 2043685961", 1920×1888).
 *
 * BG: `#0c3b0e` + cityscape(mix-blend-luminosity) + overlay(mix-blend-multiply).
 * 섹션은 flex-col gap-[48px] pt-[120px] pb-[200px] px-[252px], 자식 3블록:
 *   1) 43:546 heading (eyebrow + main + sub)
 *   2) 43:1851 업무협약 블록 (divider + 3 cards + CTA)
 *   3) 43:1880 관련 활동 및 수상 블록 (divider + 1 card 456px center + CTA)
 *
 * 카드 `whitespace-pre`는 descriptions 들여쓰기 4칸 공백 보존 필수.
 * Award 카드는 2겹 이미지(백플레이트 card2 + overlay award-thumb).
 */
interface MainGalleryProps {
  className?: string;
}

export function MainGallery({ className }: MainGalleryProps) {
  const base =
    "relative w-full h-[1888px] flex flex-col gap-[48px] items-start pt-[120px] pb-[200px] px-[252px] overflow-hidden";
  return (
    <section
      className={className ? `${base} ${className}` : base}
      aria-label="ESGPN 아카이브"
      data-node-id="43:545"
    >
      <GalleryBackground />
      <GalleryHeading />

      {/* 업무 협약 블록 */}
      <div
        className="flex flex-col gap-[24px] items-center justify-center pb-[40px] relative shrink-0 w-full"
        data-node-id="43:1851"
      >
        <DividerLabel
          nodeId="43:1818"
          leftLineNodeId="43:1820"
          rightLineNodeId="43:1815"
          labelNodeId="43:1813"
          label="업무 협약"
          svgSrc={dividerPartnership}
        />
        <div
          className="flex gap-[24px] items-start relative shrink-0 w-full"
          data-node-id="43:1844"
        >
          {partnershipCards.map((card) => (
            <GalleryCard
              key={card.nodeId}
              nodeId={card.nodeId}
              thumbNodeId={card.thumbNodeId}
              titleNodeId={card.titleNodeId}
              descNodeId={card.descNodeId}
              thumbSrc={card.thumbSrc}
              thumbInner={card.thumbInner}
              title={card.title}
              desc={card.desc}
            />
          ))}
        </div>
        <ViewAllButton
          nodeId="43:1854"
          labelNodeId="43:1855"
          arrowNodeId="43:1857"
          iconNodeId="I43:1857;11:10988"
        />
      </div>

      {/* 관련 활동 및 수상 블록 */}
      <div
        className="flex flex-col gap-[24px] items-center justify-center pb-[40px] relative shrink-0 w-full"
        data-node-id="43:1880"
      >
        <DividerLabel
          nodeId="43:1881"
          leftLineNodeId="43:1882"
          rightLineNodeId="43:1884"
          labelNodeId="43:1883"
          label="관련 활동 및 수상"
          svgSrc={dividerAward}
        />
        <div
          className="flex items-center justify-center relative shrink-0 w-full"
          data-node-id="43:1885"
        >
          <GalleryCard
            variant="award"
            widthClass="w-[456px]"
            nodeId={awardCard.nodeId}
            thumbNodeId={awardCard.thumbNodeId}
            titleNodeId={awardCard.titleNodeId}
            descNodeId={awardCard.descNodeId}
            thumbSrc={awardCard.backingSrc}
            thumbInner={awardCard.backingInner}
            awardOverlaySrc={awardCard.overlaySrc}
            title={awardCard.title}
            desc={awardCard.desc}
          />
        </div>
        <ViewAllButton
          nodeId="43:1901"
          labelNodeId="43:1902"
          arrowNodeId="43:1903"
          iconNodeId="I43:1903;11:10988"
        />
      </div>
    </section>
  );
}
