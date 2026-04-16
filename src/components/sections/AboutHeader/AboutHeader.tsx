import { SectionTabs } from "@/components/ui/SectionTabs";

const ABOUT_TABS = [
  { label: "개요 & 철학", href: "/about", active: true },
  { label: "조직도", href: "/about/organization" },
  { label: "운영계획", href: "/about/operation" },
];

/**
 * About page header section.
 * Contains tab navigation, "ESGPN" display typography, and subcopy.
 * Figma source: 52:624 (flatten image) -- reconstructed as semantic HTML.
 * Section height: 454px (measured from baseline y=88..542).
 */
export function AboutHeader() {
  return (
    <section
      className="mx-auto flex w-full max-w-[1920px] flex-col items-center bg-gray-000 pt-[81px]"
      style={{ height: 454 }}
    >
      {/* Tab navigation -- centered, 14px Pretendard */}
      <SectionTabs tabs={ABOUT_TABS} />

      {/* Display title -- Yeseva One serif */}
      <h1
        className="mt-[80px] text-center text-gray-900"
        style={{
          fontFamily: "var(--font-family-yeseva)",
          fontSize: 152,
          lineHeight: "120px",
          letterSpacing: "normal",
        }}
      >
        ESGPN
      </h1>

      {/* Subcopy -- Pretendard 15px regular, centered */}
      <p
        className="mt-[47px] text-center text-gray-700"
        style={{
          fontSize: "var(--text-md-15r-size)",
          fontWeight: "var(--text-md-15r-weight)" as unknown as number,
          lineHeight: "27px",
          letterSpacing: "var(--text-md-15r-letter-spacing)",
        }}
      >
        ESGPN은 대학, 학회, 산업체, 지역사회가 함께
        <br />
        지속가능한 미래를 행동으로 구현 하는 것을 목표로 합니다.
      </p>
    </section>
  );
}
