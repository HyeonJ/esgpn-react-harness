import type { ReactNode } from "react";

export interface MouCardProps {
  imageUrl: string;
  imageAlt: string;
  title: ReactNode;        // \n 포함 → whitespace-pre-line
  description: ReactNode;  // 선행 공백 보존 → whitespace-pre
}

/**
 * MOU(업무 협약) 카드. gallery-agreements 섹션 로컬 컴포넌트.
 * Rule of Three: 1회차 도입 — activities 진행 시 ui/ 승격 검토.
 *
 * - 카드 폭 456 / 이미지 302 / rounded 24
 * - 텍스트 색 #1d2623 (Gray 900)
 * - description은 Figma 원본 선행 공백 보존을 위해 whitespace-pre 사용
 */
export function MouCard({ imageUrl, imageAlt, title, description }: MouCardProps) {
  return (
    <div className="flex w-[456px] flex-col gap-[24px]">
      <div className="h-[302px] w-full overflow-hidden rounded-[24px]">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-[16px] text-center text-[#1d2623]">
        <p className="whitespace-pre-line text-[24px] font-semibold leading-[1.4]">
          {title}
        </p>
        <p className="whitespace-pre text-[14px] font-normal leading-[1.5] tracking-[0.28px]">
          {description}
        </p>
      </div>
    </div>
  );
}
