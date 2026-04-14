import cityRight from "@/assets/main-programs-card3/city-right.png";

/**
 * 우측 city 타일 (Figma 252:1122 "Rectangle 19"), upright.
 * AABB (1058, 100, 358, 390). 단순 absolute img.
 */
export function FloatingCityRight() {
  return (
    <img
      src={cityRight}
      alt=""
      aria-hidden="true"
      className="absolute block"
      style={{ left: 1058, top: 100, width: 358, height: 390 }}
      data-node-id="252:1122"
    />
  );
}
