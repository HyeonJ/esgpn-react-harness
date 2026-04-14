import espgn from "@/assets/about-organization-logos/espgn.png";
import colive from "@/assets/about-organization-logos/colive.png";
import association from "@/assets/about-organization-logos/association.png";

/**
 * PartnerLogoRow — 3 로고 + pipe CSS divider.
 * research/about-organization-logos.md §3 / §4.
 * baseline 측정 (about-organization-full.png):
 *   ESPGN       crop 310×83 (logo polygon x=519~809, y=329~392, w=291 h=64)
 *   pipe        CSS w=2 h=46  (x=836~840, y=338~383)  — Gray 300
 *   Colive      crop 238×83 (polygon x=866~1084, w=219 h=64)
 *   Assoc       crop 320×77 (polygon x=1100~1400, w=301 h=58)
 * 전체 row 폭: baseline 519~1400 = 881px. crop에 여유(±10px)가 포함되어
 *   img tag가 실제 visual 경계보다 넓음 → gap 값으로 흡수.
 */
export function PartnerLogoRow() {
  return (
    <div className="flex items-center">
      {/* ESPGN — crop box는 509,319 / 시각 시작 519 → 왼쪽 10px 여유, 오른쪽 10px 여유 (810) */}
      <img src={espgn} alt="ESPGN" width={310} height={83} className="block" />

      {/* gap: ESPGN 끝(809) → pipe 시작(836) = 27px. crop 오른쪽 여유 10px 포함.
          img 오른쪽 경계(819) → pipe 시작(836) = 17px */}
      <div className="w-[17px]" />

      {/* pipe divider — CSS */}
      <div className="w-[2px] h-[46px] bg-[#d6dad8]" />

      {/* pipe 끝(840) → Colive crop 시작(856) = 16px */}
      <div className="w-[16px]" />

      <img src={colive} alt="Colive" width={238} height={83} className="block" />

      {/* Colive crop 끝(1094) → Assoc crop 시작(1090)은 겹침 불가. baseline: Colive 시각끝(1084) + 16 gap = 1100 Assoc 시작.
          crop 기반: Colive img 끝 (856+238=1094) → Assoc img 시작(1090)이면 겹침. baseline 시각 간 gap=16 유지 위해
          Colive polygon 시각 끝 1084 = img 우측 여유 10px 제외. Assoc img 시작 1090 (polygon 1100-10).
          따라서 Colive img 끝(1094) → Assoc img 시작(1090) = -4px (음수 겹침).
          대신 gap 0으로 맞붙이고 negative margin 없이 붙임. */}
      <img src={association} alt="사단법인 전문대학평생직업교육협회" width={320} height={77} className="block -ml-[4px]" />
    </div>
  );
}
