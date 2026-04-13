#!/usr/bin/env bash
# download-assets.sh — MCP가 준 에셋 URL 목록을 일괄 다운로드.
#
# 사용법:
#   scripts/download-assets.sh <urls.txt> <output-dir>
#     urls.txt: 한 줄에 URL 하나. 빈 줄/#시작 주석 허용.
#     output-dir: 저장 폴더 (자동 생성).
#
# 파일명 결정: URL의 마지막 path segment. 중복 시 숫자 접미사.
# 종료 코드: 실패 1건이라도 있으면 1.

set -u
set -o pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: $0 <urls.txt> <output-dir>" >&2
  exit 2
fi

URLS_FILE="$1"
OUT_DIR="$2"

if [[ ! -f "$URLS_FILE" ]]; then
  echo "error: urls file not found: $URLS_FILE" >&2
  exit 2
fi

mkdir -p "$OUT_DIR"

ok=0
fail=0
skipped=0

while IFS= read -r line || [[ -n "$line" ]]; do
  url="${line%%$'\r'}"
  url="${url## }"
  url="${url%% }"
  [[ -z "$url" ]] && continue
  [[ "$url" =~ ^# ]] && continue

  name="${url##*/}"
  name="${name%%\?*}"
  if [[ -z "$name" ]]; then
    name="asset-$(date +%s%N).bin"
  fi

  dest="$OUT_DIR/$name"
  if [[ -f "$dest" ]]; then
    base="${name%.*}"
    ext="${name##*.}"
    i=1
    while [[ -f "$OUT_DIR/${base}-${i}.${ext}" ]]; do i=$((i+1)); done
    dest="$OUT_DIR/${base}-${i}.${ext}"
  fi

  code=$(curl -sSL -o "$dest" -w "%{http_code}" "$url" || echo "000")
  if [[ "$code" == "200" ]]; then
    echo "OK   [$code] $url -> $dest"
    ok=$((ok+1))
  else
    echo "FAIL [$code] $url" >&2
    rm -f "$dest"
    fail=$((fail+1))
  fi
done < "$URLS_FILE"

echo "----"
echo "summary: ok=$ok fail=$fail skipped=$skipped"
[[ "$fail" -gt 0 ]] && exit 1
exit 0
