import cityMidRight from "@/assets/main-programs-card2/city-mid-right.png";

/**
 * 우측 중간 city 타일 (Figma 252:1068 "Rectangle 23").
 * 직립 (회전 없음). AABB = native = 315×351.
 */
export function FloatingCityMidRight() {
  return (
    <img
      src={cityMidRight}
      alt=""
      aria-hidden="true"
      className="absolute block"
      style={{ left: 948, top: 454, width: 315, height: 351 }}
      data-node-id="252:1068"
    />
  );
}
