import { Footer } from "@/components/layout/Footer";

/**
 * __preview/footer — G1 픽셀 비교용 격리 라우트.
 * Footer는 1920×708 풀폭이므로 clip 없이 fullPage 캡처.
 * 페이지 최상단부터 Footer만 렌더 (상단 여백 0).
 */
export function FooterPreview() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Footer />
    </div>
  );
}
