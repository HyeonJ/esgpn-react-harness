/**
 * main-gallery 헤딩 블록 (43:546) — eyebrow + main + sub.
 * `py-[24px]` + gap-[24px] center-aligned.
 */
export function GalleryHeading() {
  return (
    <div
      className="flex flex-col gap-[24px] items-center py-[24px] relative shrink-0 text-center w-full"
      data-node-id="43:546"
    >
      <div
        className="flex flex-col gap-[8px] items-center justify-center w-full"
        data-node-id="43:547"
      >
        <p
          className="text-[14px] text-[#c6cdcc] tracking-[-0.07px] whitespace-nowrap leading-[1.5]"
          data-node-id="43:548"
        >
          ESGPN Gallery
        </p>
        <p
          className="font-bold text-[48px] text-[#caeb69] leading-[56px] min-w-full w-[min-content]"
          data-node-id="43:549"
        >
          실천이 만든 변화의 순간들,
          <br aria-hidden="true" />
          ESPGN 아카이브
        </p>
      </div>
      <p
        className="text-[16px] text-white tracking-[-0.16px] leading-[1.5] w-full"
        data-node-id="43:550"
      >
        이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다.
        <br aria-hidden="true" />
        우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다.
      </p>
    </div>
  );
}
