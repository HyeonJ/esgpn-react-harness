/**
 * ValueCard — AboutValues 전용 카드 (아이콘 + 제목 + 설명 2줄).
 * Rule of Three 첫 카운트 (로컬 유지). 추후 자격검정/경진대회에서 재등장 시 공통 승격 평가.
 */
type ValueCardProps = {
  icon: string;
  iconW: number;
  iconH: number;
  title: string;
  descLine1: string;
  descLine2: string;
  className?: string;
};

export function ValueCard({
  icon,
  iconW,
  iconH,
  title,
  descLine1,
  descLine2,
  className = "",
}: ValueCardProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img src={icon} alt="" width={iconW} height={iconH} className="block" />
      <h3 className="mt-[33px] text-[22px] leading-[22px] font-bold text-[#1d2623] whitespace-nowrap m-0">
        {title}
      </h3>
      <p className="mt-[22px] text-[16px] leading-[24px] text-[#1d2623] text-center whitespace-nowrap m-0">
        {descLine1}
        <br />
        {descLine2}
      </p>
    </div>
  );
}
