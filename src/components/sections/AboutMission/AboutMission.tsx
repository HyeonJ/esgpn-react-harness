import photoLarge from "@/assets/about-mission/photo-large.png";
import photoSmall from "@/assets/about-mission/photo-small.png";
import { HatchedDivider } from "./HatchedDivider";

/**
 * AboutMission — /about 페이지 Mission 섹션.
 * research/about-mission.md, plan/about-mission.md 기반.
 * baseline: figma-screenshots/about-mission.png (1920×754).
 */
export function AboutMission() {
  return (
    <section className="relative w-[1920px] h-[754px] bg-white mx-auto">
      {/* 상단 divider */}
      <HatchedDivider className="absolute top-0 left-1/2 -translate-x-1/2" />

      {/* 좌측 텍스트 블록 */}
      <div className="absolute left-[493px] top-[68px]">
        <h2 className="text-[28px] leading-[33px] font-bold tracking-[-0.02em] m-0">
          <span className="text-[#4FB654]">ESG실천네트워크(ESGPN)</span>
          <span className="text-[#1d2623]">를</span>
          <br />
          <span className="text-[#1d2623]">방문해주신 여러분을 진심으로 환영합니다.</span>
        </h2>

        <p className="mt-[41px] w-[577px] text-[16px] leading-[24px] text-[#1d2623] font-normal m-0">
          <span className="font-semibold text-[#4FB654]">ESG실천네트워크</span>는 '행동으로 구현하는 지속가능성'이라는 가치를 중심에 두고,<br />
          ESG를 단순한 기업의 평가 기준을 넘어 사회 구성원 모두의 행동 기준으로 확산시키기 위해<br />
          설립되었습니다. 대학, 학회, 산업체, 그리고 지역사회가 서로 손을 잡고 실천의 목소리를 모을 때<br />
          더 큰 사회적 가치가 창출되듯, 우리는 교육과 참여를 바탕으로 건강한 ESG 실천 문화를<br />
          만들어가고자 합니다.
        </p>

        <p className="mt-[33px] w-[577px] text-[16px] leading-[24px] text-[#1d2623] font-normal m-0">
          <span className="font-semibold text-[#4FB654]">ESG실천네트워크</span>는 지속가능성이 단순한 '선언'에 그치지 않고 '교육과 실천의 축적'으로<br />
          완성될 수 있도록 돕는 전문 연대 플랫폼으로서, 다음과 같은 가치를 목표로 하고 있습니다.
        </p>
      </div>

      {/* 우측 사진 — large가 먼저(뒤), small이 나중(앞) */}
      <img
        src={photoLarge}
        alt=""
        className="absolute left-[1070px] top-[258px] w-[357px] h-[359px] rounded-[30px] object-cover"
      />
      <img
        src={photoSmall}
        alt=""
        className="absolute left-[887px] top-[531px] w-[145px] h-[161px] rounded-[20px] object-cover"
      />

      {/* 하단 divider */}
      <HatchedDivider className="absolute bottom-0 left-1/2 -translate-x-1/2" />
    </section>
  );
}
