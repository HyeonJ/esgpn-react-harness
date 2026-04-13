#!/usr/bin/env python3
"""process-assets.py — 에셋 후처리 파이프라인 (Pillow 기반).

기능
----
1. (기본) 알파 채널 보정: 검정 배경 제거는 `--blackbg` 플래그가 있을 때만 수행.
   * 플래그가 없으면 원본을 절대 변형하지 않는다 (사용자 결정 #3: 명시 플래그 방식).
2. GIF 발견 시 경고 로그만 출력 (정적 PNG 원칙 — 동적 에셋은 dynamic-asset-handling 스킬 경유).
3. MP4/WebM 발견 시 경고 로그.

사용법
------
    python scripts/process-assets.py <dir> [--blackbg] [--threshold N]

--blackbg      : 검정 배경을 투명으로 변환 (임계값 이하 R,G,B 값을 알파 0으로).
--threshold N  : 검정 임계값 (기본 8). 0~50 권장.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.stderr.write("Pillow가 필요합니다: pip install Pillow\n")
    sys.exit(2)


def corners_are_black(img: Image.Image, threshold: int) -> bool:
    """이미지 네 귀퉁이 4픽셀이 전부 threshold 이하이면 검정 배경으로 추정."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    if w < 2 or h < 2:
        return False
    corners = [rgb.getpixel((0, 0)),
               rgb.getpixel((w - 1, 0)),
               rgb.getpixel((0, h - 1)),
               rgb.getpixel((w - 1, h - 1))]
    return all(max(px) <= threshold for px in corners)


def remove_black_bg(src: Path, threshold: int) -> bool:
    img = Image.open(src)
    if img.mode == "P":
        img = img.convert("RGBA")
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    if not corners_are_black(img, threshold):
        return False

    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        if r <= threshold and g <= threshold and b <= threshold:
            new_data.append((r, g, b, 0))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)

    out = src.with_suffix(".png")
    img.save(out, "PNG")
    return True


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("dir", type=Path)
    p.add_argument("--blackbg", action="store_true", help="검정 배경 → 투명 변환 활성화")
    p.add_argument("--threshold", type=int, default=8, help="검정 임계값 (기본 8)")
    args = p.parse_args()

    if not args.dir.is_dir():
        sys.stderr.write(f"error: not a dir: {args.dir}\n")
        return 2

    scanned = 0
    processed = 0
    warnings = 0

    for f in sorted(args.dir.iterdir()):
        if not f.is_file():
            continue
        scanned += 1
        ext = f.suffix.lower()

        if ext in {".png", ".jpg", ".jpeg"} and args.blackbg:
            try:
                changed = remove_black_bg(f, args.threshold)
                if changed:
                    processed += 1
                    print(f"BLACKBG→TRANSPARENT  {f}")
                else:
                    print(f"KEEP                 {f} (귀퉁이 검정 아님)")
            except Exception as e:  # noqa: BLE001
                warnings += 1
                print(f"WARN  {f}: {e}", file=sys.stderr)
        elif ext == ".gif":
            warnings += 1
            print(f"WARN  {f}: GIF는 정적 PNG 원칙. dynamic-asset-handling 스킬로 처리.", file=sys.stderr)
        elif ext in {".mp4", ".webm", ".mov"}:
            warnings += 1
            print(f"WARN  {f}: 비디오 에셋. dynamic-asset-handling 스킬로 처리.", file=sys.stderr)
        else:
            print(f"SKIP                 {f} ({ext or 'no-ext'})")

    print("----")
    print(f"summary: scanned={scanned} processed={processed} warnings={warnings} blackbg={args.blackbg}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
