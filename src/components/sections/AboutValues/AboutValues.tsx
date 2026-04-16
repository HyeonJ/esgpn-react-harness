import { HatchedDivider } from "@/components/ui/HatchedDivider";
import { ValueCard } from "./ValueCard";
import icon1 from "@/assets/about-values/icon-1.png";
import icon2 from "@/assets/about-values/icon-2.png";
import icon3 from "@/assets/about-values/icon-3.png";
import icon4 from "@/assets/about-values/icon-4.png";

/**
 * AboutValues — About 페이지 세 번째 섹션 "4가지 핵심 가치".
 *
 * v4 원칙:
 * - grid-cols-2 로 2x2 배치 (absolute 금지)
 * - 시맨틱 HTML: section + h2(sr-only) + 4 article(h3)
 * - 디자인 토큰 참조 (gray-900, spacing-*, text-base-16r-*)
 * - 아이콘 4개는 baseline crop PNG (Figma node flatten — SVG 재생성 불가)
 *
 * v1~v3 만성염증 (abs 3/file, semantic 2) 타겟. v4에서 구조 회복.
 *
 * Figma source: About 페이지 52:622 내부 y=1295..2017 영역 (flatten).
 * Baseline: figma-screenshots/about-values.png (1920x722, about-full에서 crop).
 */

const ICON_FRAME_H_ROW1 = 122;
const ICON_FRAME_H_ROW2 = 131;

const VALUES = [
  {
    icon: icon1,
    iconW: 124,
    iconH: 122,
    iconFrameH: ICON_FRAME_H_ROW1,
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
    iconW: 118,
    iconH: 122,
    iconFrameH: ICON_FRAME_H_ROW1,
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
    iconW: 111,
    iconH: 131,
    iconFrameH: ICON_FRAME_H_ROW2,
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
    iconW: 131,
    iconH: 131,
    iconFrameH: ICON_FRAME_H_ROW2,
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
      {/* 상단 divider — mission과 공유 */}
      <HatchedDivider className="pt-[var(--spacing-0)]" />

      {/* sr-only 섹션 제목 (시각적으로 숨기지만 h2 구조 유지) */}
      <h2 id="about-values-title" className="sr-only">
        ESG실천네트워크 4가지 핵심 가치
      </h2>

      {/* 2x2 그리드 — 좌 centerX=714, 우 centerX=1205 (canvas center 960 대칭)
          좌 우 카드 간 중심 거리 491px, 행 gap 66px.
          카드 폭은 설명 ~400px 기준으로 고정(420px) — centerX 정렬에 필요. */}
      <div className="flex flex-col items-center gap-[53px] pt-[85px] pb-[64px]">
        {/* 2행 — 각 행은 flex-row로 2카드 배치 */}
        {[0, 2].map((rowStart) => (
          <div
            key={rowStart}
            className="flex flex-row justify-center gap-[71px]"
          >
            {VALUES.slice(rowStart, rowStart + 2).map((v) => (
              <div
                key={v.title}
                className="flex w-[420px] justify-center"
              >
                <ValueCard
                  icon={v.icon}
                  iconW={v.iconW}
                  iconH={v.iconH}
                  iconFrameH={v.iconFrameH}
                  iconAlt={v.iconAlt}
                  title={v.title}
                  description={v.description}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 하단 divider */}
      <HatchedDivider className="pb-[var(--spacing-0)]" />
    </section>
  );
}
