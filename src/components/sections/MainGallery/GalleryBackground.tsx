// 실제 파일 내용은 design_context 힌트와 반대:
//   bg-overlay.jpg  = 건물/언덕/잔디 실경 cityscape → luminosity 레이어 (% 배치)
//   bg-cityscape.jpg = 종이 질감 → multiply 레이어 (size-full)
// 시각 매칭 실증 (baseline vs capture):
//   - paper luminosity + cityscape multiply(object-cover) → diff 61.87%
//   - cityscape luminosity + paper multiply(size-full)     → diff 20.91%
// 후자가 baseline에 가깝다. 공식 research/plan 매핑이 반대였음을 시각으로 확정.
import bgCityscape from "@/assets/main-gallery/bg-overlay.png";
import bgMultiplyOverlay from "@/assets/main-gallery/bg-cityscape.jpg";

/**
 * main-gallery BG — 3 layer:
 *  1) solid `#0c3b0e` base
 *  2) cityscape JPG (MCP raw raster, imageRef 단독 다운로드) + mix-blend-luminosity
 *     — Figma design_context %수치 (left 0.17%, top 60.28%, w 99.65%, h 75.92%) 그대로 적용
 *  3) overlay JPG (raw) + object-cover + mix-blend-multiply
 *
 * §2.5 규칙은 "Framelink 합성 PNG에 blend 재적용 금지"인데, 이 두 이미지는
 * Figma imageRef 단독 다운로드 raw raster이므로 blend 적용 허용.
 * needsCropping cropTransform은 적용하지 않음 (raw JPEG 함정 회피).
 */
export function GalleryBackground() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <div className="absolute bg-[#0c3b0e] inset-0" />
      <div className="absolute inset-0 mix-blend-luminosity overflow-hidden">
        <img
          alt=""
          className="absolute h-[75.92%] left-[0.17%] max-w-none top-[60.28%] w-[99.65%]"
          src={bgCityscape}
        />
      </div>
      <img
        alt=""
        className="absolute inset-0 max-w-none mix-blend-multiply object-cover size-full"
        src={bgMultiplyOverlay}
      />
    </div>
  );
}
