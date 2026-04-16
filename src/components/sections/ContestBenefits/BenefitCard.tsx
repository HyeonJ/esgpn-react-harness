/**
 * BenefitCard — 경진대회 Benefits 섹션 카드 (304×203).
 *
 * v4 구조: article + h3 + p 시맨틱. flex 전용 (positioning 최소화).
 * - 80px 녹색 일러스트 아이콘 (iconAlt="" → 장식 aria-hidden)
 * - 18SB 제목 (Pretendard 600 18 / 1.4em / -1.5% / center)
 * - 14M 2줄 설명 (Figma `\L` → `<br />` 튜플 방식)
 *
 * 색: bg-gray-100 (#EFF0F0 토큰), 제목 #0A0A0A, 설명 #4A5565 (토큰 없음 raw).
 */
export function BenefitCard({
  icon,
  iconAlt = "",
  title,
  lines,
}: {
  icon: string;
  iconAlt?: string;
  title: string;
  lines: readonly [string, string];
}) {
  return (
    <article className="flex w-[304px] flex-col items-center justify-center gap-4 rounded-[20px] bg-gray-100 p-4">
      <img
        src={icon}
        alt={iconAlt}
        aria-hidden={iconAlt === "" ? true : undefined}
        className="block size-[80px] shrink-0 object-contain"
      />
      <div className="flex w-full flex-col items-stretch gap-2">
        <h3
          className="text-center text-[18px] font-semibold leading-[1.4] tracking-[-0.27px] text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          {title}
        </h3>
        <p
          className="text-center text-[14px] font-medium leading-[1.5] tracking-[-0.07px] text-[#4A5565]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          {lines[0]}
          <br />
          {lines[1]}
        </p>
      </div>
    </article>
  );
}
