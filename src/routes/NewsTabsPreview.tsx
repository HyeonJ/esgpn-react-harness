import { NewsTabs } from "@/components/sections/NewsTabs";

/**
 * Isolated preview for G1 visual regression capture.
 * Baseline: figma-screenshots/news-tabs.png (936×30).
 * Wrapper width 936px matches baseline crop exactly.
 */
export function NewsTabsPreview() {
  return (
    <div className="mx-auto min-h-[30px] w-[936px] bg-white">
      <NewsTabs />
    </div>
  );
}
