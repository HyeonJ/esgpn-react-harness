import { SectionTabs } from "@/components/ui/SectionTabs";

const ABOUT_TABS = [
  { label: "개요 & 철학", href: "/about" },
  { label: "조직도", href: "/about/organization", active: true },
  { label: "운영계획", href: "/about/operation" },
];

/**
 * About 조직도 page tabs section.
 * Reuses SectionTabs component with active="조직도".
 * Figma source: 89:1295 (flatten image) — reconstructed as semantic HTML.
 * Section height: 102px (measured from baseline y=88..190).
 */
export function AboutOrganizationTabs() {
  return (
    <section
      aria-label="About 조직도 섹션 탭"
      className="mx-auto flex w-full max-w-[1920px] items-start justify-center bg-gray-000 pt-[160px]"
    >
      <SectionTabs tabs={ABOUT_TABS} />
    </section>
  );
}
