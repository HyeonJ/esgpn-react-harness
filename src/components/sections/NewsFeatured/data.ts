import thumb from "@/assets/news-featured/thumb.jpg";

export interface FeaturedNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
}

/**
 * Figma baseline (129:2579, 129:2589) — Card A/B 모두 동일한 더미 뉴스 반복.
 * 실제 서비스에선 API 데이터로 교체되며 각 카드가 다른 썸네일/제목을 가짐.
 * baseline pixel diff 통과를 위해 디자인 원본 그대로 2개 하드코딩 유지.
 */
export const FEATURED_NEWS: readonly FeaturedNewsItem[] = [
  {
    id: "129:2579",
    title: "[친다주 제언] SDGs와 ESG, 실전이 관건이다",
    summary:
      "ESG는 이제 선택이 아닌 필수다. 기업·지자체·시민사회가 함께 움직일 때 비로소 실질적인 변화를 만들어낸다. 실천 가능한 목표와 투명한 성과 측정이 지속가능성을 완성한다.",
    source: "이투데이",
    date: "2026-01-19",
    thumbnailSrc: thumb,
    thumbnailAlt: "SDGs와 ESG 실천 관련 이미지",
  },
  {
    id: "129:2589",
    title: "[친다주 제언] SDGs와 ESG, 실전이 관건이다",
    summary:
      "ESG는 이제 선택이 아닌 필수다. 기업·지자체·시민사회가 함께 움직일 때 비로소 실질적인 변화를 만들어낸다. 실천 가능한 목표와 투명한 성과 측정이 지속가능성을 완성한다.",
    source: "이투데이",
    date: "2026-01-19",
    thumbnailSrc: thumb,
    thumbnailAlt: "SDGs와 ESG 실천 관련 이미지",
  },
];
