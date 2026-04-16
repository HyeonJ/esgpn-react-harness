/**
 * MouCard — 갤러리 카드 공통 컴포넌트.
 *
 * 이미지(456×302, rounded 24) + 기관/제목 + 날짜 + (선택) 설명 블록.
 * Figma `/gallery` 페이지에서 5회 사용:
 *  - GalleryAgreements 4회 (업무 협약 카드)
 *  - GalleryActivities 1회 (수상 카드)
 *
 * props:
 *  - institutionLine1/Line2Prefix: 기관명 2줄 (Line2Prefix 뒤에 dateDisplay 붙음)
 *  - descriptionLine1: 설명 1줄 (필수)
 *  - descriptionLine2: 설명 2줄 (있을 때만 렌더, 없으면 단일줄 whitespace-nowrap)
 *
 * Figma spec:
 *  - 루트: flex col w-[456px] gap-24
 *  - image: h-302 w-456 rounded-24 overflow-hidden, <img> object-cover
 *  - text: flex col items-center gap-16
 *    - 기관/날짜: Pretendard 600 / 24 / LH 33.6 / center
 *    - 설명: Pretendard 400 / 14 / LH 21 / LS 0.28 / center
 */
export type MouCardProps = {
  image: string;
  alt: string;
  /** 기관 정보 1줄 (Figma hard break 이전) */
  institutionLine1: string;
  /**
   * 기관 정보 2줄의 날짜 이전 부분. 비어 있을 수 있음.
   * 예) "㈜소프트퍼즐 " 또는 "" (activities 카드는 빈 문자열)
   */
  institutionLine2Prefix: string;
  /** 표시용 날짜 포맷 — 예: "(2025. 8. 5.)" 또는 "(2023.12.26.)" */
  dateDisplay: string;
  /** ISO "YYYY-MM-DD" (for <time datetime>) */
  dateIso: string;
  /** 설명 1줄 (필수) */
  descriptionLine1: string;
  /** 설명 2줄 (선택). 없으면 whitespace-nowrap 단일줄 */
  descriptionLine2?: string;
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
  const hasSecondLine = Boolean(descriptionLine2);
  return (
    <article
      className="flex w-[456px] flex-col gap-[24px]"
      data-node-id={nodeId}
    >
      <div className="h-[302px] w-[456px] overflow-hidden rounded-[24px]">
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
      <div className="flex flex-col items-center gap-[16px]">
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
          className={
            hasSecondLine
              ? "text-center font-normal text-[#1d2623]"
              : "whitespace-nowrap text-center font-normal text-[#1d2623]"
          }
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: 14,
            lineHeight: "21px",
            letterSpacing: "0.28px",
          }}
        >
          {descriptionLine1}
          {hasSecondLine && (
            <>
              <br />
              {descriptionLine2}
            </>
          )}
        </p>
      </div>
    </article>
  );
}
