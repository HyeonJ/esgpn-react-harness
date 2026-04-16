import thumbA from "@/assets/news-featured/thumb.jpg";
import thumbB from "@/assets/news-list/thumb-b.png";

export interface RelatedNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
}

/**
 * Figma baseline (134:4086 / 134:4096 / 134:4106) — 3 related items.
 * Thumbnails: 134:4095, 134:4105, 134:4115.
 * Item 1/3: thumbA (Rectangle17). Item 2: thumbB (Rectangle18).
 */
export const RELATED_NEWS: readonly RelatedNewsItem[] = [
  {
    id: "134:4086",
    title: "[진단과 제언] SDGs와 ESG, 실천이 관건이다",
    summary:
      "2015년 유엔 총회에서 채택된 SDGs(지속가능개발목표)는 2016년부터 2030년까지 유엔과 국제사회가 달성해야 할 목표이다. 사람(People), 지구(Planet), 번영(Prosperity), 평화(Peace), 파트너십(Partnership)의 5P 영역을 기반으로 설계된 것으로, SDGs는 단순히 경제성장을 추구하기 위한 것이 아니며, 지구환경을 보호하고, 사회적 불평등을 해소하며, 경제적 기회를 확대하기 위한 것이다.",
    source: "이투데이",
    date: "2026-01-19",
    thumbnailSrc: thumbA,
    thumbnailAlt: "SDGs와 ESG 실천 관련 이미지",
  },
  {
    id: "134:4096",
    title: "[수요논단] ESG 정착은 우리의 새로운 미래",
    summary:
      "ESG 바람이 4차 산업혁명을 능가할 만큼 강하게 불고 있다. 코로나19가 장기적인 흐름을 보이면서 기후와 환경, 사회적 불평등에 대한 중요성이 대두되면서 우선적으로 기업이 동참할 것을 강하게 요구하고 있다. ESG는 Environmental, Social, Governance의 첫 글자를 딴 약자로 기존의 지속가능경영이나 기업의 사회적 책임(Corporate Social Responsibility, CSR)이 확장된 개념으로 볼 수 있다.",
    source: "한국대학신문",
    date: "2022-01-18",
    thumbnailSrc: thumbB,
    thumbnailAlt: "ESG 정착 관련 인물 이미지",
  },
  {
    id: "134:4106",
    title: "[수요논단] 정부차원에서 ESG창업 붐(boom) 조성해야",
    summary:
      "ESG 이슈가 뜨겁다. ESG는 Environmental(환경), Social(사회), Governance(지배구조)를 의미한다. 좀 더 자세히 설명하면 다음과 같다. 환경 측면에서는 기후변화, 탄소중립, 환경오염 완화를 위한 자원 및 폐기물 관리, 에너지 효율화가 중요한 이슈이며, 사회 측면에서는 소비자와 투자자가 사회에 유익(有益)을 주는 기업에 관심을 보이기 시작했다.",
    source: "한국대학신문",
    date: "2022-01-18",
    thumbnailSrc: thumbA,
    thumbnailAlt: "ESG 창업 관련 이미지",
  },
];
