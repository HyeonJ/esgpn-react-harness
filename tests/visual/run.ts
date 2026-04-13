/**
 * run.ts — compare-section.sh 에서 호출되는 Node 런너.
 *
 * CLI:
 *   npx tsx tests/visual/run.ts --section <name> --url <url> --baseline <path>
 *   npx tsx tests/visual/run.ts --self-test      (의도적 오류 검출 검증)
 *
 * 종료 코드:
 *   0   : diff <= 5% (섹션 G1 게이트 통과)
 *   1   : diff > 5%
 *   2   : 입력/환경 오류
 */
import { argv, exit } from "node:process";
import { resolve } from "node:path";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";
import { captureUrl } from "./capture.ts";
import { comparePngs } from "./compare.ts";

function parseArgs(a: string[]): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {};
  for (let i = 0; i < a.length; i++) {
    const k = a[i];
    if (!k.startsWith("--")) continue;
    const key = k.slice(2);
    const next = a[i + 1];
    if (!next || next.startsWith("--")) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

const THRESHOLD_PERCENT = 5;

async function runSelfTest(): Promise<number> {
  // 의도적 오류 검출 테스트:
  //   1) 200x200 초록 사각형 PNG 2장 생성
  //   2) 한쪽 전체를 빨강으로 채워 강제 오차 주입
  //   3) comparePngs 호출, diff% 가 > 5% 로 명백히 검출되는지 확인
  //   4) 동일 PNG 2장 비교 시 diff% == 0 인지 확인
  const dir = resolve("tests/visual/self-test");
  mkdirSync(dir, { recursive: true });

  const w = 200;
  const h = 200;
  const green = new PNG({ width: w, height: h });
  const red = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h; i++) {
    const p = i * 4;
    green.data[p] = 0x4f;
    green.data[p + 1] = 0xb6;
    green.data[p + 2] = 0x54;
    green.data[p + 3] = 0xff;
    red.data[p] = 0xff;
    red.data[p + 1] = 0x00;
    red.data[p + 2] = 0x00;
    red.data[p + 3] = 0xff;
  }
  const basePath = resolve(dir, "baseline.png");
  const redPath = resolve(dir, "red.png");
  const greenCopyPath = resolve(dir, "green-copy.png");
  writeFileSync(basePath, PNG.sync.write(green));
  writeFileSync(redPath, PNG.sync.write(red));
  writeFileSync(greenCopyPath, PNG.sync.write(green));

  const diffMismatch = comparePngs(
    basePath,
    redPath,
    resolve(dir, "diff-mismatch.png"),
  );
  const diffSame = comparePngs(
    basePath,
    greenCopyPath,
    resolve(dir, "diff-same.png"),
  );

  console.log(
    `[self-test] mismatch diff = ${diffMismatch.diffPercent.toFixed(2)}% (기대: > 5%)`,
  );
  console.log(
    `[self-test] same     diff = ${diffSame.diffPercent.toFixed(2)}% (기대: 0%)`,
  );

  const ok =
    diffMismatch.diffPercent > THRESHOLD_PERCENT && diffSame.diffPercent === 0;
  if (!ok) {
    console.error("[self-test] FAILED — pixel diff 검출이 정상 동작하지 않음");
    return 1;
  }
  console.log("[self-test] OK — 의도적 오류 검출 및 동일 이미지 무차이 모두 정상");
  return 0;
}

async function runCompare(args: Record<string, string | boolean>): Promise<number> {
  const section = String(args.section ?? "");
  const url = String(args.url ?? "");
  const baseline = String(args.baseline ?? "");
  if (!section || !url || !baseline) {
    console.error("usage: --section <name> --url <url> --baseline <path>");
    return 2;
  }
  if (!existsSync(baseline)) {
    console.error(`baseline missing: ${baseline}`);
    return 2;
  }

  const capturePath = resolve(`tests/visual/captures/${section}.png`);
  const diffPath = resolve(`tests/visual/diffs/${section}.diff.png`);

  console.log(`[capture] ${url} -> ${capturePath}`);
  await captureUrl({ url, outPath: capturePath, viewportWidth: 1920 });

  console.log(`[compare] ${baseline} vs ${capturePath}`);
  const res = comparePngs(baseline, capturePath, diffPath);
  console.log(`DIFF: ${res.diffPercent.toFixed(2)}% (${res.diffPixels}/${res.totalPixels}px)`);
  console.log(`diff image: ${res.diffImagePath}`);

  return res.diffPercent > THRESHOLD_PERCENT ? 1 : 0;
}

const args = parseArgs(argv.slice(2));
const main = args["self-test"] ? runSelfTest() : runCompare(args);
main.then((code) => exit(code)).catch((err) => {
  console.error(err);
  exit(2);
});
