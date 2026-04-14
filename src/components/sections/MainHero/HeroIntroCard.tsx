import type { ReactNode } from "react";

export interface HeroIntroCardProps {
  icon: string;
  iconAlt?: string;
  /** 아이콘 mix-blend-mode — Figma 17:200/17:203: lighten, 17:206: screen */
  iconBlend: "lighten" | "screen";
  title: string;
  description: ReactNode;
  /** Figma 카드 rotation: -4, 0, +4 deg */
  rotation: number;
  /** 접근성/SEO 한 줄 요약 (AriaLabel) — 현 prop 유지해 MainHero가 변경 최소화 */
  alt?: string;
}

/**
 * Hero 3 카드 중 하나 — T-001 리팩터 (v3).
 *
 * 이전: 카드 전체 composite PNG (card1/2/3.png)를 `<img>`로 렌더.
 *   → 텍스트 baked-in raster 안티패턴 (G6 FAIL). SEO·i18n·접근성 파괴.
 *
 * 현재: HTML 카드 본체 + leaf 아이콘 nodeId PNG.
 *   - Figma 17:200/203/206 design_context 그대로:
 *     backdrop-blur-[8px] bg-rgba(0,0,0,0.12) rounded-[32px] p-24
 *     col gap-24 items-center justify-end
 *     icon 140×140 (mix-blend-lighten 또는 screen)
 *     title 24 Bold white
 *     description 15 Regular white (3 lines)
 *   - rotation은 wrapper div에 CSS로 적용 (Framelink PNG baked-in 아님)
 *
 * 리서치 근거: docs/research/dev/figma-transparent-icon-export (자식 leaf nodeId로 투명 PNG export).
 */
export function HeroIntroCard({
  icon,
  iconAlt = "",
  iconBlend,
  title,
  description,
  rotation,
  alt,
}: HeroIntroCardProps) {
  return (
    <article
      aria-label={alt ?? title}
      className="relative flex h-[340px] w-[320px] flex-col items-center justify-end gap-[24px] overflow-clip rounded-[32px] p-[24px] text-center text-white"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
      }}
    >
      <div
        className="shrink-0 overflow-hidden"
        style={{
          width: 140,
          height: 140,
          mixBlendMode: iconBlend,
        }}
      >
        <img
          src={icon}
          alt={iconAlt}
          aria-hidden={iconAlt === "" ? true : undefined}
          className="block h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div
        className="flex w-full flex-col items-center gap-[12px]"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <h3
          className="w-full font-bold"
          style={{ fontSize: 24, lineHeight: "32px", letterSpacing: 0 }}
        >
          {title}
        </h3>
        <p
          className="w-full font-normal"
          style={{ fontSize: 15, lineHeight: "24px", letterSpacing: 0 }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
