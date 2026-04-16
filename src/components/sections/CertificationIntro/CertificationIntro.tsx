import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";
import headingIcon from "@/assets/certification-intro/heading-icon.png";

/**
 * CertificationIntro — /certification 페이지 Intro 섹션 (Figma 299:3875).
 *
 * v4 원칙:
 * - 구조 중심: section / h2(재사용 HatchedSectionHeading) / p×3 시맨틱, flex 전용
 * - 디자인 토큰: max-w-[1416px], gap-5, gap-8, text-black, var(--font-family-pretendard)
 * - no absolutely-positioned elements — all flex layout
 *
 * 섹션 자기정렬: mx-auto max-w-[1416px], Preview 래퍼 의존 금지 (CLAUDE.md v4).
 *
 * 재사용:
 * - HatchedSectionHeading (40px 아이콘 + 32B 제목 + HatchedDivider)
 *   → contest-about과 동일한 imageRef `e0323828...` + crop `273e38` 사용
 *
 * Baseline: figma-screenshots/certification-intro.png (1416×291).
 */
const INTRO_PARAGRAPHS = [
  ["지속가능한 미래를 위해 산업체가 요구하는 ESG 기본원칙과 핵심역량을 발전시키고", "이를 알상과 직장생활에서 실천한다."],
  ["지역사회와 직장에서 긍정적인 변화를", "이끌어내는 실천가가 되어 큰 변화를", "만드는 데 기여한다."],
  ["ESG 원칙을 실천하여 지속가능한", "미래를 위한 일에 참여할 수 있는 기회를 만들고 다음세대에도 긍정적인 영향을 미친다."],
] as const;

export function CertificationIntro() {
  return (
    <section
      aria-labelledby="certification-intro-title"
      className="mx-auto flex w-full max-w-[1416px] flex-col gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        iconSrc={headingIcon}
        iconAlt=""
        title="자격검정의 필요성"
        titleId="certification-intro-title"
      />
      <ul className="flex list-none items-start gap-8 text-center">
        {INTRO_PARAGRAPHS.map((lines, index) => (
          <li key={index} className="flex-1">
            <p
              className="text-base font-medium leading-normal tracking-[-0.16px] text-black"
              style={{ fontFamily: "var(--font-family-pretendard)" }}
            >
              {lines.map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line}
                  {lineIndex < lines.length - 1 && <br aria-hidden="true" />}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
