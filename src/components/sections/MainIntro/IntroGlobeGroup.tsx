import { IntroGlobeLabel } from "./IntroGlobeLabel";
import globeSrc from "@/assets/main-intro/globe.png";
import vec4Src from "@/assets/main-intro/connector-vec4.svg";
import vec5Src from "@/assets/main-intro/connector-vec5.svg";
import vec6Src from "@/assets/main-intro/connector-vec6.svg";
import vec7Src from "@/assets/main-intro/connector-vec7.svg";

/**
 * 우측 globe + 4 라벨 + 4 connector. relative 컨테이너 640×633.
 * 좌표는 캔버스 (Group 9 bbox x=1029.5 y=203.5) 기준 left/top.
 *
 * connector inset 보정값은 design_context 원본 그대로 — SVG 자체가 stroke 두께 때문에
 * Figma frame box 보다 약간 비어져 나오는데 음수 inset으로 그 부분을 다시 채움.
 */
export function IntroGlobeGroup() {
  return (
    <div className="relative flex-none" style={{ width: 640, height: 633 }}>
      {/* 라벨 4개 */}
      <IntroGlobeLabel
        title="교육"
        body={"ESG 개념부터 실무까지 체계적인\n교육 프로그램을 제공합니다"}
        left={80.376762390137}
        top={0}
      />
      <IntroGlobeLabel
        title="자격"
        body={"실천할 수 있는 사람을 인증하는\nESG마인드 자격검정"}
        left={0}
        top={185}
      />
      <IntroGlobeLabel
        title="참여"
        body={"대학, 청년, 기업이 함께하는\nESG프로젝트 플랫폼"}
        left={0}
        top={370}
      />
      <IntroGlobeLabel
        title="사회공헌"
        body={"일회성이 아닌 지속가능한\n사회공헌 활동 실천"}
        left={80.376762390137}
        top={555}
      />

      {/* globe — raster (cropTransform 적용된 779×751 PNG, 표시 419.99×404.95) */}
      <div
        className="absolute"
        style={{
          left: 220.014404296875,
          top: 85.524902343750,
          width: 419.9855041503906,
          height: 404.9502258300781,
        }}
        data-node-id="26:92"
      >
        <img
          src={globeSrc}
          alt=""
          aria-hidden="true"
          className="block select-none pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Connector Vec4 — bottom-right → 사회공헌 (152.21×105) */}
      <div
        className="absolute"
        style={{ left: 278.3, top: 464, width: 152.214, height: 105 }}
        data-node-id="26:266"
      >
        <div className="absolute" style={{ inset: "-0.95% -0.66% -5.08% -3.5%" }}>
          <img src={vec4Src} alt="" aria-hidden="true" className="block max-w-none w-full h-full" />
        </div>
      </div>

      {/* Connector Vec7 — top-right → 교육 (199.94×109). SVG 파일이 이미 디스플레이 방향으로 저장됨 → scaleY 제거 */}
      <div
        className="absolute"
        style={{ left: 278.3, top: 15, width: 199.937, height: 109 }}
        data-node-id="26:269"
      >
        <div className="absolute" style={{ inset: "-4.89% -0.5% -0.92% -2.67%" }}>
          <img src={vec7Src} alt="" aria-hidden="true" className="block max-w-none w-full h-full" />
        </div>
      </div>

      {/* Connector Vec5 — bottom-left → 참여 (63.30×39) */}
      <div
        className="absolute"
        style={{ left: 197.93, top: 344, width: 63.297, height: 39 }}
        data-node-id="26:267"
      >
        <div className="absolute" style={{ inset: "-2.56% -1.58% -13.68% -8.43%" }}>
          <img src={vec5Src} alt="" aria-hidden="true" className="block max-w-none w-full h-full" />
        </div>
      </div>

      {/* Connector Vec6 — top-left → 자격 (74.35×37). SVG 파일이 이미 디스플레이 방향으로 저장됨 → scaleY 제거. 위/아래 inset 스왑. */}
      <div
        className="absolute"
        style={{ left: 197.93, top: 199, width: 74.349, height: 37 }}
        data-node-id="26:268"
      >
        <div className="absolute" style={{ inset: "-14.41% -1.35% -2.7% -7.17%" }}>
          <img src={vec6Src} alt="" aria-hidden="true" className="block max-w-none w-full h-full" />
        </div>
      </div>
    </div>
  );
}
