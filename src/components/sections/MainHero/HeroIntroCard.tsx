export interface HeroIntroCardProps {
  cardImage: string;
  /** Figma 노드의 정확한 width/height. 소수점 포함 (docs/section-implementation.md §2.4) */
  width: number;
  height: number;
  /** 접근성 최소 유지용 한 줄 요약 */
  alt: string;
}

/**
 * Hero 3개 카드 중 하나.
 *
 * Framelink `download_figma_images`는 회전 포함된 bounding box PNG를 반환한다
 * (Card 1/3은 PNG 내부에 이미 ±4° 기울기가 굽혀 들어가 있음).
 * 따라서 CSS에서 추가 rotate() 적용 금지 — 이중 회전 유발.
 * 대신 PNG를 Figma 노드의 정확한 bounding-box 크기(소수점)로 그대로 렌더한다.
 */
export function HeroIntroCard({ cardImage, width, height, alt }: HeroIntroCardProps) {
  return (
    <img
      src={cardImage}
      alt={alt}
      className="block shrink-0 select-none"
      style={{ width: `${width}px`, height: `${height}px` }}
      draggable={false}
    />
  );
}
