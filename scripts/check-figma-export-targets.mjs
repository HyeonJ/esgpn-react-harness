#!/usr/bin/env node
/**
 * check-figma-export-targets.mjs — src/assets/ 아래 대형 composite PNG 감지.
 *
 * 하네스 규칙: 아이콘/장식 raster는 leaf nodeId로만 export. 부모 카드 nodeId를
 * Framelink에 넘기면 자식 전체가 단일 composite PNG로 합성됨 (text-bearing raster 안티패턴).
 *
 * 이 스크립트는 src/assets/ 아래 PNG 파일을 스캔해:
 *   - width * height > WARN_AREA (≈ 카드 1개 면적 이상) 인 PNG를 찾음
 *   - 해당 PNG가 텍스트 포함 composite 의심 → "자식 leaf nodeId로 분할 re-export 하세요" 경고
 *
 * 임계값:
 *   - WARN_AREA = 300 * 300 = 90000 픽셀² (@1x 기준)
 *     @2x로 받은 경우 실제 표시 크기는 절반이므로 (600*600) 정도부터 경고
 *   - baseline 폴더(figma-screenshots/)는 제외 — 섹션 전체 baseline은 허용
 *
 * 사용:
 *   node scripts/check-figma-export-targets.mjs
 *   node scripts/check-figma-export-targets.mjs src/assets/main-hero
 *
 * 종료: 0 (OK 또는 경고만), 1 (위반 다수), 2 (사용 오류)
 */
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";
import { PNG } from "pngjs";

const WARN_AREA = 300 * 300;
const SCOPE = process.argv[2] ?? "src/assets";

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "raw") continue; // download-assets.sh 중간 다운로드 폴더
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (extname(full).toLowerCase() === ".png") out.push(full);
  }
  return out;
}

const pngs = walk(SCOPE);
const suspects = [];

for (const p of pngs) {
  try {
    const buf = readFileSync(p);
    // PNG IHDR: bytes 16-23 contain width(4)+height(4) big-endian
    if (buf.length < 24) continue;
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    const area = w * h;
    if (area > WARN_AREA) {
      suspects.push({ file: p, w, h, area });
    }
  } catch (e) {
    console.error(`⚠ ${p} 읽기 실패: ${e.message}`);
  }
}

const report = {
  scope: SCOPE,
  scanned: pngs.length,
  suspectCount: suspects.length,
  threshold: `${Math.sqrt(WARN_AREA)}×${Math.sqrt(WARN_AREA)} (${WARN_AREA} px²)`,
  suspects: suspects.map(({ file, w, h }) => ({ file, size: `${w}×${h}` })),
};

console.log(JSON.stringify(report, null, 2));

if (suspects.length > 0) {
  console.error(
    `\n⚠ ${suspects.length}개 대형 PNG 발견. 카드/섹션 전체 composite 의심.\n` +
      `  텍스트가 포함돼 있다면:\n` +
      `    1. get_figma_data(부모 nodeId, depth=3)으로 자식 leaf 노드 트리 탐색\n` +
      `    2. leaf nodeId(아이콘/사진)만 Framelink download_figma_images 재호출\n` +
      `    3. 텍스트는 HTML 재구성\n` +
      `  장식/배경만 있다면 alt 짧게 유지 + tech-debt ACCEPTED로 문서화.\n` +
      `  docs/section-implementation.md §2.1 leaf nodeId 규칙 참조.`,
  );
  process.exit(1);
}
console.error("✓ 대형 composite PNG 없음");
process.exit(0);
