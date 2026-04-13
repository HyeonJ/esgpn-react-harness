import arrowSrc from "@/assets/main-intro/arrow-right-green.svg";

export type IntroGlobeLabelProps = {
  title: string; // "교육"
  body: string; // 본문 (br 포함 가능 — \n 분리 후 <br>)
  /** 라벨 컨테이너 캔버스 좌표 (IntroGlobeGroup 기준 left/top) */
  left: number;
  top: number;
};

/**
 * 우측 globe 주변 4개 라벨 중 1개.
 * 컨테이너 width 181.85, height 78. 내부:
 *   - 헤더 row (title + arrow icon 24×24, gap 4) — 우측 정렬
 *   - 본문 (14R, color #97a29e, 우측 정렬, height 42)
 */
export function IntroGlobeLabel({ title, body, left, top }: IntroGlobeLabelProps) {
  return (
    <div
      className="absolute flex flex-col items-end"
      style={{ left, top, width: 181.85243225097656, height: 78, gap: 8 }}
    >
      {/* 헤더 row: title + arrow */}
      <div className="flex items-center" style={{ gap: 4, height: 28 }}>
        <p
          className="font-['Pretendard_Variable'] font-bold"
          style={{
            fontSize: 20,
            lineHeight: 1.4,
            letterSpacing: "-0.4px",
            color: "var(--color-gray-900)",
          }}
        >
          {title}
        </p>
        <span
          className="inline-flex items-center justify-center"
          style={{ width: 24, height: 24 }}
          aria-hidden="true"
        >
          <img src={arrowSrc} alt="" style={{ width: 16, height: 20.88 }} />
        </span>
      </div>
      {/* 본문 — 우정렬, br 강제 */}
      <p
        className="font-['Pretendard_Variable'] font-normal text-right"
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          letterSpacing: "-0.5px",
          color: "var(--color-gray-500)",
          width: "100%",
        }}
      >
        {body.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br aria-hidden="true" />}
          </span>
        ))}
      </p>
    </div>
  );
}
