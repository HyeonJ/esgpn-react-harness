import { NewsDetailArticle } from "@/components/sections/NewsDetailArticle";

/**
 * Isolated preview route for visual regression testing.
 * bg-white wrapper ensures alpha=0 areas match baseline.
 * 측정 clip: --clip-x 0 --clip-y 0 --clip-w 938 --clip-h 1400 (article 영역만)
 */
export function NewsDetailArticlePreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <NewsDetailArticle />
    </div>
  );
}
