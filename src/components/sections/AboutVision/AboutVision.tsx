import panorama from "@/assets/about-vision/panorama.png";

/**
 * AboutVision — /about 페이지 네 번째(마지막) 섹션.
 * research/about-vision.md, plan/about-vision.md 기반.
 * baseline: figma-screenshots/about-vision.png (1920×783).
 * 레이아웃: 본문 3줄(중앙정렬, 16/24, #1d2623) + 하단 파노라마(1920×631 RGBA).
 */
export function AboutVision() {
  return (
    <section className="relative w-[1920px] h-[783px] bg-white overflow-hidden mx-auto">
      {/* 본문 텍스트 — 3행 중앙정렬 */}
      <div className="absolute left-0 right-0 top-[65px] text-center text-[16px] leading-[24px] text-[var(--color-gray-900)]">
        <p className="whitespace-nowrap">
          ESG실천네트워크는 여러분의 든든한 파트너로서, 청년이 주체가 되고 사회가 함께 성장하며
          <br />더 지속가능한 내일을 만들어가는 여정을 이어가겠습니다.
        </p>
        <p className="mt-[24px] font-bold whitespace-nowrap">감사합니다.</p>
      </div>

      {/* 파노라마 배경 이미지 — 풀블리드 하단 (y=152) */}
      <img
        src={panorama}
        alt=""
        width={1920}
        height={631}
        className="absolute left-0 top-[152px] block"
      />
    </section>
  );
}
