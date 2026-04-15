import { AboutOrganizationTabs } from "@/components/sections/AboutOrganizationTabs";

/**
 * __preview/about-organization-tabs — G1 픽셀 비교용 격리 라우트.
 *
 * v3: 섹션 h=190 (Header clearance 내장). Preview는 첫 88px를 negative margin으로 가려
 * baseline(1920×102)과 1:1 비교.
 */
export function AboutOrganizationTabsPreview() {
  return (
    <div className="w-[1920px] h-[102px] overflow-hidden mx-auto bg-white">
      <div className="-mt-[88px]">
        <AboutOrganizationTabs />
      </div>
    </div>
  );
}
