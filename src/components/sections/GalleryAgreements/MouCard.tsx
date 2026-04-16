/**
 * MouCard — MOU 체결식 카드 (이미지 + 기관명/날짜 + 설명).
 *
 * Figma 314:7062 / 7067 / 7134 / 7139 (456×452 동일 구조).
 * - 이미지 456×302 (object-cover)
 * - 텍스트 블록: pt-24 gap-5, center 정렬
 *   - 기관명 + 날짜: Pretendard SemiBold 24 / LH 33.6 / center
 *   - 설명: Pretendard Regular 14 / LH 21 / LS 0.28 / center
 *
 * 로컬 컴포넌트 — gallery-activities 구현 후 승격 검토.
 * 구조 일치 시 `src/components/ui/MouCard.tsx` 로 이동 (Rule of Three 3/3).
 */
export type MouCardProps = {
  image: string;
  alt: string;
  /** 기관 정보 1줄 (Figma hard break 이전) */
  institutionLine1: string;
  /**
   * 기관 정보 2줄의 날짜 이전 부분 (비어 있을 수 있음).
   * 예) 카드 1: "㈜소프트퍼즐 ", 카드 2: ""
   */
  institutionLine2Prefix: string;
  /** 표시용 날짜 포맷 "2025. 8. 5." (괄호 포함 "(2025. 8. 5.)") */
  dateDisplay: string;
  /** ISO "YYYY-MM-DD" (for <time datetime>) */
  dateIso: string;
  /** 설명 1줄 */
  descriptionLine1: string;
  /** 설명 2줄 */
  descriptionLine2: string;
  nodeId?: string;
};

export function MouCard({
  image,
  alt,
  institutionLine1,
  institutionLine2Prefix,
  dateDisplay,
  dateIso,
  descriptionLine1,
  descriptionLine2,
  nodeId,
}: MouCardProps) {
  return (
    <article
      className="flex w-[456px] flex-col"
      data-node-id={nodeId}
    >
      <div className="h-[302px] w-[456px] overflow-hidden">
        <img
          src={image}
          alt={alt}
          width={456}
          height={302}
          className="block h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-col items-center gap-[16px] pt-[24px]">
        <p
          className="w-full text-center font-semibold text-[#1d2623]"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: 24,
            lineHeight: "33.6px",
          }}
        >
          {institutionLine1}
          <br />
          {institutionLine2Prefix}
          <time dateTime={dateIso}>{dateDisplay}</time>
        </p>
        <p
          className="text-center font-normal text-[#1d2623]"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: 14,
            lineHeight: "21px",
            letterSpacing: "0.28px",
          }}
        >
          {descriptionLine1}
          <br />
          {descriptionLine2}
        </p>
      </div>
    </article>
  );
}
