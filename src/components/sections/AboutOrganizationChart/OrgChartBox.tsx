/**
 * OrgChartBox — 조직도 트리의 단일 박스.
 * variants:
 *   - pill:    Tier 2-1 (COLIVE) 녹색 pill-shape (#4FB654, 흰 텍스트, rounded-[25px])
 *   - primary: Tier 2-2/2-3 검정그린 박스 (#0C3B0E, 흰 텍스트, rounded-[10px])
 *   - ghost:   Tier 3 라이트 그레이 박스 (#EFF0F0, #1D2623 텍스트, rounded-[6px])
 *
 * 공통: w=302, Tier2 h=50 / Tier3 h=57은 호출부 className으로 제어.
 * 폰트: Pretendard, 15px, Tier2 Bold (700), Tier3 Medium (500) 초기값 (측정 후 조정).
 */

type Variant = "pill" | "primary" | "ghost";

const VARIANT_STYLES: Record<Variant, string> = {
  pill: "bg-[#4FB654] text-white rounded-[25px] font-bold",
  primary: "bg-[#0C3B0E] text-white rounded-[10px] font-bold",
  ghost: "bg-[#EFF0F0] text-[#1D2623] rounded-[6px] font-medium",
};

export function OrgChartBox({
  label,
  variant,
  className = "",
}: {
  label: string;
  variant: Variant;
  className?: string;
}) {
  return (
    <div
      className={`w-[302px] flex items-center justify-center text-[15px] tracking-[-0.02em] leading-[1] whitespace-nowrap ${VARIANT_STYLES[variant]} ${className}`}
    >
      {label}
    </div>
  );
}

export default OrgChartBox;
