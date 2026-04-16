import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";
import { BenefitCard } from "./BenefitCard";
import { CtaBanner } from "./CtaBanner";
import headingIcon from "@/assets/contest-about/heading-icon.png";
import icon1 from "@/assets/contest-benefits/icon-1-project.png";
import icon2 from "@/assets/contest-benefits/icon-2-network.png";
import icon3 from "@/assets/contest-benefits/icon-3-prize.png";
import icon4 from "@/assets/contest-benefits/icon-4-business.png";
import icon5 from "@/assets/contest-benefits/icon-5-mentor.png";
import icon6 from "@/assets/contest-benefits/icon-6-community.png";

/**
 * ContestBenefits — /contest 페이지 Benefits 섹션 (Figma 302:5067, 1416×969).
 *
 * v4 원칙:
 * - 구조 중심: section + h2 + ul/li + article + h3 + aside + button 시맨틱
 * - flex 전용 레이아웃 (positioning 없음)
 * - 디자인 토큰 적극: bg-gray-100, status-badge-positive-700, brand-700, white, spacing/radius 토큰
 * - near-black #0A0A0A / 설명 #4A5565만 raw (토큰 불일치)
 *
 * 공통 컴포넌트: HatchedSectionHeading (contest-about와 공유, Rule of Three 2/3 승격 완료)
 * 로컬 컴포넌트: BenefitCard (6회 사용, 타 페이지 확인 후 승격), CtaBanner (1회)
 *
 * 섹션 자기정렬: mx-auto max-w-[1416px]. Preview 래퍼 의존 금지.
 * Baseline: figma-screenshots/contest-benefits.png (1416×969).
 */
const BENEFITS = [
  {
    icon: icon1,
    title: "실전 중심 프로젝트",
    lines: [
      "이론이 아닌 실제 현장의 문제를 해결하는",
      "실전형 프로젝트로 진행됩니다.",
    ],
  },
  {
    icon: icon2,
    title: "네트워킹 기회",
    lines: [
      "다양한 분야의 전문가, 기업, 기관과의",
      "네트워킹 기회를 제공합니다.",
    ],
  },
  {
    icon: icon3,
    title: "상금 및 시상",
    lines: ["우수한 아이디어에는 상금과", "다양한 혜택을 제공합니다."],
  },
  {
    icon: icon4,
    title: "사업화 지원",
    lines: [
      "수상작은 실제 사업화 및 프로젝트 실행을",
      "위한 지원을 받을 수 있습니다.",
    ],
  },
  {
    icon: icon5,
    title: "멘토링 제공",
    lines: ["ESG 전문가의 1:1 맞춤형 멘토링으로", "아이디어를 구체화합니다."],
  },
  {
    icon: icon6,
    title: "지역사회 연계",
    lines: ["지역사회와 연계하여 실질적인", "사회적 가치를 창출합니다."],
  },
] as const satisfies ReadonlyArray<{
  icon: string;
  title: string;
  lines: readonly [string, string];
}>;

export function ContestBenefits() {
  return (
    <section
      aria-labelledby="contest-benefits-title"
      className="mx-auto flex w-full max-w-[1416px] flex-col gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        iconSrc={headingIcon}
        iconAlt=""
        title="ESG 실천 아이디어 경진대회의 특별한 혜택"
        titleId="contest-benefits-title"
      />
      <div className="flex flex-col gap-3">
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {BENEFITS.map((b) => (
            <li key={b.title}>
              <BenefitCard
                icon={b.icon}
                iconAlt=""
                title={b.title}
                lines={b.lines}
              />
            </li>
          ))}
        </ul>
        <CtaBanner />
      </div>
    </section>
  );
}
