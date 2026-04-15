# 4뷰포트 게이트 (G1 baseline 대체)

Figma baseline PNG가 없는 반응형 변경에 적용할 검증 게이트. 8게이트 중 G1(시각 diff)은 비교할 baseline이 없어 사용 불가 → **4뷰포트 육안 + 자동화 체크**로 대체.

## 뷰포트 세트

| 뷰포트 | 폭 | 목적 |
|---|---|---|
| mobile | 375 | iPhone SE 기준, 가장 빡빡한 모바일 |
| tablet | 768 | iPad 세로 |
| laptop | 1440 | 가장 흔한 랩톱 |
| desktop | 1920 | Figma 원본 ✅ 이건 Figma baseline 매칭 필수 |

## 자동 체크 (Playwright)

### A1. Overflow 없음 (모든 뷰포트)
```js
await page.goto(url, { waitUntil: "networkidle" });
const scrollX = await page.evaluate(() => document.documentElement.scrollWidth);
const clientX = await page.evaluate(() => document.documentElement.clientWidth);
// 통과 조건: scrollX <= clientX + 1  (서브픽셀 여유 1)
```

### A2. 1920 뷰포트에서 Figma 원본과 픽셀 단위 동일
기존 `scripts/compare-section.sh` 재사용 or 1920 캡처와 `figma-screenshots/{page}.png` pixelmatch.
- 반응형 변경은 `xl:` prefix 안에만 있어야 하므로 1920에서 변화가 있으면 실수

### A3. 모든 뷰포트에서 렌더 실패 없음
```js
// getBoundingClientRect().height > 0 인 주요 섹션 요소 확인
```

## 육안 체크리스트 (사람이 수행)

각 뷰포트 스크린샷을 열어 확인:

### 공통
- [ ] 가로스크롤 바 보이지 않음
- [ ] 섹션 간 빈 공간 과도 / 부족 없음
- [ ] 텍스트 잘림 (ellipsis 예상된 곳 제외) 없음
- [ ] 아이콘 / 이미지 비율 유지

### mobile 375 특화
- [ ] 모든 버튼 세로 높이 ≥ 44px (터치 타겟)
- [ ] 2컬럼 섹션 이 1컬럼으로 스택됨
- [ ] 긴 한글 텍스트가 말줄임 또는 자연 줄바꿈
- [ ] 헤더/푸터 메뉴가 접근 가능 (햄버거 등)

### tablet 768 특화
- [ ] 좌우 패딩 과도하지 않음 (48px 정도 권장)
- [ ] 카드 그리드 2열 가능

### laptop 1440 특화
- [ ] Figma 원본과 차이가 컨테이너 폭 축소 정도로만

### desktop 1920 특화
- [ ] Figma 원본 PNG와 나란히 놓고 비교 — 변화 없어야 함

## 실행 스크립트

`tests/visual/capture-4vp.ts` (프로젝트에 이미 있음):
```bash
MSYS_NO_PATHCONV=1 npx tsx tests/visual/capture-4vp.ts "/main" main-final
# docs/v3-refactor-screenshots/main-final-{mobile-375,tablet-768,laptop-1440,desktop-1920}.png 생성
```

Overflow 체크:
```bash
MSYS_NO_PATHCONV=1 npx tsx tests/visual/find-overflow.ts
```

## 실패 처리

1. **1920에서 차이 발견** → 반응형 스타일에 `xl:` prefix 누락. 즉시 revert + prefix 붙여서 재시도
2. **mobile에서 overflow** → `references/patterns.md` §1 패턴 중 누락 확인
3. **tablet에서 2컬럼 유지 시 레이아웃 깨짐** → md: 에서 stack 추가
4. **3회 수정에도 실패** → 사용자 보고 + 멈춤

## 승인 기준

- 자동 체크 A1/A2/A3 모두 PASS
- 육안 체크리스트 공통 4개 + 각 뷰포트 특화 모두 PASS
- 사용자가 스크린샷 확인 후 OK
