import bgOverlayLeft from "@/assets/certification-flatten-bottom/bg-overlay-left.webp";
import bgOverlayRight from "@/assets/certification-flatten-bottom/bg-overlay-right.webp";
import bgNoise from "@/assets/certification-flatten-bottom/bg-noise.jpg";
import { ProcessBlock } from "./ProcessBlock";
import { ScheduleBlock } from "./ScheduleBlock";
import { CtaBlock } from "./CtaBlock";

/**
 * CertificationFlattenBottom — /certification 마지막 섹션 (Figma 299:4002, 1920×2148).
 *
 * v4 재설계:
 *  - v1~v3 판정 "단일 raster ACCEPTED T-008"는 잘못된 판정이었음.
 *    get_metadata는 자식 0 반환이지만 get_design_context는 전체 노드 트리 반환.
 *  - Phase 2에서 전략 (b) 노드 재탐색 성공 → HTML 재구성.
 *
 * 구조: section + 배경 3층 (overlay-left, overlay-right, noise multiply) + 3 sub-blocks.
 * 배경: #014527 solid + overlay-left mix-blend-overlay + overlay-right mix-blend-overlay + noise mix-blend-multiply.
 * absolute 배치: 배경 4레이어 (bg div + 3 image) — 불가피.
 *
 * 3 sub-blocks는 relative 흐름 + padding 기반 (absolute 아님):
 *   ProcessBlock: 응시방법 4단계 (heading + ol 4 steps)
 *   ScheduleBlock: 2026 시험 일정 (table 5행 + pagination)
 *   CtaBlock: 하단 CTA card (h-320, rounded, mix-blend-luminosity city bg)
 */
export function CertificationFlattenBottom() {
  return (
    <section
      aria-label="자격검정 응시 방법 및 일정"
      className="relative w-full overflow-hidden"
    >
      {/* 배경 4레이어 — absolute 불가피 */}
      <div aria-hidden className="absolute inset-0 bg-[#014527]" />
      <div aria-hidden className="absolute inset-0 overflow-hidden mix-blend-overlay">
        <img
          src={bgOverlayLeft}
          alt=""
          aria-hidden
          className="absolute left-[-24.99%] top-[62.11%] block h-[47.16%] w-[48.85%] max-w-none"
        />
      </div>
      <div aria-hidden className="absolute inset-0 overflow-hidden mix-blend-overlay">
        <img
          src={bgOverlayRight}
          alt=""
          aria-hidden
          className="absolute left-[70.55%] top-[44.58%] block h-[55.44%] w-[57.43%] max-w-none"
        />
      </div>
      <img
        aria-hidden
        src={bgNoise}
        alt=""
        className="absolute inset-0 block size-full max-w-none object-cover mix-blend-multiply"
      />

      {/* 콘텐츠 레이어 */}
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center gap-10 pb-[200px] pt-20"
        style={{ paddingLeft: "492px", paddingRight: "492px" }}
      >
        <ProcessBlock />
        <ScheduleBlock />
        <CtaBlock />
      </div>
    </section>
  );
}
