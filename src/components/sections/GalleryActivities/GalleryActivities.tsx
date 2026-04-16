import { MouCard } from "@/components/ui/MouCard";
import { HatchedInlineDecor } from "../GalleryAgreements/HatchedInlineDecor";
import awardCard from "@/assets/gallery-activities/award-card.png";

/**
 * GalleryActivities — /gallery 페이지 "관련 활동 및 수상" 섹션 (Figma 314:7103).
 *
 * 구조:
 *  - 섹션 자기정렬 `mx-auto w-[936px]` (페이지 컨텐츠 폭 936)
 *  - 헤딩 바: h2 "관련 활동 및 수상" (16/500/LH24/LS -0.16) + 실선 + 6 tick 데코
 *  - 단일 수상 카드 중앙정렬 (456×431 총높이, image 302 + text 105 + gap 24)
 *
 * v4 원칙:
 *  - 텍스트 전부 HTML literal (composite PNG 금지)
 *  - 이미지는 leaf nodeId(314:7128)로 개별 export된 912×604 2x PNG (composite fill이지만 text 없음)
 *  - MouCard 공통 승격 완료 (`src/components/ui/MouCard.tsx`)
 *
 * Baseline: `figma-screenshots/gallery-activities.png` (937×519).
 * clip (preview, 1920 viewport): --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 519
 */
export function GalleryActivities() {
  return (
    <section
      aria-labelledby="gallery-activities-heading"
      className="mx-auto flex w-full max-w-[1920px] justify-center bg-gray-000"
      data-node-id="314:7103"
    >
      <div className="flex w-[936px] flex-col items-center gap-[24px] pb-[40px]">
        <div
          className="flex w-full items-center gap-[8px]"
          data-node-id="314:7104"
        >
          <h2
            id="gallery-activities-heading"
            className="shrink-0 whitespace-nowrap text-black"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "-0.16px",
            }}
            data-node-id="314:7105"
          >
            관련 활동 및 수상
          </h2>
          <HatchedInlineDecor />
        </div>
        <div
          className="flex w-full justify-center"
          data-node-id="314:7126"
        >
          <MouCard
            image={awardCard}
            alt=""
            institutionLine1="COLiVE_한국ESG대상 수상"
            institutionLine2Prefix=""
            dateDisplay="(2023.12.26.)"
            dateIso="2023-12-26"
            descriptionLine1="사회공헌부문 단체"
            nodeId="314:7127"
          />
        </div>
      </div>
    </section>
  );
}
