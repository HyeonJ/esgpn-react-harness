import { ReactNode } from "react";

/**
 * ValueCard — About Values 섹션의 4개 가치 카드 공통 레퍼런스.
 *
 * 구조: article > (icon frame > img) + h3 + p
 * - 시맨틱 HTML (article + h3) — 4개 카드 각각 독립 의미 단위
 * - flex-col items-center — absolute 없음 (v4 구조 회복)
 * - 아이콘은 고정 높이 프레임에 bottom 정렬 (행 내 아이콘 높이 편차 흡수)
 *
 * props:
 *  - icon: crop PNG import src
 *  - iconW/iconH: 아이콘 native 크기 (crop bbox 그대로)
 *  - iconAlt: a11y용 설명 ("" 허용 — 장식이면 빈 문자열)
 *  - title: 카드 제목 (h3)
 *  - description: 본문 (2줄, 컴포넌트 내부에서 <br> 수동 제어 위해 ReactNode 허용)
 */
type ValueCardProps = {
  icon: string;
  iconW: number;
  iconH: number;
  iconAlt: string;
  title: string;
  description: ReactNode;
  iconFrameH: number;
};

export function ValueCard({
  icon,
  iconW,
  iconH,
  iconAlt,
  title,
  description,
  iconFrameH,
}: ValueCardProps) {
  return (
    <article className="flex flex-col items-center text-center">
      {/* 아이콘 프레임 — 행 내 편차 흡수 위해 고정 높이 + bottom 정렬 */}
      <div
        className="flex items-end justify-center"
        style={{ height: iconFrameH }}
      >
        <img
          src={icon}
          alt={iconAlt}
          width={iconW}
          height={iconH}
          className="block"
        />
      </div>

      {/* 아이콘 → 제목 gap 33px */}
      <h3
        className="mt-[33px] font-bold text-[var(--color-gray-900)] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-family-pretendard)",
          fontSize: 22,
          lineHeight: "22px",
          letterSpacing: "-1px",
        }}
      >
        {title}
      </h3>

      {/* 제목 → 설명 gap 22px */}
      <p
        className="mt-[22px] text-[var(--color-gray-900)] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-family-pretendard)",
          fontSize: "var(--text-base-16r-size)",
          fontWeight: "var(--text-base-16r-weight)" as unknown as number,
          lineHeight: "24px",
          letterSpacing: "var(--text-base-16r-letter-spacing)",
        }}
      >
        {description}
      </p>
    </article>
  );
}
