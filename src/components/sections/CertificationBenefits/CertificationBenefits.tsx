import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";
import { CapabilityCard } from "./CapabilityCard";
import headingIcon from "@/assets/certification-benefits/heading-icon.png";
import icon1 from "@/assets/certification-benefits/icon-1-community.png";
import icon2 from "@/assets/certification-benefits/icon-2-talent.png";
import icon3 from "@/assets/certification-benefits/icon-3-value.png";
import icon4 from "@/assets/certification-benefits/icon-4-ethics.png";
import badge1 from "@/assets/certification-benefits/badge-1.png";
import badge2 from "@/assets/certification-benefits/badge-2.png";
import badge3 from "@/assets/certification-benefits/badge-3.png";
import badge4 from "@/assets/certification-benefits/badge-4.png";
import badge5 from "@/assets/certification-benefits/badge-5.png";

/**
 * CertificationBenefits — /certification 페이지 필수역량 섹션 (Figma 299:3955, 1416×399).
 *
 * v4 원칙:
 * - 구조 중심: section + h2 + ul/li + article + p 시맨틱
 * - flex 전용 (badge만 absolute, 불가피)
 * - 디자인 토큰: bg-gray-100, rounded-[20px], gap-3, p-4
 *
 * 공통 컴포넌트: HatchedSectionHeading (contest-about, contest-benefits와 공유)
 * 로컬 컴포넌트: CapabilityCard (5회 사용, 섹션 전용)
 *
 * 섹션 자기정렬: mx-auto max-w-[1416px]. Preview 래퍼 의존 금지.
 * Baseline: figma-screenshots/certification-benefits.png (1416×399).
 */
const CAPABILITIES = [
  {
    badge: badge1,
    icon: icon1,
    text: ["지역사회와 상생으로", "균형잡힌 지속가능성 실현"] as const,
  },
  {
    badge: badge2,
    icon: icon2,
    iconBlendMultiply: true,
    text: ["ESG 중심의 인재 육성과", "조직 문화 혁신"] as const,
  },
  {
    badge: badge3,
    icon: icon3,
    text: ["사회적 가치 창출로 고객", "신뢰와 브랜드 가치 제고"] as const,
  },
  {
    badge: badge4,
    icon: icon4,
    text: ["윤리적 의사결정과 투명한", "정보 공개로 신뢰 제고"] as const,
  },
  {
    badge: badge5,
    icon: undefined,
    text: "인간중심시대, ESG 역량강화로 새로운 성장동력 확보",
  },
] as const satisfies ReadonlyArray<{
  badge: string;
  icon?: string;
  iconBlendMultiply?: boolean;
  text: string | readonly [string, string];
}>;

export function CertificationBenefits() {
  return (
    <section
      aria-labelledby="certification-benefits-title"
      className="mx-auto flex w-full max-w-[1416px] flex-col items-end gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        iconSrc={headingIcon}
        iconAlt=""
        title="지속가능한 미래를 이끄는 필수역량"
        titleId="certification-benefits-title"
      />
      <ul className="m-0 flex w-full list-none flex-wrap justify-between gap-3 p-0">
        {CAPABILITIES.map((c, i) => (
          <li key={i}>
            <CapabilityCard
              badge={c.badge}
              icon={c.icon}
              iconAlt=""
              iconBlendMultiply={"iconBlendMultiply" in c ? c.iconBlendMultiply : false}
              text={c.text}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
