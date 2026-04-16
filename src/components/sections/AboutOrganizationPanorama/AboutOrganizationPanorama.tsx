import panorama from "@/assets/about-vision/panorama.png";

/**
 * AboutOrganizationPanorama — About 조직도 페이지 4번째(마지막) 섹션 "자연+도시 파노라마".
 *
 * v4 원칙:
 * - 시맨틱 HTML: section + h2(sr-only) + figure > img
 * - 디자인 토큰: bg-white, 레이아웃 util (mx-auto, w-full, max-w, flex-col)
 * - absolute/file = 1 (panorama crop offset) → v4 기준 ≤5 충족
 * - JSX literal 한국어 (G8): "ESGPN 자연과 도시의 공존 비전"
 *
 * 에셋 재사용:
 * - `@/assets/about-vision/panorama.png` (1920×628 RGBA, vision 섹션과 동일 원본)
 * - research §3 픽셀 비교 결과: organization panorama = vision panorama y=48..488 crop
 *   (offset 스캔 mean_abs_diff 최소값 2.79 @ offset=48)
 *
 * 레이아웃:
 *   wrapper: 1920×440 overflow-hidden
 *   img: 1920×628, top -48px (vision y=48 → section y=0 정렬)
 *   하단 140 px (628-48-440)는 overflow-hidden으로 자연 clip
 *
 * Figma source: 89:1295 flatten (전용 노드 없음, baseline PNG crop 기반).
 * Baseline: figma-screenshots/about-organization-panorama.png (1920×440, from full.png y=880..1320).
 */
export function AboutOrganizationPanorama() {
  return (
    <section
      aria-labelledby="about-organization-panorama-title"
      className="relative mx-auto flex h-[440px] w-full max-w-[1920px] flex-col overflow-hidden bg-[var(--color-gray-000)]"
    >
      <h2
        id="about-organization-panorama-title"
        className="sr-only text-[var(--color-gray-900)]"
      >
        ESGPN 자연과 도시의 공존 비전
      </h2>
      <figure className="relative m-0 h-full w-full">
        <img
          src={panorama}
          alt=""
          aria-hidden="true"
          width={1920}
          height={628}
          className="absolute left-0 top-[-45px] block h-[628px] w-full"
        />
      </figure>
    </section>
  );
}
