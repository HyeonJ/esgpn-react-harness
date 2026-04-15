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
 * ContestBenefits — 경진대회 Benefits 섹션 (Figma 302:5067, 1416×969).
 * 전략 [A] HTML 재구성. 6 BenefitCard 3×2 grid + 내부 CTA Banner 통합 (사용자 승인 Q2).
 *
 * 레이아웃 (layout_OAMIVB root):
 *   column, gap 20, padding 64 240, w=1416 hug-h
 *
 * Heading 블록 (302:5068, layout_CDPYGN): column gap 21
 *   HatchedSectionHeading(아이콘+제목+HatchedDivider) 재사용
 *
 * Body 래퍼 (302:6515, layout_JHODBY): column gap 12
 *   ├─ 카드 그리드 (layout_5MDMJZ): flex-wrap gap 12 → 304×3 + 12×2 = 936
 *   └─ CtaBanner (936×320)
 */
const BENEFITS = [
  {
    icon: icon1,
    title: "실전 중심 프로젝트",
    lines: ["이론이 아닌 실제 현장의 문제를 해결하는", "실전형 프로젝트로 진행됩니다."],
  },
  {
    icon: icon2,
    title: "네트워킹 기회",
    lines: ["다양한 분야의 전문가, 기업, 기관과의", "네트워킹 기회를 제공합니다."],
  },
  {
    icon: icon3,
    title: "상금 및 시상",
    lines: ["우수한 아이디어에는 상금과", "다양한 혜택을 제공합니다."],
  },
  {
    icon: icon4,
    title: "사업화 지원",
    lines: ["수상작은 실제 사업화 및 프로젝트 실행을", "위한 지원을 받을 수 있습니다."],
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
] as const;

export function ContestBenefits() {
  return (
    <section
      aria-labelledby="contest-benefits-title"
      className="mx-auto flex max-w-[1416px] w-full flex-col items-stretch gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        icon={headingIcon}
        iconAlt=""
        title="ESG 실천 아이디어 경진대회의 특별한 혜택"
        titleId="contest-benefits-title"
      />
      <div className="flex flex-col items-stretch gap-3">
        <div className="flex flex-wrap gap-3">
          {BENEFITS.map((b) => (
            <BenefitCard
              key={b.title}
              icon={b.icon}
              iconAlt=""
              title={b.title}
              lines={b.lines}
            />
          ))}
        </div>
        <CtaBanner />
      </div>
    </section>
  );
}
