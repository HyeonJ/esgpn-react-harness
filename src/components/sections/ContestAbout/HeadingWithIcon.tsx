import { HatchedDivider } from "@/components/ui/HatchedDivider";

/**
 * HeadingWithIcon — 40px 아이콘 + 32B 제목 + HatchedDivider.
 *
 * v4: Rule of Three 2/3. contest-about + contest-benefits (302:5068) 예정 사용.
 * Benefits 섹션 구현 시 동일 구조 확인 후 `ui/HatchedSectionHeading.tsx`로 승격.
 *
 * a11y: iconAlt=""이면 데코 아이콘으로 aria-hidden 처리.
 */
export function HeadingWithIcon({
  iconSrc,
  iconAlt = "",
  title,
  titleId,
}: {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  titleId?: string;
}) {
  return (
    <div className="flex flex-col gap-[21px]">
      <div className="flex items-center gap-3">
        <img
          src={iconSrc}
          alt={iconAlt}
          aria-hidden={iconAlt === "" ? true : undefined}
          className="block size-10 shrink-0 object-contain"
        />
        <h2
          id={titleId}
          className="text-[32px] font-bold leading-[1.3] tracking-[-0.96px] text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          {title}
        </h2>
      </div>
      <HatchedDivider className="w-full" />
    </div>
  );
}
