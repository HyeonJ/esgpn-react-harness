# docs/react.md — React 작업 규칙

이 문서는 React 기반 프론트엔드 작업 시 따라야 할 컨벤션과 규칙을 정의한다.
**스택: React + Vite + TypeScript + Tailwind CSS + Radix UI**

작업 시작 전 반드시 `CLAUDE.md`의 5단계 워크플로우를 따른다. 이 문서는 그 안에서 "무엇을 따를 것인가"에 해당한다.

---

## 0. 작업 시작 전 체크리스트

새 컴포넌트나 화면을 만들기 전에 항상 확인한다:

- [ ] 비슷한 컴포넌트가 이미 존재하는가? (`components/`, `features/` 전수 검색)
- [ ] 기존 디자인 시스템(Radix UI 래퍼, Tailwind 토큰)으로 충분한가?
- [ ] 새 의존성(npm 패키지)을 추가해야 하는가? **추가는 반드시 사용자 승인 후**
- [ ] 기존 상태 관리 패턴(Context, 상태 라이브러리)에 부합하는가?
- [ ] 이 변경이 라우팅 구조나 레이아웃을 깨뜨리지 않는가?

리서치 단계에서 위 항목을 `research.md`에 명시적으로 답한다.

---

## 1. 폴더 구조

기능 단위(feature-based) 구조를 기본으로 한다.

```
src/
├─ components/        # 범용 UI 컴포넌트 (Button, Input, Modal 등)
│   └─ ui/            # Radix 래퍼 등 가장 원자적인 UI
├─ features/          # 도메인 단위 (auth, orders, complaints …)
│   └─ {feature}/
│       ├─ components/   # 이 feature 안에서만 쓰는 컴포넌트
│       ├─ hooks/        # 이 feature 전용 훅
│       ├─ api/          # API 호출 함수
│       └─ types.ts      # 타입 정의
├─ hooks/             # 전역에서 쓰는 훅
├─ lib/               # 유틸, 헬퍼 (axios 인스턴스, formatter 등)
├─ pages/ or routes/  # 라우트 진입점
└─ types/             # 전역 타입
```

### 원칙
- 한 feature 안에서만 쓰이면 `features/{name}/` 안에 둔다
- 두 곳 이상에서 쓰이기 시작하면 `components/` 또는 `hooks/`로 승격
- 처음부터 전역에 두지 않는다 (조기 추상화 금지)

---

## 2. 네이밍 컨벤션

### 파일/폴더
- 컴포넌트 파일: `PascalCase.tsx` (`UserCard.tsx`)
- 훅 파일: `camelCase.ts` (`useUserData.ts`)
- 유틸 파일: `camelCase.ts` (`formatDate.ts`)
- 타입 파일: `types.ts` 또는 `xxx.types.ts`
- 폴더: `kebab-case` 또는 `camelCase` — 프로젝트 내 일관성 유지

### 코드
- 컴포넌트: `PascalCase` (`<UserCard />`)
- 훅: `use` 접두사 + `camelCase` (`useUserData`)
- 이벤트 핸들러: `handle` 접두사 (`handleSubmit`, `handleClick`)
- props로 받는 핸들러: `on` 접두사 (`onSubmit`, `onClick`)
- 불리언: `is`, `has`, `should` 접두사 (`isLoading`, `hasError`)

---

## 3. 컴포넌트 작성 규칙

### 기본 형태
```tsx
type UserCardProps = {
  user: User;
  onEdit?: (id: string) => void;
};

export function UserCard({ user, onEdit }: UserCardProps) {
  // ...
}
```

### 규칙
- **함수 컴포넌트만 사용** — 클래스 컴포넌트 금지
- **`React.FC` 사용 금지** — 직접 props 타입 명시
- **default export 지양, named export 우선** (자동 import / 리팩터링 안전)
- props 타입은 컴포넌트 위에 `type` 또는 `interface`로 명시
- props가 4~5개를 넘으면 객체로 그룹화 검토

### 컴포넌트 분리 기준
- 한 컴포넌트가 200줄을 넘으면 분리 검토
- JSX 안에 같은 패턴이 3번 반복되면 추출
- 한 컴포넌트가 두 가지 이상의 책임을 가지면 분리

---

## 4. TypeScript 규칙

`CLAUDE.md`의 "any/unknown 금지" 원칙은 React에서 특히 엄격히 적용한다.

- `any` 사용 절대 금지
- `unknown`은 외부 데이터 진입점(API 응답, 폼 입력)에서만 사용 후 즉시 좁히기
- API 응답 타입은 백엔드 DTO와 1:1 매칭되도록 정의 (`features/{name}/types.ts`)
- props에 `React.ReactNode` vs `JSX.Element`를 정확히 구분
- 이벤트 핸들러 타입: `React.MouseEvent<HTMLButtonElement>` 등 구체화
- `as` 타입 단언은 최후의 수단 — 사용 시 `plan.md`에 이유 명시

---

## 5. 상태 관리

### 상태의 위치
- **로컬 상태**: `useState` — 한 컴포넌트 안에서만 쓰는 것
- **공유 상태(소규모)**: 부모로 끌어올리기(lifting) → Context
- **서버 상태**: TanStack Query (React Query) — 캐싱/리페치/낙관적 업데이트
- **전역 클라이언트 상태**: 필요한 경우에만 Zustand 등 — 사용자 승인 후 도입

### 금지사항
- 서버 데이터를 `useState`에 직접 저장하고 수동 동기화하기 — 서버 상태 라이브러리 사용
- 모든 것을 Context에 넣기 — 리렌더 폭발의 원인
- `useEffect`에서 `setState` 무한 루프 — 의존성 배열 점검

