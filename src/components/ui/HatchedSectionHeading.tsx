import { HatchedDivider } from "./HatchedDivider";

/**
 * HatchedSectionHeading — 40px 아이콘 + 32B 제목 + HatchedDivider.
 *
 * v4 공통 컴포넌트 (Rule of Three 2/3 승격).
 * 사용처:
 *   - contest-about (302:4977) — 지구본 아이콘 + "ESG 실천 아이디어 경진대회란?"
 *   - contest-benefits (302:5068) — 지구본 아이콘 + "ESG 실천 아이디어 경진대회의 특별한 혜택"
 * 향후 페이지에서 동일 구조 재등장 시 그대로 사용.
 *
 * a11y: iconAlt=""이면 데코 아이콘 → aria-hidden.
 * 폰트: Pretendard Bold 32 / 1.3em / -3% (letterSpacing -0.96px).
 * 색: near-black #0A0A0A (토큰 없음, 프로젝트 합의).
 */
export function HatchedSectionHeading({
  iconSrc,
  iconAlt = "",
  title,
  titleId,
}: {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  titleId?: string;
}) {
  return (
    <div className="flex flex-col gap-[21px]">
      <div className="flex items-center gap-3">
        <img
          src={iconSrc}
          alt={iconAlt}
          aria-hidden={iconAlt === "" ? true : undefined}
          className="block size-10 shrink-0 object-contain"
        />
        <h2
          id={titleId}
          className="text-[32px] font-bold leading-[1.3] tracking-[-0.96px] text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          {title}
        </h2>
      </div>
      <HatchedDivider className="w-full" />
    </div>
  );
}
