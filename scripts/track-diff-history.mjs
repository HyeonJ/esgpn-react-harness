#!/usr/bin/env node
/**
 * track-diff-history.mjs — 섹션별 G1 회차 history 저장 + 악화 시 revert 제안.
 *
 * 자율 모드에서 certification-hero 회차 1(10.98%) → 2(11.54%) → 3(14.11%) → revert
 * 패턴 발견. 시도 자체가 악화시키는 함정을 자동 경고.
 *
 * 저장 위치: tests/visual/history/{section}.json
 *
 * 사용:
 *   node scripts/track-diff-history.mjs <section> <diff-percent>
 *   node scripts/track-diff-history.mjs certification-hero 11.54
 *
 * 출력 (stderr):
 *   - 최초 회차: 저장만
 *   - best 갱신: "best 갱신 N.NN%"
 *   - best 대비 +1.5%p 이상 악화: "⚠ 악화 X.X%p. 이전 best N.NN% (회차 K) 복원 권장"
 *   - 3회 연속 악화: "⚠⚠ 3회 연속 악화. 단계 4로 되돌리기 강력 권장"
 *
 * 종료: 항상 0 (경고만, 빌드 fail 시키지 않음)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

const WORSEN_THRESHOLD = 1.5;
const CONSECUTIVE_WORSEN_LIMIT = 3;

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("usage: track-diff-history.mjs <section> <diff-percent>");
  process.exit(2);
}
const [section, diffStr] = args;
const diff = parseFloat(diffStr);
if (Number.isNaN(diff)) {
  console.error(`error: invalid diff value: ${diffStr}`);
  process.exit(2);
}

const path = `tests/visual/history/${section}.json`;
mkdirSync(dirname(path), { recursive: true });

let history = { section, rounds: [], best: null, bestRound: null, consecutiveWorsen: 0 };
if (existsSync(path)) {
  try {
    history = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    // 손상 시 초기화
  }
}

const round = (history.rounds.length ?? 0) + 1;
history.rounds = history.rounds ?? [];
history.rounds.push({ round, diff, timestamp: new Date().toISOString() });

let msg = `[round ${round}] ${diff.toFixed(2)}%`;
let exitOK = true;

if (history.best === null || diff < history.best) {
  history.best = diff;
  history.bestRound = round;
  history.consecutiveWorsen = 0;
  msg += ` ✓ best 갱신`;
} else {
  const delta = diff - history.best;
  if (delta >= WORSEN_THRESHOLD) {
    history.consecutiveWorsen = (history.consecutiveWorsen ?? 0) + 1;
    msg += ` ⚠ best(${history.best.toFixed(2)}% @ round ${history.bestRound}) 대비 +${delta.toFixed(2)}%p 악화`;
    if (history.consecutiveWorsen >= CONSECUTIVE_WORSEN_LIMIT) {
      msg += `\n⚠⚠ ${history.consecutiveWorsen}회 연속 악화 — 단계 4로 되돌리기 강력 권장. best round ${history.bestRound} 코드 복원 고려`;
    } else {
      msg += `\n   → 현 변경 revert 후 다른 접근 시도 고려. best round ${history.bestRound} 상태 확인`;
    }
  } else {
    // best와 비슷 (±1.5pp 이내 악화) — 수렴 중
    history.consecutiveWorsen = 0;
    msg += ` (best ${history.best.toFixed(2)}% @ round ${history.bestRound}, +${delta.toFixed(2)}%p)`;
  }
}

writeFileSync(path, JSON.stringify(history, null, 2));
console.error(msg);
process.exit(exitOK ? 0 : 1);
