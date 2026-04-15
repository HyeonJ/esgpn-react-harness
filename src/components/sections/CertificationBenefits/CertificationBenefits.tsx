import iconImage from "@/assets/certification-intro/icon.png";
import icon1 from "@/assets/certification-benefits/icon-1.png";
import icon2 from "@/assets/certification-benefits/icon-2.png";
import icon3 from "@/assets/certification-benefits/icon-3.png";
import icon4 from "@/assets/certification-benefits/icon-4.png";
import badge1 from "@/assets/certification-benefits/badge-1.png";
import badge2 from "@/assets/certification-benefits/badge-2.png";
import badge3 from "@/assets/certification-benefits/badge-3.png";
import badge4 from "@/assets/certification-benefits/badge-4.png";
import badge5 from "@/assets/certification-benefits/badge-5.png";
import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";

/**
 * CertificationBenefits — 지속가능한 미래를 이끄는 필수역량 (Figma 299:3955).
 * 1416×399. 5 작은 카드 (h-180, flex-1, bg-#eff0f0 rounded-20).
 *
 * 카드:
 *   - 80×80 icon (rounded-16, image fill) — card 5는 #d9d9d9 placeholder
 *   - 14 Medium black 본문 (ls -0.07, 2줄 with <br>)
 *   - 24×24 number badge top-left absolute (-4,-4)
 *
 * 카드 2 icon에 mix-blend-multiply 적용.
 */

interface Benefit {
  icon?: string;
  iconBlend?: boolean;
  badge: string;
  badgeAlt: string;
  text: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    icon: icon1,
    badge: badge1,
    badgeAlt: "1",
    text: (
      <>
        지역사회와 상생으로
        <br />
        균형잡힌 지속가능성 실현
      </>
    ),
  },
  {
    icon: icon2,
    iconBlend: true,
    badge: badge2,
    badgeAlt: "2",
    text: (
      <>
        ESG 중심의 인재 육성과
        <br />
        조직 문화 혁신
      </>
    ),
  },
  {
    icon: icon3,
    badge: badge3,
    badgeAlt: "3",
    text: (
      <>
        사회적 가치 창출로 고객
        <br />
        신뢰와 브랜드 가치 제고
      </>
    ),
  },
  {
    icon: icon4,
    badge: badge4,
    badgeAlt: "4",
    text: (
      <>
        윤리적 의사결정과 투명한
        <br />
        정보 공개로 신뢰 제고
      </>
    ),
  },
  {
    badge: badge5,
    badgeAlt: "5",
    text: <>인간중심시대, ESG 역량강화로 새로운 성장동력 확보</>,
  },
];

export function CertificationBenefits() {
  return (
    <section
      aria-labelledby="certification-benefits-heading"
      className="mx-auto flex max-w-[1416px] w-full flex-col items-end gap-[20px] px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        icon={iconImage}
        iconAlt=""
        title="지속가능한 미래를 이끄는 필수역량"
        titleId="certification-benefits-heading"
        className="w-full"
      />
      <ul className="flex w-full items-center gap-[12px]">
        {benefits.map((b, i) => (
          <li
            key={i}
            className="relative flex h-[180px] flex-1 flex-col items-center justify-center gap-[12px] rounded-[20px] bg-[#eff0f0] px-[16px] pb-[12px] pt-[16px]"
          >
            {/* 80×80 아이콘 영역 */}
            {b.icon ? (
              <div className="relative size-[80px] shrink-0 overflow-hidden rounded-[16px]">
                <img
                  src={b.icon}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 block h-full w-full ${b.iconBlend ? "mix-blend-multiply" : ""}`}
                />
              </div>
            ) : (
              <div className="size-[80px] shrink-0 rounded-[16px] bg-[#d9d9d9]" aria-hidden="true" />
            )}
            <p
              className="w-full text-center font-medium text-black"
              style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: -0.07 }}
            >
              {b.text}
            </p>
            {/* 24×24 number badge top-left at (-4,-4) */}
            <img
              src={b.badge}
              alt={b.badgeAlt}
              className="absolute left-[-4px] top-[-4px] size-[24px]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
