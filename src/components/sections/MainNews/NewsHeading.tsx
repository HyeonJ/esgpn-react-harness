/**
 * 좌측 576px 헤딩 블록: eyebrow + title(2줄) + body(2줄).
 */
export function NewsHeading() {
  return (
    <div
      className="flex flex-col gap-[24px] items-start justify-center py-[24px] shrink-0 w-full xl:w-[576px]"
      data-node-id="40:1329"
    >
      <div
        className="flex flex-col gap-[8px] items-start justify-center w-full"
        data-node-id="40:1330"
      >
        <p
          className="text-[14px] text-[#97a29e] tracking-[-0.07px] whitespace-nowrap leading-[1.5]"
          data-node-id="40:1331"
        >
          ESGPN 뉴스룸
        </p>
        <p
          className="font-bold text-[48px] text-[#1d2623] leading-[56px] min-w-full w-[min-content]"
          data-node-id="40:1332"
        >
          지속 가능한 내일을 설계하는
          <br aria-hidden="true" />
          ESGPN 뉴스룸
        </p>
      </div>
      <p
        className="text-[16px] text-[#1d2623] tracking-[-0.16px] leading-[1.5] w-full"
        data-node-id="40:1333"
      >
        뉴스 이상의 가치를 발견하세요. 실질적인 변화를 이끌어낼 수 있는
        <br aria-hidden="true" />
        인사이트와 지식이 당신의 성장을 든든하게 뒷받침합니다.
      </p>
    </div>
  );
}
