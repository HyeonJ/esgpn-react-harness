import cardImage from "@/assets/news-featured/card-image.png";

/**
 * NewsFeatured — 뉴스 페이지 Featured 영역 (Figma 129:2560).
 * 936×568. HatchedDivider + 2 카드 + 화살표 nav.
 *
 * 카드 (456w):
 *   image 456×280 rounded-16 (object-cover)
 *   title 24 Bold #1d2623 ls -0.6 leading 1.4
 *   summary 15 Regular #1d2623 ls -0.1125 leading 1.5 (ellipsis)
 *   row gap-8: source (14R #97a29e) + dot 3px + date (14R #97a29e)
 *
 * Bottom nav: < button + 4 dots (active=32×6 black, others=6×6 #d9d9d9) + > button
 */

const SAMPLE_SUMMARY =
  "2015년 유엔 총회에서 채택된 SDGs(지속가능개발목표)는 2016년부터 2030년까지 유엔과 국제사회가 달성해야 할 목표이다. 사람(People), 지구(Planet), 번영(Prosperity), 평화(Peace), 파트너십(Partnership)의 5P 영역을 기반으로 설계된 것으로, SDGs는 단순히 경제성장을 추구하기 위한 것이 아니며, 지구환경을 보호하고, 사회적 불평등을 해소하며, 경제적 기회를 확대하기 위한 것이다.";

const cards = [
  {
    image: cardImage,
    title: "[진단과 제언] SDGs와 ESG, 실천이 관건이다",
    summary: SAMPLE_SUMMARY,
    source: "이투데이",
    date: "2026-01-19",
  },
  {
    image: cardImage,
    title: "[진단과 제언] SDGs와 ESG, 실천이 관건이다",
    summary: SAMPLE_SUMMARY,
    source: "이투데이",
    date: "2026-01-19",
  },
];

function Hatch() {
  return (
    <div className="flex h-[8px] w-full items-center gap-[8px]">
      <svg width="36" height="8" viewBox="0 0 36 8" fill="none" aria-hidden="true">
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
      <svg width="36" height="8" viewBox="0 0 36 8" fill="none" aria-hidden="true">
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

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{ transform: dir === "right" ? "rotate(0deg)" : "rotate(180deg)" }}
    >
      <path d="M5 2l5 5-5 5" stroke="#1d2623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NewsFeatured() {
  return (
    <section
      aria-label="주요 뉴스"
      className="mx-auto flex w-[936px] flex-col items-center justify-center gap-[20px]"
    >
      <Hatch />
      <div className="flex w-full flex-col items-center gap-[32px]">
        <div className="flex w-full items-center gap-[24px]">
          {cards.map((c, i) => (
            <article key={i} className="flex flex-1 flex-col items-start gap-[24px]">
              <div className="aspect-[456/280] relative w-full overflow-hidden rounded-[16px] bg-[#d9d9d9]">
                <img
                  src={c.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex w-full flex-col items-start gap-[24px] pr-[16px]">
                <div className="flex w-full flex-col items-start gap-[16px] text-[#1d2623]">
                  <h3
                    className="w-full font-bold"
                    style={{ fontSize: 24, lineHeight: 1.4, letterSpacing: -0.6 }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="w-full font-normal"
                    style={{
                      fontSize: 15,
                      lineHeight: 1.5,
                      letterSpacing: -0.1125,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {c.summary}
                  </p>
                </div>
                <div className="flex items-center gap-[8px] text-[#97a29e]">
                  <span style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: -0.07 }}>
                    {c.source}
                  </span>
                  <span aria-hidden="true" className="block size-[3px] rounded-full bg-[#97a29e]" />
                  <span style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: -0.07 }}>
                    {c.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* nav */}
        <div className="flex items-center gap-[16px]" aria-label="페이지 이동">
          <button
            type="button"
            aria-label="이전"
            className="flex size-[40px] items-center justify-center rounded-full border border-[#d3d8de] bg-white"
          >
            <Chevron dir="left" />
          </button>
          <div className="flex items-center gap-[6px]">
            <span aria-hidden="true" className="block h-[6px] w-[32px] rounded-[24px] bg-black" />
            <span aria-hidden="true" className="block size-[6px] rounded-[24px] bg-[#d9d9d9]" />
            <span aria-hidden="true" className="block size-[6px] rounded-[24px] bg-[#d9d9d9]" />
            <span aria-hidden="true" className="block size-[6px] rounded-[24px] bg-[#d9d9d9]" />
          </div>
          <button
            type="button"
            aria-label="다음"
            className="flex size-[40px] items-center justify-center rounded-full border border-[#d3d8de] bg-white"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
