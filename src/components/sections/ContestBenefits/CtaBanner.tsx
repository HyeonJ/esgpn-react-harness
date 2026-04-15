import ctaBg from "@/assets/contest-benefits/cta-bg.png";
import ctaArrow from "@/assets/contest-benefits/cta-arrow.png";

/**
 * CtaBanner — contest-benefits 하단 "지금 바로 신청하세요" (Figma 302:6592).
 *
 * T-002 리팩터 (v3):
 *   이전: cta-composite.png 단일 PNG (텍스트+버튼+배경 모두 baked-in) = text-bearing raster 안티패턴
 *   현재: bg(#005c33) + city image mix-blend-luminosity + HTML 텍스트/버튼
 *
 * 리서치 근거: docs/research/dev/figma-transparent-icon-export §3 Q5 (하이브리드 G1 5~7% 수용)
 * 엔진 차이: Chromium mix-blend-luminosity vs Figma 합성. 잔여 diff는 ACCEPTED 패턴.
 */
export function CtaBanner() {
  return (
    <div
      className="relative h-[320px] w-[936px] overflow-clip rounded-[20px]"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      {/* 배경 1: 녹색 solid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[20px]"
        style={{ backgroundColor: "#005c33" }}
      />
      {/* 배경 2: 도시 이미지 mix-blend-luminosity (이미지 전체를 container에 fit) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-[20px]"
        style={{ mixBlendMode: "luminosity" }}
      >
        <img
          src={ctaBg}
          alt=""
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
        />
      </div>

      {/* 텍스트 블록 */}
      <div className="relative flex w-[454px] flex-col items-center gap-[12px] text-center">
        <h3
          className="w-full font-bold text-white"
          style={{ fontSize: 32, lineHeight: 1.3, letterSpacing: -0.96 }}
        >
          지금 바로 신청하세요
        </h3>
        <p
          className="whitespace-nowrap font-normal"
          style={{
            fontSize: 16,
            lineHeight: 1.5,
            letterSpacing: -0.16,
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요.
        </p>
      </div>

      {/* 버튼 */}
      <button
        type="button"
        aria-label="경진대회 참가하기"
        className="relative inline-flex items-center gap-[8px] rounded-full bg-white"
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 20,
          paddingBottom: 20,
          boxShadow: "0px 25px 50px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <span
          className="whitespace-nowrap font-bold"
          style={{
            fontFamily: '"Pretendard", "Inter", "Noto Sans KR", sans-serif',
            fontSize: 18,
            lineHeight: "28px",
            letterSpacing: -0.4395,
            color: "#0c3b0e",
          }}
        >
          경진대회 참가하기
        </span>
        <img
          src={ctaArrow}
          alt=""
          aria-hidden="true"
          className="block size-[24px]"
        />
      </button>
    </div>
  );
}
