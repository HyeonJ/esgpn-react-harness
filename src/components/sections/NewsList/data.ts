import thumbA from "@/assets/news-featured/thumb.jpg";
import thumbB from "@/assets/news-list/thumb-b.png";

export interface ListNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
}

/**
 * Figma baseline (129:2622, 129:2632, ..., 129:2692) — 8개 더미 뉴스.
 * ListItem A (index 0) + ListItem C~H: thumbA 공유 (rectangle17)
 * ListItem B (index 1): thumbB 단독 (rectangle18)
 * baseline pixel diff 매칭 위해 Figma 원본 텍스트 그대로 유지.
 */
export const LIST_NEWS: readonly ListNewsItem[] = [
  {
    id: "129:2622",
    title: "[진단과 제언] SDGs와 ESG, 실천이 관건이다",
    summary:
      "2015년 유엔 총회에서 채택된 SDGs(지속가능개발목표)는 2016년부터 2030년까지 유엔과 국제사회가 달성해야 할 목표이다. 사람(People), 지구(Planet), 번영(Prosperity), 평화(Peace), 파트너십(Partnership)의 5P 영역을 기반으로 설계된 것으로, SDGs는 단순히 경제성장을 추구하기 위한 것이 아니며, 지구환경을 보호하고, 사회적 불평등을 해소하며, 경제적 기회를 확대하기 위한 것이다.",
    source: "이투데이",
    date: "2026-01-19",
    thumbnailSrc: thumbA,
    thumbnailAlt: "SDGs와 ESG 실천 관련 이미지",
  },
  {
    id: "129:2632",
    title: "[수요논단] ESG 정착은 우리의 새로운 미래",
    summary:
      "ESG 바람이 4차 산업혁명을 능가할 만큼 강하게 불고 있다. 코로나19가 장기적인 흐름을 보이면서 기후와 환경, 사회적 불평등에 대한 중요성이 대두되면서 우선적으로 기업이 동참할 것을 강하게 요구하고 있다. ESG는 Environmental, Social, Governance의 첫 글자를 딴 약자로 기존의 지속가능경영이나 기업의 사회적 책임(Corporate Social Responsibility, CSR)이 확장된 개념으로 볼 수 있다.",
    source: "한국대학신문",
    date: "2022-01-18",
    thumbnailSrc: thumbB,
    thumbnailAlt: "ESG 정착 관련 인물 이미지",
  },
  {
    id: "129:2642",
    title: "[수요논단] 정부차원에서 ESG창업 붐(boom) 조성해야",
    summary:
      "ESG 이슈가 뜨겁다. ESG는 Environmental(환경), Social(사회), Governance(지배구조)를 의미한다. 좀 더 자세히 설명하면 다음과 같다. 환경 측면에서는 기후변화, 탄소중립, 환경오염 완화를 위한 자원 및 폐기물 관리, 에너지 효율화가 중요한 이슈이며, 사회 측면에서는 소비자와 투자자가 사회에 유익(有益)을 주는 기업에 관심을 보이기 시작했다.",
    source: "한국대학신문",
    date: "2022-01-18",
    thumbnailSrc: thumbA,
    thumbnailAlt: "ESG 창업 관련 이미지",
  },
  {
    id: "129:2652",
    title: "[수요논단] 지자체(광역·기초) 중심의 ESG 스타트업 생태계 조성 필요하다",
    summary:
      "ESG는 환경(Environmental), 사회(Social), 지배구조(Governance)의 영문 첫 글자를 조합한 단어로 글로벌 경제 중심에 있다. 그중에서도 가장 주목받는 키워드는 환경이며, 기후변화와 탄소 배출, 환경오염과 환경규제, 생태계와 생물 다양성 등이 주요 이슈이다. 참고로 2019년 12월 11일 유럽연합(EU)에서 발표한 그린딜(Green Deal) 정책에는 2050년 탄소중립을 달성하고 △청정에너지 △순환경제 △자원 효율적 건축 △지속가능한 수송 등의 분야별 전략과 실행 로드맵이 제시돼 있다.",
    source: "한국대학신문",
    date: "2024-05-29",
    thumbnailSrc: thumbA,
    thumbnailAlt: "지자체 ESG 스타트업 생태계 관련 이미지",
  },
  {
    id: "129:2662",
    title: "[기술혁신] 인공지능과 빅데이터를 활용한 ESG 평가 시스템 개발이 시급하다",
    summary:
      "기업의 ESG 성과를 정확히 측정하고 관리할 수 있는 기술적 기반이 부족한 상황이다. 인공지능과 빅데이터 분석을 통한 자동화된 ESG 평가 및 리포팅 시스템을 구축하면 투명성과 신뢰성을 크게 높일 수 있다. 이러한 시스템은 규제 대응과 투자유치에도 긍정적인 영향을 미칠 것이다.",
    source: "디지털이코노미뉴스",
    date: "2024-05-30",
    thumbnailSrc: thumbA,
    thumbnailAlt: "AI와 ESG 평가 관련 이미지",
  },
  {
    id: "129:2672",
    title: "[사회적책임] 기업의 지역사회 참여 확대가 ESG 가치 실현의 핵심이다",
    summary:
      "기업들은 단순한 법적 준수를 넘어 지역사회와의 상생을 도모하는 사회공헌 활동에 집중해야 한다. 지역 일자리 창출, 환경 보호 캠페인, 교육지원 등 다양한 프로그램이 지역사회 신뢰 구축에 기여하며, 이는 곧 기업의 지속가능성 강화로 연결된다.",
    source: "사회공헌저널",
    date: "2024-06-01",
    thumbnailSrc: thumbA,
    thumbnailAlt: "지역사회 참여 및 ESG 가치 실현 관련 이미지",
  },
  {
    id: "129:2682",
    title: "[환경정책] 정부의 친환경 인프라 투자 확대가 ESG 확산에 박차를 가한다",
    summary:
      "친환경 교통, 재생에너지, 스마트 그린 시티 등 정부 주도의 인프라 프로젝트가 증가하면서 ESG 경영을 도입하는 기업과 스타트업이 늘고 있다. 이러한 인프라 투자는 저탄소 사회로의 전환을 촉진하고, 혁신 생태계 조성에 필수적인 역할을 한다.",
    source: "에너지포커스",
    date: "2024-06-02",
    thumbnailSrc: thumbA,
    thumbnailAlt: "친환경 인프라 투자 관련 이미지",
  },
  {
    id: "129:2692",
    title: "[지배구조] 투명한 경영과 윤리경영 문화 확립이 기업 경쟁력의 원천이다",
    summary:
      "지배구조 개선은 기업의 장기적 성장과 직결된다. 투명한 의사결정 구조와 이사회 독립성 강화, 내부감사 기능 활성화 등은 투자자 신뢰 제고 및 리스크 감소에 기여한다. 윤리경영 문화 확산 역시 지속가능한 기업 운영의 토대가 된다.",
    source: "경영전략리뷰",
    date: "2024-06-03",
    thumbnailSrc: thumbA,
    thumbnailAlt: "투명한 경영과 윤리경영 관련 이미지",
  },
];
