# figma-screenshots/header/

Figma Header (Top Nav) 노드 `52:1379`의 베이스라인 스크린샷 저장 위치.

## 베이스라인 획득 방법
Figma MCP `get_screenshot` 호출 결과는 어시스턴트에서 inline 이미지로 반환되며, 바이트 스트림 직접 저장 경로가 열려 있지 않다 (MCP asset URL은 브라우저 세션 필요). 단계 3/5에서 다음 중 하나로 저장한다:

1. **수동 캡처**: Figma 플러그인에서 `Export frame` → `header-1920.png` (2x, PNG)로 저장
2. **스크립트 경유**: `scripts/capture-figma-node.sh 52:1379 header-1920.png` (Phase 1 인프라에서 제공 예정)

## 필요한 파일 (단계 3에서 준비)
- `header-1920.png` — 1920 뷰포트 기준 캔버스 정적 프레임 (Top Nav는 1416x72, 1920 캔버스 중앙 + y=16 floating)
- (선택) `header-1440.png`, `header-768.png`, `header-375.png` — 반응형 브레이크포인트 검증용
