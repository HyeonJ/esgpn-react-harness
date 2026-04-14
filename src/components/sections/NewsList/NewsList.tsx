import cardImage from "@/assets/news-featured/card-image.png";

/**
 * NewsList — 뉴스 페이지 목록 (Figma 129:2609).
 * 936×1416. "총 24개" + HatchedDivider + 8 list items + Pagination.
 *
 * List item 936×162:
 *   row gap-20 items-start
 *     col gap-12 w-776
 *       title 18 SemiBold #0a0a0a (실측: design_context는 28h text — 추정 22~28 SB)
 *       summary 15 R #1d2623 ls -0.1125 (2줄)
 *       row gap-8 items-center: source 14R #97a29e + dot 3 + date 14R
 *     thumb 140×100 rounded-12 (#d9d9d9)
 *
 * Pagination: 13 dot pages + 4 nav arrows
 */

const SAMPLE_TITLE = "[진단과 제언] SDGs와 ESG, 실천이 관건이다";
const SAMPLE_SUMMARY =
  "2015년 유엔 총회에서 채택된 SDGs(지속가능개발목표)는 2016년부터 2030년까지 유엔과 국제사회가 달성해야 할 목표이다. 사람(People), 지구(Planet), 번영(Prosperity), 평화(Peace), 파트너십(Partnership)의 5P 영역을 기반으로 설계된 것으로, SDGs는 단순히 경제성장을 추구하기 위한 것이 아니며.";

const items = Array.from({ length: 8 }, (_, i) => ({
  title: SAMPLE_TITLE,
  summary: SAMPLE_SUMMARY,
  source: i % 2 === 0 ? "이투데이" : "한국경제",
  date: "2026-01-19",
  href: `/news/${i + 1}`,
}));

function HatchWithCount({ count }: { count: number }) {
  return (
    <div className="flex h-[24px] w-full items-center gap-[8px]">
      <span
        className="shrink-0 text-[#0a0a0a]"
        style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 600, letterSpacing: -0.16 }}
      >
        총 {count}개
      </span>
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

export function NewsList() {
  return (
    <section
      aria-label="뉴스 목록"
      className="mx-auto flex w-[936px] flex-col items-center gap-[32px] pt-[24px]"
    >
      <HatchWithCount count={24} />
      <ul className="flex w-full flex-col">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex w-full items-start gap-[20px] py-[24px]"
          >
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
            <div className="size-[140px] shrink-0 overflow-hidden rounded-[12px] bg-[#d9d9d9]" style={{ height: 100, width: 140 }}>
              <img src={cardImage} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            </div>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <nav aria-label="페이지" className="flex items-center gap-[8px]">
        <button type="button" aria-label="처음" className="size-[24px] text-[#97a29e]">«</button>
        <button type="button" aria-label="이전" className="size-[24px] text-[#97a29e]">‹</button>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === 1 ? "page" : undefined}
            className={`size-[24px] rounded-full text-[14px] ${n === 1 ? "bg-black text-white" : "text-[#1d2623]"}`}
          >
            {n}
          </button>
        ))}
        <button type="button" aria-label="다음" className="size-[24px] text-[#97a29e]">›</button>
        <button type="button" aria-label="끝" className="size-[24px] text-[#97a29e]">»</button>
      </nav>
    </section>
  );
}
