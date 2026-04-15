# plan/certification-intro.md

> Figma 299:3875 / 1416×291 / page (252, 851)

## 컴포넌트 구조
```
CertificationIntro (section, w-1416 mx-auto px-240 py-64 col items-end gap-20)
├─ HatchedSectionHeading (w-full, icon=icon.png, title="자격검정의 필요성", titleId)
└─ row gap-32 items-start text-center text-black w-full
   ├─ p flex-1 (3 column, 16px Medium ls -0.16, 2-3 lines with <br>)
   ├─ p flex-1
   └─ p flex-1
```

## 신규 파일
- `src/components/sections/CertificationIntro/CertificationIntro.tsx`
- `src/components/sections/CertificationIntro/index.ts`
- `src/routes/CertificationIntroPreview.tsx`
- `src/assets/certification-intro/icon.png` (Framelink 299:3878 @ 2x = 80×80)

## 측정 (2회차 ACCEPTED)
- 회차 1: 5.88% (HatchedSectionHeading shrink 미적용)
- 회차 2 (className=w-full 추가): **5.24%** ⚠ ACCEPTED
- G2/G3/G4 육안 PASS, G5-G8 PASS
- 잔여 diff: heading icon AA + 한글 본문 dense AA (한글 dense pattern §2.5)
