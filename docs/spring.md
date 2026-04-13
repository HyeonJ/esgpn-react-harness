# docs/spring.md — Spring Boot 작업 규칙

이 문서는 Spring Boot 기반 백엔드 작업 시 따라야 할 컨벤션과 규칙을 정의한다.
**스택: Spring Boot + MyBatis + PostgreSQL**

작업 시작 전 반드시 `CLAUDE.md`의 5단계 워크플로우를 따른다. 이 문서는 그 안에서 "무엇을 따를 것인가"에 해당한다.

---

## 0. 작업 시작 전 체크리스트

새 기능을 만들기 전에 항상 확인한다:

- [ ] 비슷한 기능이 이미 존재하는가? (Service, Mapper, Util 레이어 전수 검색)
- [ ] 기존 DTO/도메인 객체로 충분한가, 새로 만들어야 하는가?
- [ ] 이 변경이 기존 트랜잭션 경계를 깨뜨리지 않는가?
- [ ] 기존 예외 처리 패턴(`@ControllerAdvice` 등)에 부합하는가?

리서치 단계에서 위 항목을 `research.md`에 명시적으로 답한다.

---

## 1. 레이어 구조

표준 레이어 구조를 따른다. **레이어를 건너뛰지 않는다.**

```
Controller  →  Service  →  Mapper  →  DB
   (DTO)      (도메인)     (SQL)
```

### 각 레이어의 책임
- **Controller**: HTTP 요청/응답 처리, 입력 검증(`@Valid`), DTO ↔ 도메인 변환 호출. 비즈니스 로직 금지.
- **Service**: 비즈니스 로직, 트랜잭션 경계(`@Transactional`), 여러 Mapper 호출 조합. SQL 금지.
- **Mapper**: SQL 실행만. 비즈니스 로직 금지.
- **Domain/DTO**: 데이터 보유. 외부 의존성 금지.

### 금지사항
- Controller에서 Mapper 직접 호출 금지
- Service에서 HTTP 객체(`HttpServletRequest` 등) 참조 금지
- Mapper XML에 비즈니스 로직(복잡한 분기 등) 금지

---

## 2. 네이밍 컨벤션

### Java
- 클래스: `PascalCase`, **단수형** (`User`, `Order`, `ComplaintTicket`)
- 메서드/변수: `camelCase`
- 상수: `UPPER_SNAKE_CASE`
- 패키지: 소문자, 점 구분

### 클래스 접미사
- Controller: `XxxController`
- Service 인터페이스: `XxxService` / 구현: `XxxServiceImpl`
- Mapper 인터페이스: `XxxMapper`
- DTO: 용도 명시 — `XxxRequest`, `XxxResponse`, `XxxCreateRequest` 등
- 도메인: 접미사 없음 (`User`, `Order`)

### DB (PostgreSQL)
- 테이블: `snake_case`, **복수형** (`users`, `orders`, `complaint_tickets`)
- 컬럼: `snake_case` (`created_at`, `user_id`)
- PK: `id` (BIGSERIAL 또는 BIGINT)
- FK: `{참조테이블단수}_id` (`user_id`, `order_id`)

### MyBatis 매핑
- Java `camelCase` ↔ DB `snake_case`는 `mybatis.configuration.map-underscore-to-camel-case=true` 설정으로 자동 매핑한다. 수동 alias 금지.

---

## 3. API 설계

### URL 규칙
- RESTful 원칙: `/api/v1/{resource(복수)}/{id}/{sub-resource}`
- 좋음: `GET /api/v1/users/123/orders`
- 나쁨: `GET /api/v1/getUserOrders?userId=123`

### 중복 방지
새 엔드포인트를 만들기 전에 반드시 기존 Controller를 grep으로 확인한다. 같은 리소스를 다루는 엔드포인트가 흩어지지 않게 한다.

### HTTP 상태 코드
- `200 OK`: 조회/수정 성공
- `201 Created`: 생성 성공 (Location 헤더 포함)
- `204 No Content`: 삭제 성공
- `400 Bad Request`: 입력 검증 실패
- `401 Unauthorized` / `403 Forbidden`: 인증/인가 실패
- `404 Not Found`: 리소스 없음
- `409 Conflict`: 비즈니스 규칙 충돌
- `500 Internal Server Error`: 예상치 못한 오류

### 응답 포맷
일관된 응답 포맷을 사용한다. 프로젝트에 이미 정의된 공통 응답 객체가 있으면 그것을 따른다.

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

### 페이징
- 기본은 **커서 기반(input-based) 페이징**을 우선 검토한다 (대용량/실시간 데이터)
- 오프셋 페이징은 관리자 화면 등 단순한 경우에만 사용
- 응답에 `nextCursor`, `hasNext` 같은 명시적 필드를 포함

---

## 4. 트랜잭션

