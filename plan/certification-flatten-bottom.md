# plan/certification-flatten-bottom.md

> Figma 299:4002 / 1920×2148 / 자식 0개 (완전 flatten)

## 결정: 단일 raster (ACCEPTED tech-debt T-008)

Figma 노드 메타데이터에 자식 0개. design_context/metadata 모두 빈 트리.
HTML 재구성에 필요한 텍스트·색·구조 데이터 추출 불가.

OCR 도입 또는 디자이너 원본 재요청 전까지 단일 raster 유지.

## 측정
- G1: 0.00% (자기 자신)
- G5-G8 PASS (alt 12자 < floor 80)
- 향후 분할: Process(~y=0~430) / Schedule(~y=430~1760) / CTA(~y=1760~2148) — 별건 PR
