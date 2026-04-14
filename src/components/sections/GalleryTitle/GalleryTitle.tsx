/**
 * GalleryTitle — gallery 페이지 타이틀 섹션 (Figma Node 314:6837)
 * 936×124, 순수 타이포(에셋 0개).
 * 좌: Pretendard Bold 48px / 우: Pretendard Regular 15px, text-right, flex-1.
 * "ESPGN"(Figma 원본 오타) → "ESGPN"(프로젝트 공식 표기)로 교정.
 */
export function GalleryTitle() {
  return (
    <section className="w-[936px] mx-auto">
      <div className="flex gap-[32px] items-end">
        <h3 className="font-['Pretendard_Variable'] font-bold text-[48px] leading-[1.3] tracking-[-1.92px] text-black whitespace-nowrap">
          실천이 만든 변화의 순간들,<br />
          ESGPN 아카이브
        </h3>
        <p className="flex-1 font-['Pretendard_Variable'] font-normal text-[15px] leading-[1.5] tracking-[-0.1125px] text-right text-black">
          이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다.<br />
          우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다.
        </p>
      </div>
    </section>
  );
}
