/**
 * CapabilityCard — 자격검정 Benefits 섹션 카드 (177.6×180).
 *
 * v4 구조: article + p + 데코 img. flex 전용 + absolute 1개 (badge만).
 * - 80×80 녹색 일러스트 아이콘 (Card 5는 이미지 없음 → #d9d9d9 placeholder div)
 * - 14M 본문 2줄 (튜플) or 단일 줄 (string)
 * - 24×24 번호 배지 top-left -4px offset (absolute 불가피)
 * - Card 2 아이콘: mix-blend-multiply 옵션
 *
 * 색: bg-gray-100 (#EFF0F0 토큰), 본문 black, placeholder #d9d9d9.
 * 배지/아이콘 alt="" → 데코 aria-hidden.
 */
export function CapabilityCard({
  badge,
  icon,
  iconAlt = "",
  iconBlendMultiply = false,
  text,
}: {
  badge: string;
  icon?: string;
  iconAlt?: string;
  iconBlendMultiply?: boolean;
  text: string | readonly [string, string];
}) {
  return (
    <article className="relative flex h-[180px] w-[177.6px] flex-col items-center justify-center gap-3 rounded-[20px] bg-gray-100 px-4 pb-3 pt-4">
      {icon ? (
        <img
          src={icon}
          alt={iconAlt}
          aria-hidden={iconAlt === "" ? true : undefined}
          className={`block size-[80px] shrink-0 rounded-[16px] object-cover${
            iconBlendMultiply ? " mix-blend-multiply" : ""
          }`}
        />
      ) : (
        <div
          aria-hidden
          className="block size-[80px] shrink-0 rounded-[16px] bg-[#d9d9d9]"
        />
      )}
      <p
        className="w-full text-center text-[14px] font-medium leading-[1.5] tracking-[-0.5px] text-black"
        style={{ fontFamily: "var(--font-family-pretendard)" }}
      >
        {Array.isArray(text) ? (
          <>
            {text[0]}
            <br />
            {text[1]}
          </>
        ) : (
          text
        )}
      </p>
      <img
        src={badge}
        alt=""
        aria-hidden
        className="absolute left-[-4px] top-[-4px] block size-6"
      />
    </article>
  );
}
