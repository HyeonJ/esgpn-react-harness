import { AboutOrganizationChart } from "@/components/sections/AboutOrganizationChart";

/**
 * Isolated preview route for visual regression testing.
 * No Header/Footer — matches baseline PNG (pure section only).
 * bg-white wrapper ensures alpha=0 areas match Framelink baseline.
 */
export function AboutOrganizationChartPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <AboutOrganizationChart />
    </div>
  );
}
