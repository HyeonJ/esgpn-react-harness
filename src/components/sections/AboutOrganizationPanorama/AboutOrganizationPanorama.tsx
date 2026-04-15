import panorama from "@/assets/about-vision/panorama.png";

/**
 * AboutOrganizationPanorama — /about/organization 페이지 네 번째(마지막) 섹션.
 * research/about-organization-panorama.md, plan/about-organization-panorama.md 기반.
 * baseline: figma-screenshots/about-organization-panorama.png (1920×440).
 * 레이아웃: 풀블리드 파노라마 이미지(vision panorama 재사용, top -48px crop).
 */
export function AboutOrganizationPanorama() {
  return (
    <section className="relative max-w-[1920px] w-full h-[440px] bg-white overflow-hidden mx-auto">
      {/* 파노라마 배경 이미지 — vision 에셋 재사용, offset -48px (research §3.2) */}
      <img
        src={panorama}
        alt=""
        width={1920}
        height={631}
        className="absolute left-0 top-[-48px] block"
      />
    </section>
  );
}
