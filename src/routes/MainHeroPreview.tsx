import { MainHero } from "@/components/sections/MainHero";

/**
 * Isolated preview route for visual regression testing.
 * No Header/Footer -- matches baseline PNG (pure hero only).
 * bg-white wrapper ensures alpha=0 areas match Framelink baseline.
 */
export function MainHeroPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <MainHero />
    </div>
  );
}
