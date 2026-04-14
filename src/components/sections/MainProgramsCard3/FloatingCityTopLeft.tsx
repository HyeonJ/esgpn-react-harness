import cityLeftRotated from "@/assets/main-programs-card3/city-left-rotated.png";

/**
 * 좌상 city 타일 (Figma 252:1121 "Rectangle 18").
 * AABB: (0, 18, 360.228, 392.718) — -16deg baked-in 합성.
 * Framelink PNG native 720×785 (@2x of AABB).
 *
 * wrapper=AABB + inner=native 패턴 (card2 FloatingCityLeft와 동일).
 * CSS rotate/blend/bg 추가 금지.
 */
export function FloatingCityTopLeft() {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: 0, top: 18, width: 360.228, height: 392.718 }}
      data-node-id="252:1121"
      data-floating="city-top-left"
    >
      <img
        src={cityLeftRotated}
        alt=""
        aria-hidden="true"
        className="block flex-none"
        style={{ width: 360.228, height: 392.718 }}
      />
    </div>
  );
}
