import { HatchedDivider } from "@/components/ui/HatchedDivider";
import icon1 from "@/assets/about-values/icon-1.png";
import icon2 from "@/assets/about-values/icon-2.png";
import icon3 from "@/assets/about-values/icon-3.png";
import icon4 from "@/assets/about-values/icon-4.png";

/**
 * AboutValues — About 페이지 세 번째 섹션 "4가지 핵심 가치".
 *
 * Figma source: 89:1233 (v5-1 flatten 재탐색으로 발견)
 *
 * v5 원칙:
 * - Figma 실제 스펙 정확 반영: 141×141 rounded-[24px] 아이콘 통일
 * - title 20 SemiBold, body 16 Regular
 * - 2x2 grid: outer gap-56 (행), inner gap-48 (카드), card flex-1 균등
 * - 카드 내부: gap-20 (icon→text), gap-12 (title→body)
 * - 시맨틱 HTML: section + h2(sr-only) + 4 article + h3
 */

const VALUES = [
  {
    icon: icon1,
    iconAlt: "톱니바퀴 두 개가 맞물린 아이콘",
    title: "선언을 넘어선 실천의 축적",
    description: (
      <>
        지속가능성은 구호가 아닌 교육과 실천의 반복으로 완성됩니다.
        <br />
        실천 방안을 발굴하고 행동으로 옮기는 프로세스를 구축합니다.
      </>
    ),
  },
  {
    icon: icon2,
    iconAlt: "캡슐 모양 도트 아이콘",
    title: "차세대 ESG 전문인력 양성",
    description: (
      <>
        청년을 ESG 실천의 출발점이자 확산 주체로 세우고,
        <br />
        체계적인 교육 및 프로그램을 통해 전문성을 갖춘 인재를 양성합니다.
      </>
    ),
  },
  {
    icon: icon3,
    iconAlt: "화살표 묶음 아이콘",
    title: "사회의 새로운 행동기준 정립",
    description: (
      <>
        ESG를 기업만의 평가 지표가 아닌, 우리 사회 전체가 지켜야 할
        <br />
        행동 기준으로 정의하고 이를 위한 활동 프로그램을 지원합니다.
      </>
    ),
  },
  {
    icon: icon4,
    iconAlt: "지구본 격자 아이콘",
    title: "실천적 연대 플랫폼 구축",
    description: (
      <>
        대학, 산업체, 지역사회가 지속가능한 미래를 현실로 만들어가는
        <br />
        네트워크 허브 역할을 수행하며, 사회공헌 모델을 제시합니다.
      </>
    ),
  },
] as const;

export function AboutValues() {
  return (
    <section
      className="mx-auto flex w-full max-w-[1920px] flex-col bg-[var(--color-gray-000)]"
      aria-labelledby="about-values-title"
    >
      <HatchedDivider className="my-[56px]" />

      <h2 id="about-values-title" className="sr-only">
        ESG실천네트워크 4가지 핵심 가치
      </h2>

      {/* 2x2 grid — Figma 89:1233 구조:
          outer flex-col gap-[56px] py-[24px] w-[936px] mx-auto */}
      <div className="mx-auto flex w-[936px] flex-col gap-[56px] py-[24px]">
        {[0, 2].map((rowStart) => (
          <div
            key={rowStart}
            className="flex items-center gap-[48px] w-full"
          >
            {VALUES.slice(rowStart, rowStart + 2).map((v) => (
              <article
                key={v.title}
                className="flex flex-1 flex-col items-center justify-center gap-[20px] min-w-0"
              >
                {/* 141×141 icon — Figma 완성 composition (89:1236/1241/1247/1252) REST API export.
                    rounded-[24px] alpha 포함, 단순 <img> 1개로 충분 (F-008/F-009 해결) */}
                <img
                  src={v.icon}
                  alt={v.iconAlt}
                  className="size-[141px] shrink-0"
                />


                {/* Text block */}
                <div className="flex w-full flex-col items-center gap-[12px] text-center">
                  <h3
                    className="font-semibold leading-[1.4] tracking-[-0.4px] whitespace-nowrap text-[var(--color-gray-900)]"
                    style={{ fontSize: 20 }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="leading-[1.5] tracking-[-0.16px] text-[var(--color-gray-900)]"
                    style={{ fontSize: 16 }}
                  >
                    {v.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>

      {/* 하단 divider 제거 — 다음 섹션의 top divider와 중복 (F-010). top-only 규칙 */}
    </section>
  );
}
