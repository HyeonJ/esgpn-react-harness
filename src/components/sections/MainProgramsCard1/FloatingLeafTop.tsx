import leafTop from "@/assets/main-programs-card1/leaf-top.png";

/**
 * 좌상단 leaf 타일 (Figma 252:1065 "Rectangle 22").
 * Figma: 원본 140×140 @ −12deg → AABB 166.048×166.048.
 * R1 실증: Framelink PNG는 회전 baked-in 상태 (AABB 크기에 이미 회전 + blend + bg 합성 완료).
 * → CSS rotate/blend/bg 추가 금지. AABB 그대로 단일 <img>로 렌더.
 */
export function FloatingLeafTop() {
  // Figma metadata AABB: 166.048×166.048, but Framelink export native = 154.5×154.5 (309px @2x).
  // baseline 실측 bbox도 ~154×154 → Framelink가 실제 렌더된 크기로 내보냄.
  // 네이티브 크기로 렌더. 좌상단 고정 (top/left 소수점 유지).
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: 149.07, top: 53.94, width: 166.048, height: 166.048 }}
      data-node-id="252:1065"
      data-leaf="top"
    >
      <img
        src={leafTop}
        alt=""
        aria-hidden="true"
        className="block flex-none"
        style={{ width: 154.5, height: 154.5 }}
      />
    </div>
  );
}