- `@Transactional`은 **Service 레이어에만** 붙인다
- 읽기 전용은 `@Transactional(readOnly = true)` 명시
- 외부 API 호출(HTTP, Kafka 등)은 트랜잭션 안에 넣지 않는다 (롤백 불가능 + 커넥션 점유)
- 트랜잭션 전파(`Propagation`)를 변경할 때는 반드시 `plan.md`에 이유를 명시

---

## 5. 예외 처리

- 비즈니스 예외는 커스텀 예외 클래스로 정의 (`UserNotFoundException` 등)
- `@ControllerAdvice`에서 일괄 처리, Controller에서 try-catch 금지
- `RuntimeException`을 그대로 던지지 않는다 — 의미 있는 예외 타입을 사용
- 예외 메시지에 민감 정보(쿼리, 스택, 내부 경로) 노출 금지

---

## 6. MyBatis 사용 규칙

### XML
- `resources/mapper/{도메인}/XxxMapper.xml` 위치
- `<resultMap>`은 재사용 가능하면 정의, 단순 매핑은 자동 매핑에 맡김
- `#{}` 사용 (PreparedStatement) — `${}`는 동적 컬럼/정렬 등 불가피한 경우에만, 화이트리스트 검증 후 사용
- 동적 쿼리는 `<if>`, `<choose>`, `<foreach>` 사용

### 금지사항
- N+1 쿼리 — 컬렉션 조회 시 `<collection>` 또는 별도 배치 조회 사용
- `SELECT *` — 항상 컬럼 명시
- 비즈니스 로직(복잡한 CASE 분기 등)을 SQL로 밀어넣지 않기

### 마이그레이션
- 스키마 변경은 마이그레이션 도구(Flyway 등)를 통해서만 수행
- 기존 ORM 관례(테이블 복수, 컬럼 snake_case)를 반드시 따름
- 컬럼 추가/삭제 시 반드시 `plan.md`에 영향받는 Mapper XML 목록 명시

---

## 7. 보안 (Spring Security)

- 인증 정보(JWT, 세션 등)는 `SecurityContextHolder`에서 가져온다 — Controller 파라미터로 받지 않는다
- 인가는 `@PreAuthorize` 또는 SecurityFilterChain에서 일관되게 처리
- 비밀번호/토큰은 절대 로그에 남기지 않는다
- CORS 설정은 한 곳(Config 클래스)에서만 관리

---

## 8. 로깅

- SLF4J 사용 (`private static final Logger log = LoggerFactory.getLogger(...)` 또는 `@Slf4j`)
- 레벨 가이드:
  - `ERROR`: 즉시 조치 필요한 장애
  - `WARN`: 비정상이지만 처리 가능
  - `INFO`: 비즈니스 이벤트 (주문 생성 등)
  - `DEBUG`: 개발/디버깅용
- 민감 정보(PII, 토큰, 비밀번호) 로깅 금지
- 파라미터 바인딩은 `log.info("user created: {}", userId)` 형태로 — 문자열 연결 금지

---

## 9. 테스트

- 단위 테스트: Service 레이어를 Mock 기반으로 (`@MockBean` 또는 Mockito)
- 통합 테스트: `@SpringBootTest` + Testcontainers (PostgreSQL)
- 테스트 메서드명: `should_{기대결과}_when_{조건}` 또는 한글 가능
- 새 기능 구현 시 최소 하나의 테스트 케이스 작성

---

## 10. 자주 발생하는 안티패턴 (피할 것)

1. **Service에서 또 다른 Service 호출이 깊어지는 것** — 순환 참조와 트랜잭션 꼬임의 원인. Facade 패턴 검토.
2. **DTO와 도메인을 섞어 쓰는 것** — Controller는 DTO만, Service 내부는 도메인만.
3. **`Optional`을 필드로 쓰는 것** — 반환 타입에만 사용.
4. **`@Autowired` 필드 주입** — 항상 생성자 주입 (`@RequiredArgsConstructor` 권장).
5. **거대한 Controller** — 한 Controller에 20개 넘는 엔드포인트가 있으면 분리 검토.
6. **무지성 `@Transactional`** — 읽기 전용에도 쓰기 트랜잭션이 걸려 있으면 성능 저하.

---

## 11. 작업 시작 시 Claude에게

이 문서를 읽었다면 Spring 작업 시작 전에 다음을 수행한다:

1. `research.md`에 대상 기능과 관련된 기존 Controller / Service / Mapper 목록을 정리
2. 위 체크리스트(섹션 0)에 명시적으로 답변
3. ORM 관례(섹션 2)와 레이어 구조(섹션 1)를 위반하는 부분이 없는지 확인
4. `plan.md`에 변경될 파일 경로를 레이어별로 정리

`CLAUDE.md`의 4단계 방어 체계는 이 문서와 함께 작동한다.
