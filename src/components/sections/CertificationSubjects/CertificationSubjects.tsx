import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";
import headingIcon from "@/assets/certification-subjects/heading-icon.png";

/**
 * CertificationSubjects — /certification 페이지 "자격검정 영역" 섹션 (Figma 299:3900).
 *
 * v4 원칙:
 * - 구조 중심: section / h2(HatchedSectionHeading) / ul > li > article > h3 + ul > li 시맨틱
 * - 디자인 토큰: bg-gray-100 (#eff0f0), bg-brand-500 (#4fb654), rounded-[20px]
 * - absolute 0. 모든 레이아웃 flex/grid
 *
 * 섹션 자기정렬: mx-auto max-w-[1416px], Preview 래퍼 의존 금지 (CLAUDE.md v4).
 *
 * 재사용:
 * - HatchedSectionHeading (40px 아이콘 + 32B 제목 + HatchedDivider)
 *   → CertificationIntro와 동일 heading-icon.png 공유 (섹션 독립성 위해 자체 복사 보관)
 *
 * Baseline: figma-screenshots/certification-subjects.png (1416×411) — Framelink 미등록
 *   상태라 공식 get_design_context inline image로 육안 검증.
 */
const CARDS = [
  {
    title: "ESG 기본개념",
    bullets: ["1-1. ESG 정의", "1-2. ESG 이슈와 필요성", "1-3. ESG 발전과정"],
  },
  {
    title: "ESG 기본 용어",
    bullets: ["2-1. ESG 용어", "2-2. ESG 약자"],
  },
  {
    title: "ESG 실행 및 실천",
    bullets: [
      "3-1. ESG 관련 법",
      "3-2. ESG 관련 기관과 프레임워크",
      "3-3. ESG 실천 방안",
    ],
  },
] as const;

export function CertificationSubjects() {
  return (
    <section
      aria-labelledby="certification-subjects-title"
      className="mx-auto flex w-full max-w-[1416px] flex-col gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        iconSrc={headingIcon}
        iconAlt=""
        title="자격검정 영역"
        titleId="certification-subjects-title"
      />
      <ul className="grid list-none grid-cols-3 gap-3">
        {CARDS.map((card) => (
          <li key={card.title} className="flex">
            <article className="flex flex-1 flex-col gap-5 rounded-[20px] bg-gray-100 p-6">
              <h3
                className="text-xl font-semibold leading-[1.4] tracking-[-0.4px] text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-family-pretendard)" }}
              >
                {card.title}
              </h3>
              <ul className="flex list-none flex-col gap-3">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="block size-3 shrink-0 rounded-full bg-brand-500"
                    />
                    <span
                      className="whitespace-nowrap text-base font-normal leading-normal tracking-[-0.16px] text-[#1E2939]"
                      style={{ fontFamily: "var(--font-family-pretendard)" }}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
