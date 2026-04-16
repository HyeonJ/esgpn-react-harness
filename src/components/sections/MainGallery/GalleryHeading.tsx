/**
 * Gallery heading block: eyebrow + main title + sub description.
 * All text is HTML -- zero raster text.
 * Colors: gray-300, #caeb69 (lime), white.
 */
export function GalleryHeading() {
  return (
    <div
      className="flex flex-col items-stretch gap-[var(--spacing-6)] py-[var(--spacing-6)]"
      data-node-id="43:546"
    >
      <div className="flex flex-col items-center justify-center gap-[var(--spacing-2)]">
        {/* Eyebrow */}
        <span
          className="text-[14px] font-normal leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-300)] text-center"
          data-node-id="43:548"
        >
          ESGPN Gallery
        </span>

        {/* Main heading */}
        <h2
          className="text-[48px] font-bold leading-[56px] text-[#caeb69] text-center whitespace-pre-line"
          data-node-id="43:549"
        >
          {"실천이 만든 변화의 순간들,\nESPGN 아카이브"}
        </h2>
      </div>

      {/* Sub description */}
      <p
        className="text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-[var(--color-gray-000)] text-center whitespace-pre-line"
        data-node-id="43:550"
      >
        {"이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다.\n우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다."}
      </p>
    </div>
  );
}
