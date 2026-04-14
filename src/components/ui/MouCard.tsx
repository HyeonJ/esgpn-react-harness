import type { CSSProperties, ReactNode } from "react";

/**
 * MouCard — 업무 협약 / 활동 / 수상 카드 패턴.
 * 456×(302+24+126) = 456×452 (agreements). description 길이에 따라 height 가변.
 *
 * 구조 (Figma 314:7062 기준):
 *   col gap=24 items-start w=456
 *     image 456×302 rounded-24
 *     col gap=16 items-center w=456
 *       title  (24px SemiBold, leading 1.4, center, color #1d2623)
 *       desc   (14px Regular, leading 1.5, tracking 0.28, center, color #1d2623)
 *
 * 사용처 (Rule of Three 충족 후 ui/ 승격):
 *  - gallery-agreements (4 카드)
 *  - gallery-activities (1 카드)
 */
export interface ImageCrop {
  /** % heights/widths and offsets from Figma 노드 데이터 */
  topPct: number;
  leftPct: number;
  widthPct: number;
  heightPct: number;
}

export interface MouCardProps {
  image: string;
  imageAlt: string;
  title: ReactNode;
  description: ReactNode;
  /** Figma 원본의 이미지 fill crop (생략 시 object-cover) */
  imageCrop?: ImageCrop;
}

export function MouCard({ image, imageAlt, title, description, imageCrop }: MouCardProps) {
  const imgStyle: CSSProperties | undefined = imageCrop
    ? {
        position: "absolute",
        top: `${imageCrop.topPct}%`,
        left: `${imageCrop.leftPct}%`,
        width: `${imageCrop.widthPct}%`,
        height: `${imageCrop.heightPct}%`,
        maxWidth: "none",
      }
    : undefined;
  return (
    <div className="flex w-[456px] flex-col items-start gap-[24px]">
      <div className="relative h-[302px] w-full overflow-hidden rounded-[24px]">
        {imageCrop ? (
          <img src={image} alt={imageAlt} style={imgStyle} className="block" />
        ) : (
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-[16px] text-center text-[#1d2623]">
        <p
          className="font-semibold"
          style={{ fontSize: 24, lineHeight: 1.4 }}
        >
          {title}
        </p>
        <p
          className="whitespace-pre-line font-normal"
          style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: 0.28 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
