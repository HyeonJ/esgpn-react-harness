import cityTopRight from "@/assets/main-programs-card2/city-top-right.png";

/**
 * 우측 상단 작은 city 타일 (Figma 252:1118 "Rectangle 22").
 * 직립 (회전 없음). AABB = native = 185×193.
 */
export function FloatingCityTopRight() {
  return (
    <img
      src={cityTopRight}
      alt=""
      aria-hidden="true"
      className="absolute block"
      style={{ left: 1231, top: 218, width: 185, height: 193 }}
      data-node-id="252:1118"
    />
  );
}
