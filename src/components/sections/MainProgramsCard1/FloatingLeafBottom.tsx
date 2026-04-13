import leafBottom from "@/assets/main-programs-card1/leaf-bottom.png";

/**
 * 좌하단 leaf 타일 (Figma 252:1064 "Rectangle 18").
 * Figma: 원본 163.788×191.441 @ −24deg → AABB 227.494×241.508.
 * R1 실증: Framelink PNG는 회전 baked-in 상태 (AABB 크기로 이미 회전된 이미지).
 * → CSS rotate 추가 금지 (main-hero 이중 회전 교훈). AABB 그대로 렌더.
 */
export function FloatingLeafBottom() {
  // Figma metadata AABB 227.494×241.508, Framelink export native = 202×216 (404×432 @2x).
  // 네이티브 크기로 렌더. baseline 실측 위치와 일치시키기 위해 left/top 조정 필요.
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: 0, top: 234.39, width: 227.494, height: 241.508 }}
      data-node-id="252:1064"
      data-leaf="bottom"
    >
      <img
        src={leafBottom}
        alt=""
        aria-hidden="true"
        className="block flex-none"
        style={{ width: 202, height: 216 }}
      />
    </div>
  );
}
