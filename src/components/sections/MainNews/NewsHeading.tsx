/**
 * Left heading block -- eyebrow + title (48B) + body paragraph.
 * Semantic: <header> with <h2> for section heading.
 */
export function NewsHeading() {
  return (
    <header
      className="flex flex-col gap-[var(--spacing-6)] items-start justify-center py-[var(--spacing-6)] w-[576px] shrink-0"
      data-node-id="40:1329"
    >
      <div className="flex flex-col gap-[var(--spacing-2)] items-start w-full">
        <p className="font-normal text-[14px] leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-500)]">
          ESGPN 뉴스룸
        </p>
        <h2 className="font-bold text-[48px] leading-[56px] text-[var(--color-gray-900)] w-full">
          지속 가능한 내일을 설계하는
          <br />
          ESGPN 뉴스룸
        </h2>
      </div>
      <p className="font-normal text-[16px] leading-[1.5] tracking-[-0.16px] text-[var(--color-gray-900)] w-full">
        뉴스 이상의 가치를 발견하세요. 실질적인 변화를 이끌어낼 수 있는
        <br />
        인사이트와 지식이 당신의 성장을 든든하게 뒷받침합니다.
      </p>
    </header>
  );
}
