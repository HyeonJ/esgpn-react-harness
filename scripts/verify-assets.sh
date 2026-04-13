#!/usr/bin/env bash
# verify-assets.sh — 에셋 폴더의 각 파일 실제 MIME 타입을 검사하여 확장자 불일치 시 rename.
#
# 사용법:
#   scripts/verify-assets.sh <dir>
#
# 규칙:
#   - image/png  ↔ .png
#   - image/jpeg ↔ .jpg | .jpeg
#   - image/gif  ↔ .gif
#   - image/webp ↔ .webp
#   - image/svg+xml (또는 text/xml with <svg) ↔ .svg
#   - video/mp4  ↔ .mp4
#   - video/webm ↔ .webm
# 불일치 시 확장자만 MIME에 맞게 교체. 원본 이름 보존(디렉토리 그대로).
# 종료 코드: rename 발생 여부와 무관하게 0 (검증이 목적). 치명 오류는 1.

set -u
set -o pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: $0 <dir>" >&2
  exit 2
fi

DIR="$1"
[[ -d "$DIR" ]] || { echo "error: not a dir: $DIR" >&2; exit 2; }

renamed=0
checked=0
mismatches=0

mime_to_ext() {
  case "$1" in
    image/png) echo "png" ;;
    image/jpeg) echo "jpg" ;;
    image/gif) echo "gif" ;;
    image/webp) echo "webp" ;;
    image/svg+xml|text/xml) echo "svg" ;;
    video/mp4) echo "mp4" ;;
    video/webm) echo "webm" ;;
    *) echo "" ;;
  esac
}

# SVG는 file 명령이 text/xml로 떨어질 수 있어 시그니처 직검도 수행.
is_svg() {
  head -c 512 "$1" 2>/dev/null | grep -q -E '<svg[[:space:]>]'
}

shopt -s nullglob
for f in "$DIR"/*; do
  [[ -f "$f" ]] || continue
  checked=$((checked+1))

  mime=$(file -b --mime-type "$f" 2>/dev/null || echo "")
  ext_current="${f##*.}"
  ext_current_lc="$(printf '%s' "$ext_current" | tr '[:upper:]' '[:lower:]')"

  expected="$(mime_to_ext "$mime")"
  if [[ -z "$expected" ]] && is_svg "$f"; then
    expected="svg"
  fi

  if [[ -z "$expected" ]]; then
    echo "SKIP  [$mime] $f (알 수 없는 타입)"
    continue
  fi

  # jpg/jpeg 동의어 허용
  ok_aliases="$expected"
  [[ "$expected" == "jpg" ]] && ok_aliases="jpg jpeg"

  matched=0
  for alias in $ok_aliases; do
    [[ "$ext_current_lc" == "$alias" ]] && matched=1 && break
  done

  if [[ "$matched" == 1 ]]; then
    echo "OK    [$mime] $f"
  else
    mismatches=$((mismatches+1))
    base="${f%.*}"
    new="${base}.${expected}"
    if [[ "$f" != "$new" ]]; then
      mv -- "$f" "$new"
      renamed=$((renamed+1))
      echo "RENAME [$mime] $f -> $new"
    fi
  fi
done

echo "----"
echo "summary: checked=$checked mismatches=$mismatches renamed=$renamed"
exit 0
