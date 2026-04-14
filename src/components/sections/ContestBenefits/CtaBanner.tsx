import ctaComposite from "@/assets/contest-benefits/cta-composite.png";

/**
 * CtaBanner — contest-benefits 하단 "지금 바로 신청하세요" CTA Container (Figma 302:6592).
 *
 * 회차 4 [B+C] 전략: Framelink nodeId-only rendered composite PNG 1장으로 전환.
 *   - composite PNG에 배경(#005C33 + 도시 실루엣), 제목, 서브텍스트, 버튼까지 모두 baked-in
 *   - CSS blend·텍스트·버튼 스타일 전부 제거 (이중 적용 방지, §2.5 "Framelink PNG는 완성 사진")
 *   - 접근성: role="img" + aria-label로 내용 노출, 투명 <button> 오버레이로 클릭 영역 제공
 *
 * 컨테이너 크기만 Figma spec(936×320) 유지. 전체가 composite PNG 한 장.
 */
export function CtaBanner() {
  return (
    <div
      role="img"
      aria-label="지금 바로 신청하세요. 아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요."
      className="relative h-[320px] w-[936px] overflow-hidden rounded-[20px]"
    >
      <img
        src={ctaComposite}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 block h-full w-full"
      />
      <button
        type="button"
        aria-label="경진대회 참가하기"
        className="absolute left-1/2 top-[212px] h-[68px] w-[232px] -translate-x-1/2 cursor-pointer rounded-full bg-transparent"
      />
    </div>
  );
}
