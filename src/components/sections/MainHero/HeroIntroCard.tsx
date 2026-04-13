export interface HeroIntroCardProps {
  rotationDeg: -4 | 0 | 4;
  /** Figma 카드 부모 노드 통째 raster export. 텍스트/아이콘/블러 배경 포함 평탄 이미지. */
  cardImage: string;
  /** 접근성 최소 유지용 한 줄 요약 */
  alt: string;
}

/**
 * Hero 3개 카드 중 하나.
 *
 * 회차 5 접근 전환: 카드 전체를 Figma 부모 노드로 raster export한 PNG를 <img> 한 장으로 렌더.
 * 기존 DOM 합성(backdrop-blur, progress-bar, 체크리스트, 텍스트, 아이콘) 모두 제거.
 *
 * 이유: 회차 1~4에서 backdrop-blur 브라우저 합성 차이 + Yeseva/Pretendard 글리프 hint 차이
 * 로 G1 diff 5.98% 고정. 평탄 raster로 해당 source of divergence 제거.
 *
 * 트레이드오프:
 *   - 접근성: 카드 내부 텍스트가 img alt 한 줄로 축약 → 최소 의미 유지
 *   - 반응형 유연성: 현재 1920 고정 레이아웃이므로 문제 없음
 *   - 파일 크기: 카드 3장 합 ~? KB (plan §8에 기록)
 *
 * 카드 외곽 크기는 Figma와 동일하게 유지해야 G2 치수 통과.
 *   - Card 1 (회전 -4°), Card 3 (회전 +4°): wrapper 342.938×361.494
 *   - Card 2 (회전 0°): 320×340
 * img는 카드 표시 사이즈로 축소(2x PNG 사용).
 */
export function HeroIntroCard({ rotationDeg, cardImage, alt }: HeroIntroCardProps) {
  // 회전 카드는 wrapper가 회전 후 잘림 방지용으로 크지만, 실제 시각 카드는 320×340.
  const isRotated = rotationDeg !== 0;
  const wrapperWidth = isRotated ? 343 : 320;
  const wrapperHeight = isRotated ? 361 : 340;

  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{ width: `${wrapperWidth}px`, height: `${wrapperHeight}px` }}
    >
      <img
        src={cardImage}
        alt={alt}
        width={320}
        height={340}
        className="block w-[320px] h-[340px] select-none"
        style={{
          transform: isRotated ? `rotate(${rotationDeg}deg)` : undefined,
          transformOrigin: "center center",
        }}
        draggable={false}
      />
    </div>
  );
}
