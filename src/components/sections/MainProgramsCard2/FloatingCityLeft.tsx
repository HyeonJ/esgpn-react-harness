import cityLeftRendered from "@/assets/main-programs-card2/city-left-rendered.png";

/**
 * 좌측 큰 city 타일 (Figma 252:1067 "Rectangle 18").
 * Figma: AABB 530.209×578.029 @ x=0 y=168.81 (−16deg baked-in).
 * Framelink PNG: native 1015×1111 @2x = 507.5×555.5 (AABB보다 작음, 회전 후 내부 tile 크기).
 *
 * card1 3회차 교훈: Framelink는 AABB 기준 최종 렌더 합성본. CSS rotate 절대 금지.
 * wrapper=AABB + inner=native 크기 중앙 배치 패턴.
 */
export function FloatingCityLeft() {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: 0, top: 168.81, width: 530.209, height: 578.029 }}
      data-node-id="252:1067"
      data-floating="city-left"
    >
      <img
        src={cityLeftRendered}
        alt=""
        aria-hidden="true"
        className="block flex-none"
        style={{ width: 507.5, height: 555.5 }}
      />
    </div>
  );
}
