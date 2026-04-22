import { IntroGlobeLabel } from "./IntroGlobeLabel";

import globeImg from "@/assets/main-intro/globe.png";
import connectorVec4 from "@/assets/main-intro/connector-vec4.svg";
import connectorVec5 from "@/assets/main-intro/connector-vec5.svg";
import connectorVec6 from "@/assets/main-intro/connector-vec6.svg";
import connectorVec7 from "@/assets/main-intro/connector-vec7.svg";

/**
 * Right-side globe group: globe image + 4 labels + 4 connector SVGs.
 *
 * v4: Uses CSS grid (single-cell overlay) for positioning children.
 * Each child is placed via grid-area: 1/1 + margin offsets.
 * Globe crop uses positioned img for overflow clip.
 * Connector SVG insets use negative margin to avoid extra wrappers.
 */
export function IntroGlobeGroup() {
  /* All children in a single 640x633 grid cell, self-positioned via margin */
  const gridChild = "col-start-1 row-start-1 self-start justify-self-start";

  return (
    <div
      className="grid shrink-0"
      style={{ width: 640, height: 633, gridTemplateColumns: "640px", gridTemplateRows: "633px" }}
      aria-label="ESGPN 4대 영역: 교육, 자격, 참여, 사회공헌"
      role="img"
    >
      {/* Globe image -- cropped raster via Framelink cropTransform */}
      <div
        className={`${gridChild} overflow-hidden relative`}
        style={{ marginLeft: 220.01, marginTop: 85.52, width: 419.99, height: 404.95 }}
      >
        <img
          alt="ESG 글로벌 네트워크를 상징하는 지구 이미지"
          src={globeImg}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Label: 교육 (top-right) */}
      <div className={gridChild} style={{ marginLeft: 80.38, marginTop: 0 }}>
        <IntroGlobeLabel
          title="교육"
          body={<>ESG 개념부터 실무까지 체계적인<br aria-hidden="true" />교육 프로그램을 제공합니다</>}
        />
      </div>

      {/* Label: 자격 (left) */}
      <div className={gridChild} style={{ marginLeft: 0, marginTop: 185 }}>
        <IntroGlobeLabel
          title="자격"
          body={<>실천할 수 있는 사람을 인증하는<br aria-hidden="true" />ESG마인드 자격검정</>}
        />
      </div>

      {/* Label: 참여 (left-lower) */}
      <div className={gridChild} style={{ marginLeft: 0, marginTop: 370 }}>
        <IntroGlobeLabel
          title="참여"
          body={<>대학, 청년, 기업이 함께하는<br aria-hidden="true" />ESG프로젝트 플랫폼</>}
        />
      </div>

      {/* Label: 사회공헌 (bottom-right) */}
      <div className={gridChild} style={{ marginLeft: 80.38, marginTop: 555 }}>
        <IntroGlobeLabel
          title="사회공헌"
          body={<>일회성이 아닌 지속가능한<br aria-hidden="true" />사회공헌 활동 실천</>}
        />
      </div>

      {/* Connector: Vec7 -> 교육 — Figma 26:269 top=15.
          SVG 파일 자체가 이미 post-flip(최종 시각 방향, 원이 좌상단)이라 CSS flip 불필요.
          Figma의 -scale-y-100 wrapper = Figma 내부에서 SVG export 시 이미 적용된 상태. */}
      <div
        className={gridChild}
        style={{ marginLeft: 278.3, marginTop: 15, width: 199.94, height: 109 }}
      >
        <img alt="" className="block max-w-none" src={connectorVec7}
          style={{ width: "calc(100% + 3.17%)", height: "calc(100% + 5.81%)", margin: "-0.92% 0 0 -2.67%" }} />
      </div>

      {/* Connector: Vec6 -> 자격 — Figma 26:268 top=199. SVG pre-flipped. */}
      <div
        className={gridChild}
        style={{ marginLeft: 197.93, marginTop: 199, width: 74.35, height: 37 }}
      >
        <img alt="" className="block max-w-none" src={connectorVec6}
          style={{ width: "calc(100% + 8.52%)", height: "calc(100% + 17.11%)", margin: "-2.7% 0 0 -7.17%" }} />
      </div>

      {/* Connector: Vec5 -> 참여 (left-lower curve) */}
      <div
        className={gridChild}
        style={{ marginLeft: 197.93, marginTop: 344, width: 63.3, height: 39 }}
      >
        <img alt="" className="block max-w-none" src={connectorVec5}
          style={{ width: "calc(100% + 10.01%)", height: "calc(100% + 16.24%)", margin: "-2.56% 0 0 -8.43%" }} />
      </div>

      {/* Connector: Vec4 -> 사회공헌 (bottom-right curve) */}
      <div
        className={gridChild}
        style={{ marginLeft: 278.3, marginTop: 464, width: 152.21, height: 105 }}
      >
        <img alt="" className="block max-w-none" src={connectorVec4}
          style={{ width: "calc(100% + 4.16%)", height: "calc(100% + 6.03%)", margin: "-0.95% 0 0 -3.5%" }} />
      </div>
    </div>
  );
}