---

## 6. 훅 사용 규칙

### useEffect
- **이펙트는 동기화에만 사용** — 이벤트 처리에 쓰지 않는다
- 의존성 배열 누락 금지 — ESLint `react-hooks/exhaustive-deps` 준수
- cleanup 함수 작성 (이벤트 리스너, 타이머, 구독 등)
- 데이터 페칭은 가급적 TanStack Query에 위임

### 커스텀 훅
- 재사용 가능한 로직만 훅으로 분리 — 컴포넌트 안의 코드를 옮기는 것이 아님
- 한 훅은 한 가지 책임만
- 반환값은 객체로 (`{ data, isLoading, error }`) — 위치 기반 배열은 인자 2개 이하일 때만

---

## 7. 스타일링 (Tailwind CSS)

### 원칙
- Tailwind 유틸리티 클래스를 우선 사용
- 반복되는 클래스 조합은 컴포넌트로 추출 (CSS 추상화보다 컴포넌트 추상화)
- 동적 클래스는 `clsx` 또는 `cn` 헬퍼 사용 — 문자열 직접 조립 금지

```tsx
// 좋음
<div className={cn("rounded p-4", isActive && "bg-blue-500")} />

// 나쁨
<div className={`rounded p-4 ${isActive ? "bg-blue-500" : ""}`} />
```

### 디자인 토큰
- 색상/간격/폰트는 `tailwind.config.js`에 정의된 토큰만 사용
- 임의값(`text-[#ff0000]`, `p-[13px]`)은 가급적 피하고, 필요하면 토큰에 추가

### 금지사항
- 인라인 `style` 객체 (동적으로 계산되는 값이 아니면)
- CSS 모듈 / styled-components 혼용 — 한 가지로 통일
- `!important` — 절대 사용 금지

---

## 8. Radix UI 사용 규칙

- Radix 원시(primitive) 컴포넌트는 직접 import하지 않고 `components/ui/`의 래퍼를 통해 사용
- 새 Radix 컴포넌트가 필요하면 먼저 `components/ui/`에 래퍼를 만든 후 사용
- 접근성(ARIA)은 Radix가 처리하는 것을 신뢰하되, `aria-label` 등 추가 보강은 명시적으로

---

## 9. API 호출

### 위치
- API 함수는 `features/{name}/api/` 안에 정의
- axios 인스턴스는 `lib/axios.ts`에서 단일 생성 — 인터셉터(인증, 에러)도 여기서

### 패턴
```ts
// features/users/api/getUsers.ts
export async function getUsers(params: GetUsersParams): Promise<UsersResponse> {
  const { data } = await axios.get<UsersResponse>("/api/v1/users", { params });
  return data;
}
```

### 규칙
- 컴포넌트에서 axios를 직접 호출하지 않는다 — 항상 api 함수를 거친다
- 응답 타입은 명시적으로 제너릭에 전달
- 에러 처리는 TanStack Query의 `onError` 또는 전역 인터셉터에서 일관되게

---

## 10. 폼 처리

- 폼 라이브러리는 React Hook Form 권장 (도입 전 사용자 승인)
- 검증은 Zod 등 스키마 기반 — 백엔드 DTO와 일치
- 제출 중복 방지: `isSubmitting` 상태로 버튼 비활성화
- 에러 메시지는 필드 옆에 표시, 토스트로만 띄우지 않기

---

## 11. 성능

다음은 **측정 후** 최적화한다. 미리 최적화하지 않는다.

- `React.memo`: props가 거의 변하지 않는 무거운 컴포넌트에만
- `useMemo` / `useCallback`: 하위 컴포넌트의 memo를 깨지 않기 위해, 또는 비싼 계산
- 큰 리스트: 가상화(`react-virtual`, `react-window`) 검토
- 이미지: lazy loading, 적절한 포맷(WebP)

### 금지사항
- 모든 함수에 `useCallback` 감싸기 — 오히려 메모리/복잡도 증가
- 모든 값에 `useMemo` 감싸기 — 측정 없이 최적화 금지

---

## 12. 자주 발생하는 안티패턴 (피할 것)

1. **거대한 컴포넌트** — 한 파일에 폼 + 리스트 + 모달이 다 있음
2. **prop drilling 5단계 이상** — Context 또는 컴포넌트 합성 검토
3. **`useEffect` 안에서 setState 후 또 useEffect** — 파생 상태는 렌더 중 계산
4. **key에 index 사용** — 리스트 순서가 바뀌는 경우 버그
5. **조건부 훅 호출** — 훅은 항상 같은 순서로 호출되어야 함
6. **서버 상태를 Redux/Zustand에 캐싱** — TanStack Query에 맡기기
7. **className 문자열 조합 + 백틱** — `cn` 헬퍼 사용
8. **컴포넌트 안에서 컴포넌트 정의** — 매 렌더마다 새 컴포넌트가 만들어져 리마운트됨

---

## 13. 작업 시작 시 Claude에게

이 문서를 읽었다면 React 작업 시작 전에 다음을 수행한다:

1. `research.md`에 대상 화면/기능과 관련된 기존 컴포넌트/훅/API 함수 목록을 정리
2. 위 체크리스트(섹션 0)에 명시적으로 답변
3. 새 npm 패키지가 필요하면 반드시 사용자에게 먼저 확인 (`CLAUDE.md` 5.2: 기술 선택은 사용자가 한다)
4. `plan.md`에 변경될 파일 경로를 폴더 구조(섹션 1)에 맞춰 정리
5. 디자인 토큰, Radix 래퍼 등 기존 자산을 우선 활용

`CLAUDE.md`의 4단계 방어 체계는 이 문서와 함께 작동한다.
