import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";
import { BulletCard } from "./BulletCard";
import headingIcon from "@/assets/contest-about/heading-icon.png";

/**
 * ContestAbout — /contest 페이지 About 섹션 (Figma 302:4977).
 *
 * v4 원칙:
 * - 구조 중심: section/h2/h3/article/ul/li 시맨틱, flex 전용 (no positioning hacks)
 * - 디자인 토큰: brand-500, gray-100, var(--spacing-*), var(--font-family-pretendard)
 * - near-black 3종 (#0A0A0A, #000, #1E2939)만 Figma raw hex 유지 (토큰 없음, 디자인 충실도 우선)
 *
 * 섹션 자기정렬: mx-auto max-w-[1416px], Preview 래퍼 의존 금지 (CLAUDE.md v4).
 *
 * Baseline: figma-screenshots/contest-about.png (1416×459).
 */
const CORE_FEATURES = [
  "SDGs・ESG 기반 현장 문제해결",
  "대학・청년・지역 연계 팀 프로젝트",
  "대회로 끝나지 않고 실천과제로 연결",
] as const;

const TARGETS = [
  "대학생・청년",
  "대학・지역 혁신 조직",
  "ESG에 관심 있는 기업・기관",
] as const;

export function ContestAbout() {
  return (
    <section
      aria-labelledby="contest-about-title"
      className="mx-auto flex w-full max-w-[1416px] flex-col gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        iconSrc={headingIcon}
        iconAlt=""
        title="ESG 실천 아이디어 경진대회란?"
        titleId="contest-about-title"
      />
      <div className="flex flex-col gap-5">
        <p
          className="text-[16px] font-medium leading-[1.5] tracking-[-0.16px] text-black"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          {"ESG를\u00A0"}
          <span className="font-bold text-brand-500">
            아이디어 → 실행 → 사회적 가치
          </span>
          로 연결하는 실천형 프로그램 입니다.
        </p>
        <div className="flex items-start gap-4">
          <BulletCard title="핵심 특징" items={CORE_FEATURES} />
          <BulletCard title="주요 대상" items={TARGETS} />
        </div>
      </div>
    </section>
  );
}
