import { NewsDetailRelated } from "@/components/sections/NewsDetailRelated";

/**
 * Isolated preview route for visual regression testing.
 * bg-white wrapper ensures alpha=0 areas match baseline.
 * 측정 clip: 섹션 width 936 + heading 28 + gap 24 + list 486 = section 538 total.
 * list 영역만 비교: --clip-x 492 --clip-y 52 --clip-w 936 --clip-h 486
 */
export function NewsDetailRelatedPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <NewsDetailRelated />
    </div>
  );
}
