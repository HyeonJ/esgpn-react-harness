import cardImage from "@/assets/news-featured/card-image.png";

/**
 * NewsDetailRelated — 관련 뉴스 (Figma 134:4118). 936×486.
 * HatchedDivider + Heading + 3 news items (news-list 패턴).
 */
const SAMPLE_TITLE = "[진단과 제언] SDGs와 ESG, 실천이 관건이다";
const SAMPLE_SUMMARY =
  "2015년 유엔 총회에서 채택된 SDGs(지속가능개발목표)는 2016년부터 2030년까지 유엔과 국제사회가 달성해야 할 목표이다.";

const items = Array.from({ length: 3 }, (_, i) => ({
  title: SAMPLE_TITLE,
  summary: SAMPLE_SUMMARY,
  source: i === 0 ? "이투데이" : i === 1 ? "한국경제" : "매일경제",
  date: "2026-01-19",
  href: `/news/${i + 10}`,
}));

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

export function NewsDetailRelated() {
  return (
    <section
      aria-label="관련 뉴스"
      className="mx-auto flex w-[936px] flex-col gap-[32px]"
    >
      <HatchedLine />
      <h2
        className="font-bold text-[#0a0a0a]"
        style={{ fontSize: 22, lineHeight: 1.4, letterSpacing: -0.55 }}
      >
        관련 뉴스
      </h2>
      <ul className="flex w-full flex-col">
        {items.map((it, i) => (
          <li key={i} className="flex w-full items-start gap-[20px] py-[24px]">
            <div className="flex flex-1 flex-col gap-[12px]">
              <h3
                className="font-bold text-[#0a0a0a]"
                style={{ fontSize: 20, lineHeight: 1.4, letterSpacing: -0.5 }}
              >
                {it.title}
              </h3>
              <p
                className="font-normal text-[#1d2623]"
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  letterSpacing: -0.1125,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {it.summary}
              </p>
              <div className="flex items-center gap-[8px] text-[#97a29e]">
                <span style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: -0.07 }}>{it.source}</span>
                <span aria-hidden="true" className="block size-[3px] rounded-full bg-[#97a29e]" />
                <span style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: -0.07 }}>{it.date}</span>
              </div>
            </div>
            <div
              className="shrink-0 overflow-hidden rounded-[12px] bg-[#d9d9d9]"
              style={{ height: 100, width: 140 }}
            >
              <img src={cardImage} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
