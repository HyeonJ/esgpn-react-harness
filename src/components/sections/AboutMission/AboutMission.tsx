import { HatchedDivider } from "@/components/ui/HatchedDivider";
import photoLarge from "@/assets/about-mission/photo-large.png";
import photoSmall from "@/assets/about-mission/photo-small.png";

/**
 * AboutMission — About 페이지 두 번째 섹션 "ESGPN 미션".
 *
 * v4 원칙:
 * - flex 기반 레이아웃 (absolute는 사진 overlap 1곳만)
 * - 디자인 토큰 참조 (brand-500, gray-900, spacing-*, text-base-16r-*)
 * - 시맨틱 HTML: section, h2, p, figure
 * - 모든 텍스트는 HTML (zero raster text)
 *
 * v1~v3 만성염증 (magic 32/file, abs 5/file) 타겟. 이번 v4에서 구조 회복.
 *
 * Figma source: About 페이지 52:622 내부 y=542..1295 영역 (flatten 이미지에서 재구성).
 * Baseline: figma-screenshots/about-mission.png (1920×754, about-full.png에서 crop).
 */
export function AboutMission() {
  return (
    <section
      className="mx-auto flex flex-col w-full max-w-[1920px] bg-gray-000"
      aria-labelledby="about-mission-title"
    >
      {/* 상단 divider */}
      <HatchedDivider className="pt-[var(--spacing-0)]" />

      {/* 본문: 텍스트 → 대 이미지 → 소 이미지 세로 스택 (Figma 86:1163 구조) */}
      <div className="flex flex-col px-[492px] pt-[66px] pb-[71px]">
        {/* 텍스트 블록 (상단) */}
        <div className="flex flex-col gap-[32px] w-[936px] mb-[-71px]">
          <h2
            id="about-mission-title"
            className="font-bold leading-[1.4] tracking-[-0.6px]"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: 24,
            }}
          >
            <span className="text-[var(--color-brand-500)]">
              ESG실천네트워크(ESGPN)
            </span>
            <span className="text-[var(--color-gray-900)]">
              를
              <br />
              방문해주신 여러분을 진심으로 환영합니다.
            </span>
          </h2>

          <div className="flex flex-col gap-[24px]">
            <p
              className="text-[var(--color-gray-900)] whitespace-pre-line"
              style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "-0.16px" }}
            >
              <span className="font-bold text-[var(--color-brand-500)]">
                ESG실천네트워크
              </span>
              는 &apos;행동으로 구현하는 지속가능성&apos;이라는 가치를 중심에 두고,
              {"\n"}ESG를 단순한 기업의 평가 기준을 넘어 사회 구성원 모두의 행동 기준으로 확산시키기 위해 설립되었습니다.
              {"\n"}대학, 학회, 산업체, 그리고 지역사회가 서로 손을 잡고 실천의 목소리를 모을 때 더 큰 사회적 가치가 창출되듯,
              {"\n"}우리는 교육과 참여를 바탕으로 건강한 ESG 실천 문화를 만들어가고자 합니다.
            </p>

            <p
              className="text-[var(--color-gray-900)] whitespace-pre-line"
              style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "-0.16px" }}
            >
              ESG실천네트워크는 지속가능성이 단순한 &apos;선언&apos;에 그치지 않고 &apos;교육과 실천의 축적&apos;으로
              {"\n"}완성될 수 있도록 돕는 전문 연대 플랫폼으로서, 다음과 같은 가치를 목표로 하고 있습니다.
            </p>
          </div>
        </div>

        {/* 이미지 그룹 (하단) — 대 우측 / 소 중앙, 소가 대의 좌측 아래 겹침 */}
        <div className="flex flex-col pb-[87px] w-[936px]">
          {/* 대 이미지 — 우측 정렬, 아래로 -87px overlap */}
          <figure className="flex items-center justify-end w-full mb-[-87px]">
            <img
              src={photoLarge}
              alt="ESGPN 활동 현장 — 도시 전경"
              className="size-[360px] rounded-[32px] object-cover"
            />
          </figure>
          {/* 소 이미지 — 중앙 정렬 */}
          <figure className="flex items-center justify-center w-full">
            <img
              src={photoSmall}
              alt="ESGPN 활동 현장 — 자연 속 손"
              className="size-[162px] rounded-[32px] object-cover"
            />
          </figure>
        </div>
      </div>

      {/* 하단 divider */}
      <HatchedDivider className="pb-[var(--spacing-0)]" />
    </section>
  );
}
