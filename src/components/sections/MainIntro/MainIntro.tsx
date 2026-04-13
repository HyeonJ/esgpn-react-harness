import { IntroLeftColumn } from "./IntroLeftColumn";
import { IntroGlobeGroup } from "./IntroGlobeGroup";

/**
 * 메인페이지 Intro 섹션.
 * Figma 노드: 26:272 (Frame 2042062940), 1920×1040, 풀폭 white BG.
 *
 * 구조: root flex (gap 63, items-center justify-center, px 252, py 200)
 *   - 좌측 컬럼 716×545 (인디케이터 + 헤딩 + 사업 3행)
 *   - 우측 globe 그룹 640×633 (absolute 자식 9개)
 */
export function MainIntro() {
  return (
    <section
      className="relative w-[1920px] h-[1040px] mx-auto bg-white overflow-hidden flex items-center justify-center"
      style={{ paddingLeft: 252, paddingRight: 252, paddingTop: 200, paddingBottom: 200, gap: 63 }}
      aria-label="ESGPN 소개 인트로"
    >
      <IntroLeftColumn />
      <IntroGlobeGroup />
    </section>
  );
}

export default MainIntro;
