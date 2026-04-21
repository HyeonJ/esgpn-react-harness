import { HatchedDivider } from "@/components/ui/HatchedDivider";
import panorama from "@/assets/about-vision/panorama.png";

/**
 * AboutVision — About 페이지 네 번째(마지막) 섹션 "비전 선언".
 *
 * v4 원칙:
 * - flex-col 단일 컬럼 (positioning=static only, no floating elements)
 * - 디자인 토큰 참조 (gray-000, gray-900, spacing-4, pretendard)
 * - 시맨틱 HTML: section + h2(sr-only) + p × 2 + figure
 * - 파노라마는 page 배경 이미지(`fill_3XE07A`)의 하단 가시 영역을
 *   baseline PNG에서 crop한 단일 에셋 (Figma flatten — 재생성 불가)
 *
 * Figma source: 52:624 (About 페이지 frame), 89:1276 (텍스트 블록 frame).
 * design_context 확정 스펙:
 *   본문:   Text-base/16R   — 16px Regular, lh 1.5, tracking -0.16px (-1%)
 *   감사:   Text-lg/18B     — 18px Bold,    lh 1.4, tracking -0.27px (-1.5%)
 *   gap:    16px (layout_KRZ5I8)
 *   color:  Gray 900 (#1d2623)
 *
 * Baseline: figma-screenshots/about-vision.png (1920×783, about-full에서 crop).
 */
export function AboutVision() {
  return (
    <section
      className="mx-auto flex w-full max-w-[1920px] flex-col bg-white"
      aria-labelledby="about-vision-title"
    >
      {/* 상단 divider (F-010 top-only 규칙) */}
      <HatchedDivider className="my-[56px]" />

      {/* sr-only 제목 — semantic 구조 확보 */}
      <h2 id="about-vision-title" className="sr-only">
        ESGPN 비전 선언
      </h2>

      {/* 텍스트 블록 — 중앙정렬, gap 16px (Figma layout_KRZ5I8).
          V5-9 적용: pt-65/pb-8 시각 추정 제거. divider my-56 + parent 구조로 spacing 처리. */}
      <div className="flex flex-col items-center gap-[var(--spacing-4)]">
        <p
          className="whitespace-nowrap text-center text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-[var(--color-gray-900)]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          ESG실천네트워크는 여러분의 든든한 파트너로서, 청년이 주체가 되고 사회가 함께 성장하며
          <br />더 지속가능한 내일을 만들어가는 여정을 이어가겠습니다.
        </p>
        <p
          className="whitespace-nowrap text-center text-[18px] font-bold leading-[18px] tracking-[-0.27px] text-[var(--color-gray-900)]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          감사합니다.
        </p>
      </div>

      {/* 파노라마 — 자연+도시 배경 (풀블리드, 섹션 하단).
          crop y=2172..2800 (baseline 실측 panorama top edge) → 1920×628. */}
      <figure className="m-0">
        <img
          src={panorama}
          alt=""
          width={1920}
          height={628}
          className="block h-auto w-full"
          aria-hidden="true"
        />
      </figure>
    </section>
  );
}
