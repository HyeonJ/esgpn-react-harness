import iconCheckFilled from "@/assets/main-programs-card1/icon-check-filled.svg";
import iconCheckStroke from "@/assets/main-programs-card1/icon-check-stroke.svg";

/**
 * inner 카드 중단 검사 포인트 3열 (Figma 252:1034).
 * 아이콘 20×20 + 16M 텍스트, gap=12. 행간 16.
 * 1행: icon-check-filled (252:1036, clip0_252_1036)
 * 2·3행: icon-check-stroke (252:1041/1046, 동일)
 */
const ROWS: { icon: string; text: string }[] = [
  { icon: iconCheckFilled, text: "ESG 개념 / 용어 / 실천 전반" },
  { icon: iconCheckStroke, text: "온라인 시험 진행" },
  { icon: iconCheckStroke, text: "공식 자격증 발급" },
];

export function CardChecklist3() {
  return (
    <div
      className="flex flex-col"
      style={{ gap: 16, width: 236 }}
      data-node-id="252:1034"
    >
      {ROWS.map((r, i) => (
        <div key={i} className="flex items-center" style={{ gap: 12 }}>
          <img
            src={r.icon}
            alt=""
            aria-hidden="true"
            className="block shrink-0"
            style={{ width: 20, height: 20 }}
          />
          <p
            className="font-['Pretendard_Variable'] font-medium"
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              letterSpacing: "-0.16px",
              color: "#1d2623",
            }}
          >
            {r.text}
          </p>
        </div>
      ))}
    </div>
  );
}
