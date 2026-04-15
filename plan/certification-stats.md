# plan/certification-stats.md

> Figma 299:3862 / 1920×194 / page y=633 / Hero bg overlay 영역

## 컴포넌트 구조

```
CertificationStats (section, w-1920 h-194 mx-auto overflow-hidden)
├─ <h2 sr-only>자격검정 통계</h2>
├─ <img bg.png 1920×194> (full crop 633~827)
└─ row gap-16 py-48 items-center justify-center
   └─ Stat × 3 + Divider × 2 (interleaved)
      ├─ Stat: col gap-12 items-center w-240 text-white
      │  ├─ big (Pretendard Bold, 40 or 48, leading 1.3, ls -1.6 or -1.92)
      │  └─ small (Pretendard Medium, 16, leading 1.5, ls -0.16)
      └─ Divider: 1px wide, 64 tall, white 50%
```

## 신규 파일
- `src/components/sections/CertificationStats/CertificationStats.tsx`
- `src/components/sections/CertificationStats/index.ts`
- `src/routes/CertificationStatsPreview.tsx`
- `src/assets/certification-stats/bg.png` (full-page 633~827 crop)

## 측정 결과 (1회차 통과)
- G5 lint 0 / G6/G8 PASS / G7 SKIP
- G1 **1.18%** ✅
- G2/G3/G4 육안 PASS
