import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";
import { BulletCard } from "./BulletCard";
import headingIcon from "@/assets/contest-about/heading-icon.png";

/**
 * ContestAbout — 경진대회 About 섹션 (Figma 302:4977).
 *
 * 구조:
 *   section 1416×459 (px-240 py-64, col gap-20)
 *     HatchedSectionHeading (40 icon + 32B 제목 + HatchedDivider)
 *     col gap-20
 *       p 936w (intro mixed-run: Medium black → Bold #4FB654 → Medium black)
 *       row gap-16 items-start
 *         BulletCard "핵심 특징" (3 items)
 *         BulletCard "주요 대상" (3 items)
 *
 * baseline: figma-screenshots/contest-about.png (1416×459).
 * Q1~Q5 사용자 승인 반영 (HatchedSectionHeading ui/ 신설, CSS 불릿, 932 divider 재사용, 1416 preview, cropTransform icon).
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
      className="mx-auto flex w-[1416px] flex-col items-stretch gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        icon={headingIcon}
        iconAlt=""
        title="ESG 실천 아이디어 경진대회란?"
        titleId="contest-about-title"
      />
      <div className="flex flex-col items-stretch gap-5">
        <p
          className="w-[936px] font-medium text-[16px] text-black"
          style={{ lineHeight: 1.5, letterSpacing: "-0.16px" }}
        >
          {"ESG를\u00A0"}
          <span className="font-bold text-[#4FB654]">
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
