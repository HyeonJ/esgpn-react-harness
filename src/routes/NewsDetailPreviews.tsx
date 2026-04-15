import { NewsDetailBreadcrumb } from "@/components/sections/NewsDetailBreadcrumb";
import { NewsDetailArticle } from "@/components/sections/NewsDetailArticle";
import { NewsDetailRelated } from "@/components/sections/NewsDetailRelated";
import { NewsDetailBack } from "@/components/sections/NewsDetailBack";

/**
 * v3: NewsDetailBreadcrumb은 Header clearance 위해 pt-[140px] 내장.
 * Preview는 -mt-[140px]로 상쇄, 기존 baseline(936×24)과 1:1 비교.
 */
export function NewsDetailBreadcrumbPreview() {
  return (
    <div className="overflow-hidden">
      <div className="-mt-[140px]">
        <NewsDetailBreadcrumb />
      </div>
    </div>
  );
}
export function NewsDetailArticlePreview() { return <NewsDetailArticle />; }
export function NewsDetailRelatedPreview() { return <NewsDetailRelated />; }
export function NewsDetailBackPreview() { return <NewsDetailBack />; }
