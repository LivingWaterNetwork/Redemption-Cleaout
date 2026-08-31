#!/usr/bin/env python3
"""Convert phone photos into web-ready gallery images.

The owner's photos arrive as iPhone HEIC files, which no browser can display,
at 3-7 MB each. This converts a folder of them to the sizes and format the site
expects and prints the `src`/`alt` skeletons to paste into
src/content/gallery.ts.

    pip install pillow pillow-heif
    python3 tools/import-photos.py ~/Downloads/Demolition\\ 1 --prefix demolition-teardown

Handles HEIC, JPG, and PNG input. Output is progressive JPEG, long edge capped
at 2400px, stripped of EXIF — which also strips the GPS coordinates iPhones
embed, so a job photo never publishes the customer's address.

Writes nothing to gallery.ts: alt text has to describe what is actually in the
frame, so a person still has to look at each photo and write it.
"""

import argparse
import pathlib
import sys

try:
    from PIL import Image
    import pillow_heif
except ImportError:
    sys.exit("Missing dependencies. Run: pip install pillow pillow-heif")

pillow_heif.register_heif_opener()

MAX_EDGE = 2400
QUALITY = 82
SUFFIXES = {".heic", ".heif", ".jpg", ".jpeg", ".png"}
OUT_DIR = pathlib.Path("public/images/photos")


def convert(source: pathlib.Path, destination: pathlib.Path) -> tuple[int, int]:
    with Image.open(source) as image:
        image = image.convert("RGB")
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        # No exif= argument, so EXIF (including GPS) is dropped.
        image.save(destination, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        return image.size


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folder", help="Folder of photos to convert")
    parser.add_argument(
        "--prefix",
        required=True,
        help="Filename prefix, e.g. demolition-teardown (numbered automatically)",
    )
    parser.add_argument(
        "--out", default=str(OUT_DIR), help=f"Output folder (default: {OUT_DIR})"
    )
    args = parser.parse_args()

    sources = sorted(
        path
        for path in pathlib.Path(args.folder).iterdir()
        if path.suffix.lower() in SUFFIXES
    )
    if not sources:
        sys.exit(f"No images found in {args.folder}")

    out_dir = pathlib.Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    entries = []
    for index, source in enumerate(sources, start=1):
        name = f"{args.prefix}-{index:02d}.jpg"
        destination = out_dir / name
        width, height = convert(source, destination)
        size_kb = destination.stat().st_size // 1024
        print(f"  {source.name} -> {name}  {width}x{height}  {size_kb} KB")
        entries.append(name)

    print(f"\nConverted {len(entries)} photos into {out_dir}.\n")
    print("Paste into src/content/gallery.ts and replace every TODO with a real")
    print("description of what the photo shows:\n")
    for name in entries:
        print("  {")
        print(f'    src: "/images/photos/{name}",')
        print('    alt: "TODO — describe what is actually in this photo.",')
        print('    caption: "TODO",')
        print('    category: "demolition",')
        print("  },")


if __name__ == "__main__":
    main()
