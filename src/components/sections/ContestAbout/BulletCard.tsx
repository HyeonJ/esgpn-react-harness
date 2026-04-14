/**
 * BulletCard — contest-about 로컬 (핵심 특징 / 주요 대상 카드).
 *
 * Figma 302:5000 / 302:5146: col gap 20, padding 24, bg #EFF0F0, radius 20, h=196 FIXED.
 * 제목 20SB (#0A0A0A) + BulletList(246w, col gap 12) — 12×12 녹색 원 + 16R #1E2939 텍스트.
 */
export interface BulletCardProps {
  title: string;
  items: readonly string[];
}

export function BulletCard({ title, items }: BulletCardProps) {
  return (
    <div className="flex h-[196px] flex-1 flex-col gap-5 rounded-[20px] bg-[#EFF0F0] p-6">
      <h3
        className="whitespace-nowrap font-semibold text-[20px] text-[#0A0A0A]"
        style={{ lineHeight: 1.4, letterSpacing: "-0.4px" }}
      >
        {title}
      </h3>
      <ul className="flex w-[246px] flex-col gap-3">
        {items.map((text) => (
          <li key={text} className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block size-3 shrink-0 rounded-full bg-[#4FB654]"
            />
            <span
              className="whitespace-nowrap font-normal text-[16px] text-[#1E2939]"
              style={{ lineHeight: 1.5, letterSpacing: "-0.16px" }}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
