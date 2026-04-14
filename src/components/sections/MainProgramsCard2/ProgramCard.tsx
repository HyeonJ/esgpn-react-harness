import { CardHeader } from "./CardHeader";
import { CardPoints } from "./CardPoints";
import { CardTargets } from "./CardTargets";
import { CardCtaBar } from "./CardCtaBar";
import dividerDashed from "@/assets/main-programs-card2/divider-dashed.svg";

/**
 * ProgramCard (로컬, Figma 252:1069 "Frame 12" outer).
 * outer: #0C173B rounded-[48px] pt-8 pb-16 px-8 flex-col gap-12 w-616 h-732
 * inner white: rounded-[48px] p-40 w-600 h-620 flex-col gap-48
 * divider: 600×0 absolute inset -1px 0 → img 2px dasharray (blue)
 * cta: 하늘 bar (#A5D9FF)
 *
 * Rule of Three: card3 워커 시점에 ProgramCard 공통화 승격 예정 (card1·2 로컬 유지).
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
        backgroundColor: "#0C173B",
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        gap: 12,
      }}
      data-node-id="252:1069"
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
        data-node-id="252:1070"
      >
        <CardHeader />
        <CardPoints />
        <CardTargets />
      </div>

      {/* dashed divider — Figma Frame 252:1110 w=600 h=0, 좌우 12px inset */}
      <div
        className="relative shrink-0"
        style={{ width: 600, height: 0, paddingLeft: 12, paddingRight: 12 }}
        data-node-id="252:1110"
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
