import { Header } from "@/components/layout/Header";

/**
 * __preview/header — G1 픽셀 비교용 격리 라우트.
 * 배경은 흰색으로 고정 (mix-blend-luminosity / backdrop-blur 효과의 일관성 확보).
 * compare-section.sh header 가 이 라우트를 캡처해서 baseline PNG와 비교한다.
 */
export function HeaderPreview() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
    </div>
  );
}
