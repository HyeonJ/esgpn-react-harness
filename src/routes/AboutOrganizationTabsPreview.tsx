import { AboutOrganizationTabs } from "@/components/sections/AboutOrganizationTabs";

/**
 * __preview/about-organization-tabs — G1 픽셀 비교용 격리 라우트.
 * Header/Footer 없이 단독 렌더 → baseline (figma-screenshots/about-organization-tabs.png, 1920×102)과 1:1 비교.
 */
export function AboutOrganizationTabsPreview() {
  return (
    <div className="w-[1920px] min-h-[102px] mx-auto bg-white">
      <AboutOrganizationTabs />
    </div>
  );
}
