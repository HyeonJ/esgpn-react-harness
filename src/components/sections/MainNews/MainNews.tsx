import { NewsHeading } from "./NewsHeading";
import { NewsList } from "./NewsList";
import bgPlantLeft from "@/assets/main-news/bg-plant-left.png";
import bgPlantRight from "@/assets/main-news/bg-plant-right.png";

/**
 * 메인페이지 News 섹션 (Figma 43:315 "Frame 2043685959", 1920×1040).
 *
 * 배경 `#f3f3f3` + 배경 장식 PNG 3개 (bg-plant-left 1개 + bg-plant-right 재사용 2개).
 * 배경 PNG는 Framelink 합성 사진이 아닌 MCP asset endpoint raster 원본이므로
 * Figma 수치 (left/top/width/height %)를 그대로 적용 — CSS rotate/blend 재적용 없음.
 *
 * 음수 width (`w-[-51.57%]`, `w-[-29.61%]`)는 Figma가 auto-layout 계산에서 이미지를 좌측으로
 * 확장시키는 표현. Tailwind arbitrary로 그대로 넣고 렌더가 깨지면 단계 6 폴백.
 *
 * Preview 라우트 외곽은 bg-white wrapper, 섹션 자체 `#f3f3f3`.
 */
interface MainNewsProps {
  className?: string;
}

export function MainNews({ className }: MainNewsProps) {
  const base =
    "relative w-full xl:h-[1040px] flex flex-col items-start justify-center px-6 md:px-12 xl:px-[252px] py-16 md:py-24 xl:py-[120px] overflow-visible xl:overflow-hidden";
  return (
    <section
      className={className ? `${base} ${className}` : base}
      aria-label="ESGPN 뉴스룸"
      data-node-id="43:315"
    >
      {/* 배경 레이어 — 아래 깔림, pointer-events 차단.
          Figma 음수 width (`w-[-51.57%]`)는 브라우저에서 무효이므로 scaleX(-1) flip + 양수 width로 변환.
          left는 오른쪽 끝 기준으로 재계산: newLeft = left + width (음수 w 기준)
          = 41.11 + (-51.57) = -10.46% → 이미지가 좌측 화면 바깥 일부터 시작해 우로 뻗음,
          그 다음 scaleX(-1)로 좌우 반전해 Figma와 동일한 시각 결과. */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f3f3f3] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute h-[70.16%] left-[-10.46%] max-w-none top-[47.91%] w-[51.57%] -scale-x-100"
            src={bgPlantLeft}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute h-[59.16%] left-[80.16%] max-w-none top-[61.94%] w-[42.53%]"
            src={bgPlantRight}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute h-[41.19%] left-[67.72%] max-w-none top-[83.85%] w-[29.61%] -scale-x-100"
            src={bgPlantRight}
          />
        </div>
      </div>

      {/* 콘텐츠 — 좌 헤딩 / 우 리스트 2열 (반응형: mobile 1열 stack) */}
      <div
        className="flex flex-col xl:flex-row flex-1 items-start xl:justify-between min-h-px min-w-px overflow-clip relative w-full gap-8 xl:gap-0"
        data-node-id="40:1420"
      >
        <NewsHeading />
        <NewsList />
      </div>
    </section>
  );
}
