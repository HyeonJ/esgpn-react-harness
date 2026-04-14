import cityBottomLeft from "@/assets/main-programs-card3/city-bottom-left.png";

/**
 * 좌하 city 타일 (Figma 252:1120 "Rectangle 19"), upright.
 * AABB (256, 594, 195, 211). 단순 absolute img.
 */
export function FloatingCityBottomLeft() {
  return (
    <img
      src={cityBottomLeft}
      alt=""
      aria-hidden="true"
      className="absolute block"
      style={{ left: 256, top: 594, width: 195, height: 211 }}
      data-node-id="252:1120"
    />
  );
}
