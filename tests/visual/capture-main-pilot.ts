/**
 * capture-main-pilot.ts — 메인 페이지 반응형 파일럿 캡처 스크립트.
 *
 * 4개 뷰포트(375 / 768 / 1440 / 1920)에서 메인 페이지(/)를 fullPage 캡처.
 * 출력: docs/responsive-main-pilot/full-{vp}.png
 *
 * 사용법:
 *   npx tsx tests/visual/capture-main-pilot.ts
 *   npx tsx tests/visual/capture-main-pilot.ts --only 375
 *   npx tsx tests/visual/capture-main-pilot.ts --section main-hero  (섹션별 호출)
 */
import { captureUrl } from "./capture";

const VIEWPORTS = [375, 768, 1440, 1920];
const BASE_URL = process.env.BASE_URL ?? "http://localhost:5173";
const OUT_DIR = "docs/responsive-main-pilot";

interface Args {
  only?: number;
  section?: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--only" && argv[i + 1]) {
      args.only = Number(argv[i + 1]);
      i++;
    } else if (argv[i] === "--section" && argv[i + 1]) {
      args.section = argv[i + 1];
      i++;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const vps = args.only ? [args.only] : VIEWPORTS;
  const prefix = args.section ? `${args.section}` : "full";
  const url = args.section ? `${BASE_URL}/__preview/${args.section}` : `${BASE_URL}/`;

  for (const vp of vps) {
    const outPath = `${OUT_DIR}/${prefix}-${vp}.png`;
    console.log(`[capture] ${url} @ ${vp} → ${outPath}`);
    await captureUrl({
      url,
      outPath,
      viewportWidth: vp,
      viewportHeight: Math.max(800, Math.round(vp * 0.6)),
      fullPage: true,
    });
  }
  console.log("[capture] done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
