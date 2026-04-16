import { HatchedDivider } from "@/components/ui/HatchedDivider";
import heroImage from "@/assets/news-detail-article/hero.jpg";

/**
 * NewsDetailArticle — /news/:id 페이지 본문 섹션 (Figma 134:4157).
 *
 * 담당 범위: hero image → header(title+meta) → divider → body image+caption
 *           → body text(8 문단) → divider.
 * 범위 외: "실천의 영감을..." heading / 관련 뉴스 / "목록으로 이동하기" 버튼
 *         (각각 news-detail-related, news-detail-back 섹션).
 *
 * 시맨틱:
 *   <section> > <article w=936>
 *     <figure>hero</figure>
 *     <div> <header>h1+meta(time)</header>
 *           <HatchedDivider/>
 *           <figure>body img + figcaption</figure>
 *           <div>8×p</div>
 *           <HatchedDivider/> </div>
 *
 * Baseline: figma-screenshots/news-detail-article.png (938×2508 — 전체 body 포함).
 * clip-x 0 clip-y 0 clip-w 938 clip-h 1400 (article 영역만).
 */
export function NewsDetailArticle() {
  return (
    <section
      aria-labelledby="news-detail-title"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-[color:var(--color-gray-000)]"
    >
      <article
        className="flex w-[936px] flex-col gap-[40px]"
        data-node-id="134:4157"
      >
        {/* Hero image */}
        <figure
          className="relative w-full aspect-[456/280] overflow-hidden rounded-[16px] bg-[#d9d9d9] m-0"
          data-node-id="134:4030"
        >
          <img
            src={heroImage}
            alt="SDGs와 ESG 관련 기사 대표 이미지"
            className="absolute inset-0 size-full object-cover"
          />
        </figure>

        {/* Body wrapper */}
        <div
          className="flex w-full flex-col gap-[24px]"
          data-node-id="134:4032"
        >
          {/* Header: title + meta */}
          <header
            className="flex w-full flex-col gap-[12px]"
            data-node-id="134:4041"
          >
            <h1
              id="news-detail-title"
              className="m-0 w-full text-[32px] font-bold leading-[1.3] tracking-[-0.96px] text-[color:var(--color-gray-900)]"
              style={{ fontFamily: "var(--font-family-pretendard)" }}
              data-node-id="134:4034"
            >
              [진단과 제언] SDGs와 ESG, 실천이 관건이다
            </h1>
            <p
              className="m-0 flex items-center gap-[8px] text-[14px] leading-[1.5] tracking-[-0.07px] text-[color:var(--color-gray-500)]"
              style={{ fontFamily: "var(--font-family-pretendard)" }}
              data-node-id="134:4036"
            >
              <span data-node-id="134:4037">이투데이</span>
              <span
                aria-hidden="true"
                className="inline-block size-[3px] rounded-full bg-[color:var(--color-gray-500)]"
                data-node-id="134:4038"
              />
              <time dateTime="2026-01-19" data-node-id="134:4039">
                2026-01-19
              </time>
            </p>
          </header>

          {/* Divider (top) */}
          <div data-node-id="134:4042">
            <HatchedDivider />
          </div>

          {/* Body image + caption */}
          <figure
            className="m-0 flex w-full flex-col items-center gap-[10px] px-[120px]"
            data-node-id="134:4062"
          >
            <img
              src={heroImage}
              alt="한광식 전문대학평생직업교육협회 사무총장 본문 사진"
              className="aspect-[936/564] w-full rounded-[16px] object-cover bg-[#d9d9d9]"
              data-node-id="134:4060"
            />
            <figcaption
              className="text-[14px] leading-[1.5] tracking-[-0.07px] text-[color:var(--color-gray-500)] whitespace-nowrap"
              style={{ fontFamily: "var(--font-family-pretendard)" }}
              data-node-id="134:4063"
            >
              한광식 전문대학평생직업교육협회 사무총장/세종특별자치시 지방시대위원회
            </figcaption>
          </figure>

          {/* Body text */}
          <div
            className="flex w-full flex-col gap-0 text-[16px] leading-[1.5] tracking-[-0.16px] text-[color:var(--color-gray-900)]"
            style={{ fontFamily: "var(--font-family-pretendard)" }}
            data-node-id="134:4035"
          >
            <p className="m-0">
              한광식 전문대학평생직업교육협회 사무총장/세종특별자치시 지방시대위원회 위원
            </p>
            <p className="m-0">
              2015년 유엔 총회에서 채택된 SDGs(지속가능개발목표)는 2016년부터 2030년까지 유엔과 국제사회가 달성해야 할 목표이다. 사람(People), 지구(Planet), 번영(Prosperity), 평화(Peace), 파트너십(Partnership)의 5P 영역을 기반으로 설계된 것으로, SDGs는 단순히 경제성장을 추구하기 위한 것이 아니며, 지구환경을 보호하고, 사회적 불평등을 해소하며, 경제적 기회를 확대하기 위한 것이다.
            </p>
            <p className="m-0">
              특히, 기후변화와 같은 글로벌 이슈는 한 국가나 지역의 문제가 아니라, 전 세계의 모든 국가가 서로 협력하여 지속가능한 미래를 만들기 위한 필수적인 프레임워크라고 할 수 있다. 부연 설명하면, SDGs는 17개 목표와 169개의 세부목표로 구성되어 있으며, 각 목표는 구체적인 지표를 통해 성과를 측정할 수 있게 구성되어 있다.
            </p>
            <p className="m-0">
              이와 관련하여, 한국의 국가지속가능발전목표(K-SDGs)는 5대 전략, 17개 목표와 119개 세부목표, 236개의 지표로 구성되어 있다. 17개 목표는 △빈곤 퇴치, △기아 종식, △건강과 웰빙, △양질의 교육, △성평등, △깨끗한 물과 위생, △적정 가격의 깨끗한 에너지, △양질의 일자리와 경제성장, △산업, 혁신, 사회기반 시설, △불평등 감소, △지속가능한 도시와 지역사회, △책임 있는 소비와 생산, △기후행동, △수생태계 보전, △육상생태계 보전, △평화, 정의, 강력한 제도 △목표 달성을 위한 파트너십 등으로 구성되어 있다. 현재 정부기관, 지자체와 시민단체, 이해관계자그룹, 전문가 등이 K-SDGs 달성을 위해 노력하고 있다.
            </p>
            <p className="m-0">
              다른 한편으로, ESG(환경·사회·지배구조)는 과거 기업에서 재무적 성과만을 판단하던 기준에서 벗어나 환경, 사회, 투명성까지 책임지고 지속가능성(Sustainability)을 요구하고 있다. 특히 SDGs 달성에 있어 ESG의 역할은 매우 중요하다고 할 수 있다.
            </p>
            <p className="m-0">
              ESG의 주요 내용을 보면, E(환경) 측면에서는 기후변화, 탄소중립, 환경오염과 환경규제, 생태계와 생물다양성 등이 핵심 사안이며, S(사회) 측면에서는 데이터 보호, 인권보장과 성별 그리고 다양성 문제, 지역사회와의 협력관계 구축 등 사회와 얼마나 적절한 관계를 구축하고 있는지가 핵심 사안이다. G(지배구조) 측면에서는 투명하고 신뢰도 높은 이사회 구성과 활동 등을 통해 부패를 최대한 방지하고, 기업윤리를 준수함으로써 높은 지배구조 가치를 확보하는 데 있다. 이와 같이 ESG는 무엇보다 실천이 중요하다.
            </p>
            <p className="m-0">
              이를 통해 환경을 보호하고 사회적 약자를 배려하며, 지속가능한 미래를 위한 실천활동이 활발하게 전개돼야 한다. 작년 6월 산업통상자원부에서 발표한 K-ESG 가이드라인2.0은 국제 흐름에 맞게 잘 제시되어 있다.
            </p>
            <p className="m-0">
              기업은 작년부터 세 가지 ESG 흐름인 국제 공시(ISSB·ESRS), CBAM(탄소국경조정), 국내 K-ESG 평가 및 공공기관 평가에 대응해야 한다. 이 세 가지가 요구하는 핵심사항은 ‘△탄소→△재생에너지→△공급망→△안전→△데이터’로 결국 이 항목들이 기업의 ESG 수준을 결정하게 된다.
            </p>
            <p className="m-0">
              이런 측면에서 볼 때, 현재 우리나라는 ESG 경영에 대한 관심은 비교적 높으나, 현실화 측면에서는 유럽연합(EU) 등 ESG 선진국보다 부족한 점이 많다. 또한, SDGs는 2030년에 완료된다는 점에서 이해관계자그룹을 중심으로 충분한 점검과 소통이 이루어져야 한다. 분명한 것은 SDGs와 ESG는 인류의 지속가능한 미래를 위해 반드시 필요한 사항이라는 점을 우리 모두 인식해야 한다.
            </p>
          </div>

          {/* Divider (bottom) */}
          <div data-node-id="134:4064">
            <HatchedDivider />
          </div>
        </div>
      </article>
    </section>
  );
}
