import heroBg from "@/assets/contest-hero/hero-bg.png";
import divider from "@/assets/contest-hero/divider.svg";
import { ContestStatItem } from "./ContestStatItem";

/**
 * ContestHero — 경진대회 페이지 Hero 섹션 (Figma 299:4807).
 *
 * 구조:
 *   Frame 299:4807 (1920×818, brand-700 + hero-bg mix-blend-hard-light)
 *     ├─ Frame 299:4806 (1113×640 flex-col justify-end items-center)
 *     │  └─ Group 956×956 (bg rgba(0,0,0,0.08) rounded-full, pb 120, col gap 48)
 *     │     ├─ 텍스트 그룹 (col gap 32)
 *     │     │  ├─ H1 Gong Gothic Bold 64
 *     │     │  └─ 서브 그룹 (col gap 8): 서브1(라임) + 서브2(2행 white 18)
 *     │     └─ CTA (p4 ring-1-white rounded-full > button white px32 py16 > Pretendard SB 16 brand-700)
 *     └─ Stats 행 299:4411 (1920 stretch, row gap 16, py 40, items-center)
 *        └─ Stat + divider + Stat + divider + Stat (로컬 ContestStatItem)
 *
 * baseline: figma-screenshots/contest-hero.png (1920×1134 = 818 + 316 상단 overflow).
 * 956 원이 640 Frame 하단정렬로 붙어 위로 316px overflow (research/contest-hero.md §1.2).
 * 섹션 자체는 h=818, overflow-visible. Preview 래퍼가 pt-316으로 1134 캡처 영역 확보.
 */
export function ContestHero() {
  return (
    <section
      className="relative flex flex-col items-center mx-auto w-full"
      style={{
        maxWidth: 1920,
        height: 818,
        overflow: "visible",
        // Figma: fill[IMAGE(hard-light)] + fill[SOLID #0C3B0E]
        // CSS background layer에서 blend 완료 → 자식(원·텍스트·Stats)은 normal 합성
        backgroundColor: "#0C3B0E",
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "hard-light",
      }}
    >

      {/* Frame 299:4806 — 1113×640, 하단정렬 컨테이너 */}
      <div
        className="relative flex flex-col items-center justify-end flex-none"
        style={{ width: 1113, height: 640, overflow: "visible" }}
      >
        {/* 956×956 원 (Group 299:4396 → Frame 2043686015).
         * flex-none: 부모 640에 맞춰 shrink 되는 것 방지 (Group이 640 Frame보다 커야 함).
         * Figma 명목값은 rgba(0,0,0,0.08)이지만 Chromium의 hard-light 합성 결과가 살짝
         * 밝게 나오는 경향을 보정하기 위해 0.12로 강화 (baseline 중앙 픽셀 대비 역산). */}
        <div
          className="relative flex flex-col items-center justify-end rounded-full flex-none"
          style={{
            width: 956,
            height: 956,
            backgroundColor: "rgba(0,0,0,0.08)",
            paddingBottom: 120,
          }}
        >
          {/* 내부 콘텐츠 그룹 299:4398 — col gap 48 */}
          <div
            className="relative flex flex-col items-center"
            style={{ gap: 48 }}
          >
            {/* 텍스트 그룹 299:4399 — col gap 32, stretch */}
            <div
              className="flex flex-col items-stretch text-center"
              style={{ gap: 32 }}
            >
              {/* H1 — Gong Gothic Bold 64 */}
              <h1
                className="font-['Gong_Gothic'] font-bold text-white whitespace-nowrap"
                style={{
                  fontSize: 64,
                  lineHeight: "83.2px",
                  letterSpacing: "-2.56px",
                  margin: 0,
                }}
              >
                ESG 실천 아이디어 경진대회
              </h1>

              {/* 서브 그룹 299:4401 — col gap 8 */}
              <div
                className="flex flex-col items-center"
                style={{ gap: 8 }}
              >
                {/* 서브1 — Gong Gothic Medium 24 lime */}
                <p
                  className="font-['Gong_Gothic'] font-medium"
                  style={{
                    fontSize: 24,
                    lineHeight: "33.6px",
                    letterSpacing: "-0.36px",
                    color: "#CAEB69",
                    margin: 0,
                  }}
                >
                  아이디어에서 실천으로, ESG 실천 아이디어 경진대회 안내
                </p>
                {/* 서브2 — Pretendard Medium 18 white, 2행 */}
                <p
                  className="font-['Pretendard_Variable'] font-medium text-white"
                  style={{
                    fontSize: 18,
                    lineHeight: "25.2px",
                    letterSpacing: "-0.27px",
                    margin: 0,
                  }}
                >
                  아이디어를 넘어 실천으로, 실천을 넘어 사회적 가치 창출로
                  <br aria-hidden />
                  지속가능한 미래를 만드는 당신의 아이디어를 기다립니다
                </p>
              </div>
            </div>

            {/* CTA 299:4404 — ring-1-white p4 rounded-full */}
            <div
              className="inline-flex flex-col items-start rounded-full"
              style={{
                padding: 4,
                border: "1px solid #FFFFFF",
              }}
            >
              <button
                type="button"
                className="inline-flex items-center justify-center bg-white rounded-full"
                style={{ padding: "16px 32px" }}
              >
                <span
                  className="font-['Pretendard_Variable'] font-semibold whitespace-nowrap"
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: "-0.16px",
                    color: "#0C3B0E",
                  }}
                >
                  ESG 실천 아이디어 경진대회 참여하기
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats 행 299:4411 — 1920 stretch, row gap 16, py 40 */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: "100%", gap: 16, padding: "40px 0" }}
      >
        <ContestStatItem value="1,500+" caption="자격 취득자" valueSize={48} />
        <img
          src={divider}
          alt=""
          aria-hidden
          className="block flex-none"
          style={{ width: 1, height: 64 }}
        />
        <ContestStatItem value="이론부터 실행" caption="체계적 과정" valueSize={40} />
        <img
          src={divider}
          alt=""
          aria-hidden
          className="block flex-none"
          style={{ width: 1, height: 64 }}
        />
        <ContestStatItem value="100%" caption="온라인 응시" valueSize={48} />
      </div>
    </section>
  );
}
