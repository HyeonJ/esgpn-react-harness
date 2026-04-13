import { HeroIntroCard, type HeroIntroCardProps } from "./HeroIntroCard";
import { HeroCTA } from "./HeroCTA";
import bgImg from "@/assets/main-hero/bg.png";
import card1Image from "@/assets/main-hero/card1.png";
import card2Image from "@/assets/main-hero/card2.png";
import card3Image from "@/assets/main-hero/card3.png";

/**
 * 메인페이지 Hero 섹션.
 * Figma 노드: 43:1730 (Frame 2043685963), 1920×1040, 풀폭.
 *
 * 회차 5 접근 전환: 카드 3개는 Figma 부모 노드를 raster export한 PNG로 렌더
 * (HeroIntroCard 내부 DOM 합성 제거). G1 sub-pixel/glyph/blur divergence 제거 목적.
 */
const CARDS: HeroIntroCardProps[] = [
  {
    rotationDeg: -4,
    cardImage: card1Image,
    alt: "ESG마인드 자격검정 - 기본 개념부터 실무 적용까지 체계적인 교육으로 차세대 리더의 ESG 실천 역량을 인증합니다",
  },
  {
    rotationDeg: 0,
    cardImage: card2Image,
    alt: "ESG실천 아이디어 경진대회 - 청년과 지역사회의 협력으로 현장 문제를 해결하며 지속가능한 변화를 만드는 실질적인 ESG 성과를 도출합니다",
  },
  {
    rotationDeg: 4,
    cardImage: card3Image,
    alt: "사회공헌 및 재능나눔 - 산업체·지자체 파트너십을 통해 ESG 가치를 지역 일자리와 서비스로 연결하며 상생의 가치를 창출합니다",
  },
];

export function MainHero() {
  return (
    <section
      className="relative w-[1920px] h-[1040px] overflow-hidden mx-auto"
      style={{ backgroundColor: "#f3f3f3" }}
      aria-label="ESGPN 소개 히어로"
    >
      {/* BG 합성 이미지 — left 15.9% top 29.76% w 68.19% h 94.87%, opacity 96% */}
      <img
        src={bgImg}
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          left: "15.9%",
          top: "29.76%",
          width: "68.19%",
          height: "94.87%",
          opacity: 0.96,
          objectFit: "fill",
        }}
      />

      {/* Inner 컨테이너: w 1102, padding 160/409/110 */}
      <div className="absolute inset-0 flex flex-col items-center pt-[160px] pb-[110px] px-[409px] z-10">
        <div className="flex flex-col items-stretch gap-[86px] w-[1102px]">
          {/* Heading + Body */}
          <div className="flex flex-col gap-8 w-full">
            {/* Heading group */}
            <div className="flex flex-col items-center gap-1 relative">
              {/* 흰색 띠 (워드마크 위 패치, 286×27, x=408 y=1) */}
              <div
                className="absolute bg-white"
                style={{ left: "408px", top: "1px", width: "286px", height: "27px" }}
                aria-hidden="true"
              />
              <p
                className="font-['Pretendard_Variable'] font-semibold relative"
                style={{
                  fontSize: "20px",
                  lineHeight: 1.4,
                  letterSpacing: "-2px",
                  color: "var(--color-gray-900)",
                }}
              >
                세상을 아름답게 만드는 힘, ESGPN
              </p>
              <h1
                className="relative"
                style={{
                  fontFamily: "var(--font-family-yeseva)",
                  fontWeight: 400,
                  fontSize: "100px",
                  lineHeight: "1em",
                  letterSpacing: "0px",
                  color: "var(--color-brand-700)",
                }}
              >
                Environmental
              </h1>
            </div>

            {/* Body 2줄 */}
            <p
              className="font-['Pretendard_Variable'] font-normal text-center"
              style={{
                fontSize: "18px",
                lineHeight: 1.5,
                letterSpacing: "-1.5px",
                color: "var(--color-gray-900)",
              }}
            >
              <span className="block">
                대학·기업·지역사회가 함께 지속가능한 미래를 행동으로 구현하는 연대 플랫폼
              </span>
              <span className="block">
                알고 있는 사람이 아닌, 실천할 수 있는 ESG 인재를 인증합니다.
              </span>
            </p>
          </div>

          {/* Cards + CTA */}
          <div className="flex flex-col items-center gap-12">
            {/* 3 cards */}
            <div className="flex justify-center gap-12">
              {CARDS.map((card) => (
                <HeroIntroCard key={card.alt} {...card} />
              ))}
            </div>

            {/* CTA pair */}
            <div className="flex items-center gap-3">
              <HeroCTA variant="white" label="ESG 실천 아이디어 경진대회 참여하기" />
              <HeroCTA variant="green" label="ESG 마인드 자격검정 신청하기" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainHero;
