import thumbA from "@/assets/main-news/thumb-a.png";
import thumbB from "@/assets/main-news/thumb-b.png";

export interface NewsItem {
  id: string;
  title: string;
  body: string;
  source: string;
  date: string;
  thumbnailSrc: string;
}

export const TOTAL_COUNT = 24;
export const CURRENT_PAGE = 1;
export const TOTAL_PAGES = 4;

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "43:283",
    title: "[진단과 제언] SDGs와 ESG, 실천이 관건이다",
    body: "2015년 유엔 총회에서 채택된 SDGs(지속가능개발목표)는 2016년부터 2030년까지 유엔과 국제사회가 달성해야 할 목표이다. 사람(People), 지구(Planet), 번영(Prosperity), 평화(Peace), 파트너십(Partnership)의 5P 영역을 기반으로 설계된 것으로, SDGs는 단순히 경제성장을 추구하기 위한 것이 아니며, 지구환경을 보호하고, 사회적 불평등을 해소하며, 경제적 기회를 확대하기 위한 것이다.",
    source: "이투데이",
    date: "2026-01-19",
    thumbnailSrc: thumbA,
  },
  {
    id: "40:1410",
    title: "[수요논단] ESG 정착은 우리의 새로운 미래",
    body: "ESG 바람이 4차 산업혁명을 능가할 만큼 강하게 불고 있다. 코로나19가 장기적인 흐름을 보이면서 기후와 환경, 사회적 불평등에 대한 중요성이 대두되면서 우선적으로 기업이 동참할 것을 강하게 요구하고 있다.",
    source: "한국대학신문",
    date: "2022-01-18",
    thumbnailSrc: thumbB,
  },
  {
    id: "43:293",
    title: "[수요논단] 정부차원에서 ESG창업 붐(boom) 조성해야",
    body: "ESG 이슈가 뜨겁다. ESG는 Environmental(환경), Social(사회), Governance(지배구조)를 의미한다. 좀 더 자세히 설명하면 다음과 같다. 환경 측면에서는 기후변화, 탄소중립, 환경오염 완화를 위한 자원 및 폐기물 관리, 에너지 효율화가 중요한 이슈이며, 사회 측면에서는 소비자와 투자자가 사회에 유익(有益)을 주는 기업에 관심을 보이기 시작했다.",
    source: "한국대학신문",
    date: "2022-01-18",
    thumbnailSrc: thumbA,
  },
  {
    id: "43:316",
    title: "[수요논단] 지자체(광역·기초) 중심의 ESG 스타트업 생태계 조성 필요하다",
    body: "ESG는 환경(Environmental), 사회(Social), 지배구조(Governance)의 영문 첫 글자를 조합한 단어로 글로벌 경제 중심에 있다. 그중에서도 가장 주목받는 키워드는 환경이며, 기후변화와 탄소 배출, 환경오염과 환경규제, 생태계와 생물 다양성 등이 주요 이슈이다.",
    source: "한국대학신문",
    date: "2024-05-29",
    thumbnailSrc: thumbA,
  },
  {
    id: "243:769",
    title: "[수요논단] 지자체(광역·기초) 중심의 ESG 스타트업 생태계 조성 필요하다",
    body: "ESG는 환경(Environmental), 사회(Social), 지배구조(Governance)의 영문 첫 글자를 조합한 단어로 글로벌 경제 중심에 있다. 그중에서도 가장 주목받는 키워드는 환경이며, 기후변화와 탄소 배출, 환경오염과 환경규제, 생태계와 생물 다양성 등이 주요 이슈이다.",
    source: "한국대학신문",
    date: "2024-05-29",
    thumbnailSrc: thumbA,
  },
];
