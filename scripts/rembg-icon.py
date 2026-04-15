#!/usr/bin/env python
"""
rembg-icon.py — GIF/dark-bg 아이콘 PNG에서 배경 제거 (birefnet-general + alpha matting).

배경:
  Framelink가 leaf nodeId로 export한 아이콘 PNG가 GIF source거나 dark fill을 가질 때
  검정 배경이 남음. Figma 캔버스에서는 mix-blend-lighten으로 투명하게 보이지만
  단독 export 시 검정이 그대로.

  단순 chroma-key/luma-to-alpha는 AA 경계 fringe 문제 발생.
  rembg (U-Net 기반 segmentation) + alpha matting trimap이 최적 해법 확인 (v3 실험).

의존성:
  pip install "rembg[cpu,cli]"  # 최초 실행 시 ONNX 모델 ~1GB 다운로드

사용:
  python scripts/rembg-icon.py <input.png> [output.png]
  python scripts/rembg-icon.py src/assets/main-hero/icon-1.png            # in-place
  python scripts/rembg-icon.py src/assets/main-hero/icon-1.png --no-matting  # 속도 우선

옵션:
  --model <name>     기본 birefnet-general. 다른 후보: isnet-general-use, u2net
  --no-matting       alpha matting 끄기 (기본 ON)
"""
import sys
import argparse
from pathlib import Path

parser = argparse.ArgumentParser(description="GIF/dark-bg 아이콘 배경 제거")
parser.add_argument("input", help="입력 PNG 경로")
parser.add_argument("output", nargs="?", default=None, help="출력 경로 (생략 시 in-place)")
parser.add_argument("--model", default="birefnet-general", help="rembg 모델 (기본 birefnet-general)")
parser.add_argument("--no-matting", action="store_true", help="alpha matting 끄기")
parser.add_argument("--fg-threshold", type=int, default=240, help="matting foreground threshold")
parser.add_argument("--bg-threshold", type=int, default=20, help="matting background threshold")
parser.add_argument("--erode-size", type=int, default=5, help="matting erode size")
args = parser.parse_args()

in_path = Path(args.input)
out_path = Path(args.output) if args.output else in_path

if not in_path.exists():
    sys.stderr.write(f"error: {in_path} not found\n")
    sys.exit(2)

try:
    from rembg import remove, new_session  # type: ignore
except ImportError:
    sys.stderr.write("error: rembg 미설치. `pip install 'rembg[cpu,cli]'` 실행\n")
    sys.exit(2)

session = new_session(args.model)

with open(in_path, "rb") as f:
    data = f.read()

kwargs = {"session": session}
if not args.no_matting:
    kwargs.update(
        alpha_matting=True,
        alpha_matting_foreground_threshold=args.fg_threshold,
        alpha_matting_background_threshold=args.bg_threshold,
        alpha_matting_erode_size=args.erode_size,
    )

out = remove(data, **kwargs)

with open(out_path, "wb") as f:
    f.write(out)

print(f"✓ {in_path} → {out_path}  model={args.model} matting={'OFF' if args.no_matting else 'ON'}")
