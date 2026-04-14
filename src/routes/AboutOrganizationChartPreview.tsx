import { AboutOrganizationChart } from "@/components/sections/AboutOrganizationChart";

/**
 * __preview/about-organization-chart — G1 픽셀 비교용 격리 라우트.
 * baseline figma-screenshots/about-organization-chart.png (1920×390)과 1:1 비교.
 */
export function AboutOrganizationChartPreview() {
  return (
    <div className="w-[1920px] min-h-[390px] mx-auto bg-white">
      <AboutOrganizationChart />
    </div>
  );
}
