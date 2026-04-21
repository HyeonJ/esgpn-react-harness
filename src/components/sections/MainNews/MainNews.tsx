import { NewsHeading } from "./NewsHeading";
import { NewsList } from "./NewsList";
import bgPlantLeft from "@/assets/main-news/bg-plant-left.png";
import bgPlantRight from "@/assets/main-news/bg-plant-right.png";

/**
 * MainNews -- "ESGPN 뉴스룸" section on the landing page.
 *
 * v4 principles:
 * - Semantic HTML: <section>, <h2>, <article>, <h3>, <time>
 * - All text is HTML (zero raster text)
 * - Design tokens from tokens.css (gray-300/500/700/900, spacing)
 * - Flex layout for content, absolute only for decorative bg images
 * - NewsCard as local component (5x repeat)
 * - Background plant images: Framelink composites, no CSS re-application
 *   Negative-width Figma values converted to positive width + scaleX(-1) + left offset
 */
export function MainNews() {
  return (
    <section
      className="relative flex flex-col items-start justify-center w-full max-w-[1920px] h-[1040px] px-[252px] py-[120px] overflow-hidden mx-auto"
      data-node-id="43:315"
    >
      {/* Background layers (decorative, absolute) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Solid bg color */}
        <div className="absolute inset-0 bg-[#f3f3f3]" />

        {/* BG decoration 1: large plant/architecture image, center-left */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute max-w-none h-[70.16%] w-[51.57%] top-[47.91%] left-[-10.46%] -scale-x-100"
            src={bgPlantLeft}
          />
        </div>

        {/* BG decoration 2: right plant image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute max-w-none h-[59.16%] w-[42.53%] top-[61.94%] left-[80.16%]"
            src={bgPlantRight}
          />
        </div>

        {/* BG decoration 3: far-right plant (reuse same image, flipped) */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute max-w-none h-[41.19%] w-[29.61%] top-[83.85%] left-[67.72%] -scale-x-100"
            src={bgPlantRight}
          />
        </div>
      </div>

      {/* Main content: 2-column flex layout */}
      <div
        className="relative flex items-start justify-between w-full flex-1 min-h-0 overflow-clip"
        data-node-id="40:1420"
      >
        <NewsHeading />
        <NewsList />
      </div>
    </section>
  );
}
