/*
 * FontCalibration.tsx — Pretendard 한글 보정 비교용 고정 샘플 페이지.
 * Playwright가 이 페이지의 섹션 3개를 크롭하여 research/font-calibration/*-after.png 생성.
 */
const samples = [
  {
    id: "h1",
    labelKo: "디스플레이 48 Bold",
    css: {
      fontSize: "var(--text-display-01-size)",
      fontWeight: "var(--text-display-01-weight)" as unknown as number,
      lineHeight: "var(--text-display-01-line-height)",
      letterSpacing: "var(--text-display-01-letter-spacing)",
    } as const,
    text: "지속 가능한 내일을 함께",
  },
  {
    id: "body",
    labelKo: "본문 16 Regular",
    css: {
      fontSize: "var(--text-base-16r-size)",
      fontWeight: "var(--text-base-16r-weight)" as unknown as number,
      lineHeight: "var(--text-base-16r-line-height)",
      letterSpacing: "var(--text-base-16r-letter-spacing)",
    } as const,
    text:
      "ESG 실천네트워크는 대학, 학회, 산업체, 지역사회가 함께 지속 가능한 미래를 행동으로 구현합니다.",
  },
  {
    id: "caption",
    labelKo: "캡션 13 Regular",
    css: {
      fontSize: "var(--text-xs-13r-size)",
      fontWeight: "var(--text-xs-13r-weight)" as unknown as number,
      lineHeight: "var(--text-xs-13r-line-height)",
      letterSpacing: "var(--text-xs-13r-letter-spacing)",
    } as const,
    text: "2024년 11월 · ESGPN 공식 발표",
  },
] as const;

export function FontCalibration() {
  return (
    <main
      className="min-h-screen bg-white text-gray-900"
      style={{ padding: 48, fontFamily: "var(--font-family-pretendard)" }}
    >
      {samples.map((s) => (
        <section
          key={s.id}
          data-calibration-sample={s.id}
          style={{
            width: 1200,
            padding: 24,
            marginBottom: 24,
            border: "1px solid #dbe1e0",
            background: "#ffffff",
          }}
        >
          <div style={{ fontSize: 12, color: "#7c8985", marginBottom: 8 }}>
            {s.labelKo}
          </div>
          <div style={s.css}>{s.text}</div>
        </section>
      ))}
    </main>
  );
}
