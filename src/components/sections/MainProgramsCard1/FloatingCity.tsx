import cityRight from "@/assets/main-programs-card1/city-right.png";

/**
 * 우측 도시 타일 (Figma 252:1014 "Rectangle 19").
 * 캔버스 x=861 y=125 w=555 h=680 @ rounded-[40px] cover.
 */
export function FloatingCity() {
  return (
    <div
      className="absolute rounded-[40px] overflow-hidden"
      style={{ left: 861, top: 125, width: 555, height: 680 }}
      data-node-id="252:1014"
    >
      <img
        src={cityRight}
        alt=""
        aria-hidden="true"
        className="block w-full h-full object-cover"
      />
    </div>
  );
}
