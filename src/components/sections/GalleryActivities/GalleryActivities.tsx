import awardImage from "@/assets/gallery-activities/award.png";
import { HatchedInlineHeading } from "@/components/ui/HatchedInlineHeading";
import { MouCard } from "@/components/ui/MouCard";

/**
 * GalleryActivities — 갤러리 페이지 "관련 활동 및 수상" 섹션.
 * Figma 314:7103, 936×519 (실측 baseline 937×519).
 *
 * 단일 MouCard (456 wide) 가운데 정렬. 추후 수상이 늘어나면 row gap 24로 추가.
 */
export function GalleryActivities() {
  return (
    <section
      aria-labelledby="gallery-activities-heading"
      className="mx-auto flex w-[936px] flex-col items-center gap-[24px] pb-[40px]"
    >
      <h2 id="gallery-activities-heading" className="sr-only">
        관련 활동 및 수상
      </h2>
      <HatchedInlineHeading title="관련 활동 및 수상" />
      <div className="flex w-full items-center justify-center">
        <MouCard
          image={awardImage}
          imageAlt="COLiVE 한국ESG대상 수상 현장 사진"
          title={
            <>
              COLiVE_한국ESG대상 수상
              <br />
              (2023.12.26.)
            </>
          }
          description={<>사회공헌부문 단체</>}
        />
      </div>
    </section>
  );
}
