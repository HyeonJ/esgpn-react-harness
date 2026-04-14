import heroImage from "@/assets/news-detail/hero.png";
import bodyImage from "@/assets/news-detail/body-image.png";

/**
 * NewsDetailArticle — 뉴스 상세 본문 (Figma 134:4157 상단 ~1253).
 * 936×1253. Hero + Title/Meta + HatchedDivider + BodyImage + Caption + BodyText.
 */

function HatchedLine() {
  return (
    <div className="flex h-[8px] w-full items-center gap-[8px]">
      <svg width="36" height="8" viewBox="0 0 36 8" aria-hidden="true">
        <g stroke="#97A29E" strokeWidth="1">
          <line x1="0" y1="8" x2="7" y2="0" />
          <line x1="9" y1="8" x2="16" y2="0" />
          <line x1="18" y1="8" x2="25" y2="0" />
          <line x1="27" y1="8" x2="34" y2="0" />
        </g>
      </svg>
      <div className="relative h-0 flex-1">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <svg className="block w-full" height="2" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" stroke="#B1B9B6" strokeWidth="1" />
          </svg>
        </div>
      </div>
      <svg width="36" height="8" viewBox="0 0 36 8" aria-hidden="true">
        <g stroke="#97A29E" strokeWidth="1">
          <line x1="0" y1="8" x2="7" y2="0" />
          <line x1="9" y1="8" x2="16" y2="0" />
          <line x1="18" y1="8" x2="25" y2="0" />
          <line x1="27" y1="8" x2="34" y2="0" />
        </g>
      </svg>
    </div>
  );
}

const BODY_PARAGRAPHS = [
  "2015년 유엔 총회에서 채택된 SDGs(지속가능개발목표)는 2016년부터 2030년까지 유엔과 국제사회가 달성해야 할 목표이다. 사람(People), 지구(Planet), 번영(Prosperity), 평화(Peace), 파트너십(Partnership)의 5P 영역을 기반으로 설계된 것으로, SDGs는 단순히 경제성장을 추구하기 위한 것이 아니며, 지구환경을 보호하고, 사회적 불평등을 해소하며, 경제적 기회를 확대하기 위한 것이다.",
  "현재 전 세계적으로 ESG 경영이 지속가능한 미래 실현의 핵심 축으로 강조되고 있다. ESG는 환경(Environmental), 사회(Social), 지배구조(Governance)의 약자로 기업이 단기 이익만을 추구하는 것에서 벗어나 지속가능성을 고려한 경영 활동을 수행하는 것을 의미한다.",
  "SDGs와 ESG는 각각 국제사회와 기업이 담당하는 영역이 다르지만 공통된 가치와 목표를 가지고 있다. 두 프레임워크 모두 지속가능한 발전을 추구하며 사회·환경적 책임을 강조한다는 점에서 궤를 같이 한다.",
  "이제는 지속가능성이 선택이 아닌 필수가 되었다. 개인과 기업, 그리고 정부가 함께 SDGs와 ESG의 가치를 실천할 때 진정한 지속가능한 미래가 열릴 것이다.",
];

export function NewsDetailArticle() {
  return (
    <article className="mx-auto flex w-[936px] flex-col">
      {/* Hero image */}
      <div className="w-full overflow-hidden rounded-[16px]">
        <img
          src={heroImage}
          alt="기사 대표 이미지"
          className="block h-auto w-full"
        />
      </div>

      {/* Title + Meta */}
      <div className="mt-[40px] flex w-full flex-col gap-[12px]">
        <h1
          className="w-full font-bold text-[#0a0a0a]"
          style={{ fontSize: 28, lineHeight: 1.4, letterSpacing: -0.7 }}
        >
          [진단과 제언] SDGs와 ESG, 실천이 관건이다
        </h1>
        <div className="flex items-center gap-[8px] text-[#97a29e]">
          <span style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: -0.07 }}>이투데이</span>
          <span aria-hidden="true" className="block size-[3px] rounded-full bg-[#97a29e]" />
          <span style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: -0.07 }}>2026-01-19</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-[24px]">
        <HatchedLine />
      </div>

      {/* Body image + caption */}
      <figure className="mt-[24px] flex flex-col items-center gap-[10px]">
        <img
          src={bodyImage}
          alt="본문 이미지 — 한광식 전문대학평생직업교육협회 사무총장"
          className="block h-[419px] w-[696px] rounded-[8px] object-cover"
        />
        <figcaption
          className="text-center text-[#97a29e]"
          style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: -0.07 }}
        >
          한광식 전문대학평생직업교육협회 사무총장/세종특별자치시 지방시대위원회
        </figcaption>
      </figure>

      {/* Body text */}
      <div className="mt-[24px] flex flex-col gap-[20px] text-[#1d2623]">
        {BODY_PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            style={{ fontSize: 15, lineHeight: 1.8, letterSpacing: -0.1125 }}
          >
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
