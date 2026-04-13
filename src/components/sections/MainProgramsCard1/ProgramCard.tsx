import { CardHeader } from "./CardHeader";
import { CardChecklist3 } from "./CardChecklist3";
import { CardCompetencies } from "./CardCompetencies";
import { CardCtaBar } from "./CardCtaBar";
import dividerDashed from "@/assets/main-programs-card1/divider-dashed.svg";

/**
 * ProgramCard (로컬, Figma 252:1015 "Frame 12" outer).
 * outer: #0c3b0e rounded-[48px] pt-8 pb-16 px-8 flex-col gap-12 w-616 h-732
 * inner white: rounded-[48px] p-40 w-600 h-620 flex-col gap-48
 * divider: 600×0 absolute inset -1px 0 → img 2px dasharray
 * cta: 연두 bar
 *
 * Rule of Three: card2·3에서 반복 시 공통화 평가 (현재는 섹션 로컬).
 */
export function ProgramCard() {
  return (
    <div
      className="absolute flex flex-col rounded-[48px]"
      style={{
        left: 400,
        top: 0,
        width: 616,
        height: 732,
        backgroundColor: "#0c3b0e",
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        gap: 12,
      }}
      data-node-id="252:1015"
    >
      {/* inner white card */}
      <div
        className="flex flex-col rounded-[48px] bg-white"
        style={{
          width: 600,
          height: 620,
          padding: 40,
          gap: 48,
        }}
        data-node-id="252:1016"
      >
        <CardHeader />
        <CardChecklist3 />
        <CardCompetencies />
      </div>

      {/* dashed divider — Figma Frame 252:1056 w=600 h=0, 좌우 12px inset */}
      <div
        className="relative shrink-0"
        style={{ width: 600, height: 0, paddingLeft: 12, paddingRight: 12 }}
        data-node-id="252:1056"
      >
        <div className="absolute" style={{ left: 12, right: 12, top: -1, bottom: -1 }}>
          <img
            src={dividerDashed}
            alt=""
            aria-hidden="true"
            className="block"
            style={{ width: "100%", height: 2 }}
          />
        </div>
      </div>

      <CardCtaBar />
    </div>
  );
}
