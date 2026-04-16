/**
 * BulletCard — 연회색 배경 카드 (20SB 제목 + 12×12 녹색 원 불릿 3개).
 *
 * v4: article + h3 + ul + li 시맨틱. flex 전용.
 * 색: bg-gray-100 (#EFF0F0), 원 bg-brand-500 (#4FB654), 제목 #0A0A0A, 텍스트 #1E2939.
 */
export function BulletCard({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <article className="flex h-[196px] flex-1 flex-col gap-5 rounded-[20px] bg-gray-100 p-6">
      <h3
        className="text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-[#0A0A0A]"
        style={{ fontFamily: "var(--font-family-pretendard)" }}
      >
        {title}
      </h3>
      <ul className="flex w-[246px] flex-col gap-3">
        {items.map((text) => (
          <li key={text} className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block size-3 shrink-0 rounded-full bg-brand-500"
            />
            <span
              className="whitespace-nowrap text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-[#1E2939]"
              style={{ fontFamily: "var(--font-family-pretendard)" }}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
