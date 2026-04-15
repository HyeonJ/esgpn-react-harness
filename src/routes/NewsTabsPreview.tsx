import { NewsTabs } from "@/components/sections/NewsTabs";

/**
 * __preview/news-tabs — G1 픽셀 비교용.
 * v3: NewsTabs pt-[140px] 내장 → Preview -mt-[140px]로 상쇄.
 */
export function NewsTabsPreview() {
  return (
    <div className="overflow-hidden">
      <div className="-mt-[140px]">
        <NewsTabs />
      </div>
    </div>
  );
}
