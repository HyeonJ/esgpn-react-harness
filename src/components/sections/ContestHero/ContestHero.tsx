import heroBg from "@/assets/contest-hero/hero-bg.png";
import divider from "@/assets/contest-hero/divider.svg";
import { ContestStatItem } from "./ContestStatItem";

/**
 * Contest Hero section — /contest 페이지 최상단.
 * Figma node 299:4807 (1920×818). 자식 노드 트리 기반 HTML 재구성.
 *
 * 구성:
 *   - Root <section>: brand-700 배경 + hero 사진 mix-blend-hard-light 합성
 *   - 원형 래퍼 (956×956, rgba(0,0,0,0.08)) — 상단 316px overflow (956 - 640)
 *   - 제목 Gong Gothic Bold 64 / 서브 라임·흰 2줄 / CTA 흰 버튼
 *   - Stats 행: 1,500+ | 이론부터 실행 | 100%
 *
 * 논리 높이 818px (Figma frame), CSS overflow-visible로 원 상단을 노출한다.
 * Preview/baseline은 overflow 포함 1920×1134로 캡처된다.
 */
export function ContestHero() {
  return (
    <section
      aria-labelledby="contest-hero-title"
      className="relative mx-auto flex h-[818px] w-full max-w-[1920px] flex-col items-center bg-brand-700"
    >
      {/* 배경 사진 — mix-blend-hard-light로 brand-700 솔리드 위에 합성 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-hard-light"
      >
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* 상단 콘텐츠 영역 (Frame 17, 1113×640, justify-end로 원을 하단 정렬) */}
      <div className="relative flex h-[640px] w-[1113px] flex-none flex-col items-center justify-end">
        {/* 큰 원 — 956×956, Frame 17 하단에 붙고 위로 316px overflow */}
        <div
          className="flex h-[956px] w-[956px] flex-col items-center justify-end rounded-full bg-black/[0.08] pb-[120px]"
        >
          {/* 내부 콘텐츠 그룹 (299:4398) — col gap 48 */}
          <div className="flex flex-col items-center gap-12">
            {/* 텍스트 그룹 (299:4399) — col gap 32 */}
            <div className="flex flex-col items-stretch gap-8 text-center">
              <h1
                id="contest-hero-title"
                className="font-bold text-gray-000 whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-family-gong-gothic)",
                  fontSize: 64,
                  lineHeight: 1.3,
                  letterSpacing: "-2.56px",
                }}
              >
                ESG 실천 아이디어 경진대회
              </h1>

              {/* 서브 그룹 (299:4401) — col gap 8 */}
              <div className="flex flex-col items-center gap-2 text-center">
                <p
                  className="font-medium"
                  style={{
                    fontFamily: "var(--font-family-gong-gothic)",
                    fontSize: 24,
                    lineHeight: 1.4,
                    letterSpacing: "-0.36px",
                    color: "#CAEB69",
                  }}
                >
                  아이디어에서 실천으로, ESG 실천 아이디어 경진대회 안내
                </p>
                <p
                  className="text-gray-000 whitespace-nowrap"
                  style={{
                    fontSize: "var(--text-lg-18m-size)",
                    fontWeight: "var(--text-lg-18m-weight)" as unknown as number,
                    lineHeight: "var(--text-lg-18m-line-height)",
                    letterSpacing: "var(--text-lg-18m-letter-spacing)",
                  }}
                >
                  아이디어를 넘어 실천으로, 실천을 넘어 사회적 가치 창출로
                  <br aria-hidden />
                  지속가능한 미래를 만드는 당신의 아이디어를 기다립니다
                </p>
              </div>
            </div>

            {/* CTA 버튼 — 흰 pill + 외곽 ring */}
            <div className="inline-flex rounded-full border border-gray-000 p-1">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-gray-000 px-8 py-4"
              >
                <span
                  className="font-semibold whitespace-nowrap text-brand-700"
                  style={{
                    fontSize: "var(--text-base-16sb-size)",
                    lineHeight: "var(--text-base-16sb-line-height)",
                    letterSpacing: "var(--text-base-16sb-letter-spacing)",
                  }}
                >
                  ESG 실천 아이디어 경진대회 참여하기
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats 행 (299:4411) — 1920 풀폭, py 40, row gap 16 */}
      <div className="relative flex w-full items-center justify-center gap-4 py-10">
        <ContestStatItem value="1,500+" caption="자격 취득자" valueSize={48} />
        <img
          src={divider}
          alt=""
          aria-hidden
          className="block h-16 w-px flex-none"
        />
        <ContestStatItem
          value="이론부터 실행"
          caption="체계적 과정"
          valueSize={40}
        />
        <img
          src={divider}
          alt=""
          aria-hidden
          className="block h-16 w-px flex-none"
        />
        <ContestStatItem value="100%" caption="온라인 응시" valueSize={48} />
      </div>
    </section>
  );
}
