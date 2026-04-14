import { HatchedDivider } from "@/components/ui/HatchedDivider";

/**
 * HatchedSectionHeading — 40×40 아이콘 + 제목 + HatchedDivider 조합.
 * 공통 컴포넌트 (contest-about 302:4978, contest-benefits 302:5068 확정 재사용 — Q1 승인, Rule of Three 예외).
 *
 * 구조 (Figma 302:4978 기준):
 *   col gap=21
 *     row gap=12 items-center : img 40×40 + h2 32B
 *     HatchedDivider (기존 932×10 재사용)
 *
 * props 시그니처:
 *   icon     : 이미지 URL (40×40 PNG 또는 SVG)
 *   iconAlt  : a11y alt (빈 문자열이면 장식용 aria-hidden)
 *   title    : 제목 텍스트
 *   titleSize: default 32 (px) — Benefits 섹션이 다른 크기 쓸 경우 override
 *   titleId  : <h2> id (aria-labelledby 용도)
 *   className: 섹션 wrapper에 덧댈 클래스
 */
export interface HatchedSectionHeadingProps {
  icon: string;
  iconAlt?: string;
  title: string;
  titleSize?: number;
  titleId?: string;
  className?: string;
}

export function HatchedSectionHeading({
  icon,
  iconAlt = "",
  title,
  titleSize = 32,
  titleId,
  className = "",
}: HatchedSectionHeadingProps) {
  // title 폰트 메트릭 (Figma Text-3xl/32B): lineHeight 1.3em, letter-spacing -3%
  const ls = -(titleSize * 0.03);
  return (
    <div className={`flex flex-col items-stretch gap-[21px] ${className}`}>
      <div className="flex items-center gap-3">
        <img
          src={icon}
          alt={iconAlt}
          aria-hidden={iconAlt === "" ? true : undefined}
          className="block size-[40px] shrink-0 object-cover"
        />
        <h2
          id={titleId}
          className="whitespace-nowrap font-bold text-[#0a0a0a]"
          style={{
            fontSize: `${titleSize}px`,
            lineHeight: 1.3,
            letterSpacing: `${ls}px`,
          }}
        >
          {title}
        </h2>
      </div>
      <HatchedDivider className="w-full" />
    </div>
  );
}
