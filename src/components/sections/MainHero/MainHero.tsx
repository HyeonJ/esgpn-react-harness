import { HeroIntroCard } from "./HeroIntroCard";
import { HeroCTA } from "./HeroCTA";

import bgImage from "@/assets/main-hero/bg.png";
import card1Icon from "@/assets/main-hero/card1-icon.png";
import card2Icon from "@/assets/main-hero/card2-icon.png";
import card3Icon from "@/assets/main-hero/card3-icon.png";

const CARDS = [
  {
    rotationDeg: -4,
    iconSrc: card1Icon,
    iconAlt: "ESG 마인드 자격검정 아이콘",
    blendMode: "lighten" as const,
    title: "ESG마인드 자격검정",
    body: [
      "기본 개념부터 실무 적용까지,",
      "체계적인 교육으로 차세대 리더의",
      "ESG 실천 역량을 인증합니다.",
    ],
  },
  {
    rotationDeg: 0,
    iconSrc: card2Icon,
    iconAlt: "ESG 실천 아이디어 경진대회 아이콘",
    blendMode: "lighten" as const,
    title: "ESG실천 아이디어 경진대회",
    body: [
      "청년과 지역사회의 협력으로 현장 문제를",
      "해결하며, 지속가능한 변화를 만드는",
      "실질적인 ESG 성과를 도출합니다.",
    ],
  },
  {
    rotationDeg: 4,
    iconSrc: card3Icon,
    iconAlt: "사회공헌 및 재능나눔 아이콘",
    blendMode: "screen" as const,
    title: "사회공헌 및 재능나눔",
    body: [
      "산업체·지자체 파트너십을 통해 ESG 가치를",
      "지역 일자리와 서비스로 연결하며",
      "상생의 가치를 창출합니다.",
    ],
  },
];

/**
 * MainHero -- Landing page hero section.
 *
 * v4 principles:
 * - Semantic HTML: <section>, <h1>, <article>, <button>
 * - Text as HTML (not raster) for SEO/a11y/i18n
 * - Design tokens from tokens.css
 * - Flex layout, minimal absolute (BG image only)
 * - Card icons are raster with blend modes (black-bg PNGs)
 */
export function MainHero() {
  return (
    <section
      className="relative w-full h-[1040px] bg-[#f3f3f3] overflow-hidden"
    >
      {/* BG layer: city+tree panorama */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.96] overflow-hidden pointer-events-none">
        <img
          src={bgImage}
          alt=""
          className="absolute left-[15.9%] top-[29.76%] w-[68.19%] h-[94.87%] max-w-none"
        />
      </div>

      {/* Content layer */}
      <div className="relative flex flex-col gap-[86px] items-start pt-[160px] pb-[110px] px-[409px]">
        {/* Text block */}
        <div className="flex flex-col gap-[var(--spacing-8)] items-start w-full">
          {/* Heading group */}
          <div className="relative flex flex-col gap-[var(--spacing-1)] items-center w-full">
            {/* White patch behind wordmark */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 top-px w-[286px] h-[27px] bg-white"
            />
            <p className="text-[length:var(--text-xl-20sb-size)] font-semibold leading-[1.4] tracking-[-0.4px] text-[var(--color-gray-900)] text-center whitespace-nowrap">
              세상을 아름답게 만드는 힘, ESGPN
            </p>
            <h1 className="text-[100px] leading-none text-[var(--color-brand-700)] text-center whitespace-nowrap" style={{ fontFamily: "var(--font-family-yeseva)" }}>
              Environmental
            </h1>
          </div>

          {/* Body text */}
          <div className="w-full text-center text-[length:var(--text-lg-18r-size)] font-normal leading-[1.5] tracking-[-0.27px] text-[var(--color-gray-900)]">
            <p>대학·기업·지역사회가 함께 지속가능한 미래를 행동으로 구현하는 연대 플랫폼</p>
            <p>알고 있는 사람이 아닌, 실천할 수 있는 ESG 인재를 인증합니다.</p>
          </div>
        </div>

        {/* Cards + CTA group */}
        <div className="flex flex-col gap-[var(--spacing-12)] items-center w-full">
          {/* 3 Cards */}
          <div className="flex gap-[var(--spacing-12)] items-start justify-center">
            {CARDS.map((card) => (
              <HeroIntroCard key={card.title} {...card} />
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-[var(--spacing-3)] items-center">
            <HeroCTA
              variant="white"
              label="ESG 실천 아이디어 경진대회 참여하기"
              href="/contest"
            />
            <HeroCTA
              variant="green"
              label="ESG 마인드 자격검정 신청하기"
              href="/certification"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
