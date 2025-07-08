#!/usr/bin/env python3

import os
import json
import subprocess
from pathlib import Path
import shutil
from PIL import Image

def convert_pdf_with_transparency(pdf_path, output_dir):
    """
    Converts a PDF to PNG(s) with transparency using pdftocairo.
    - Single page: originalname.png
    - Multi-page:  originalname_page_X.png
    """
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    basename = pdf_path.stem

    # Make a temporary directory for pdftocairo output
    tmp_dir = output_dir / "__tmp"
    tmp_dir.mkdir(exist_ok=True)

    # pdftocairo creates: tmp_dir/basename-1.png, basename-2.png, ...
    pdftocairo_base = tmp_dir / basename
    try:
        subprocess.run([
            "pdftocairo",
            "-png",
            "-transp",
            str(pdf_path),
            str(pdftocairo_base)
        ], check=True)

        # Get all generated PNGs, sorted in order
        images = sorted(tmp_dir.glob(f"{basename}-*.png"), key=lambda p: int(p.stem.split('-')[-1]))
        if not images:
            print(f"No images created for {pdf_path}")
            return

        if len(images) == 1:
            # Single page: originalname.png
            out_name = f"{basename}.png"
            shutil.move(str(images[0]), str(output_dir / out_name))
        else:
            # Multi-page: originalname_page_X.png
            for i, img_path in enumerate(images, start=1):
                out_name = f"{basename}_page_{i}.png"
                shutil.move(str(img_path), str(output_dir / out_name))

        print(f"Converted {pdf_path} to PNG(s) with transparency.")

    except FileNotFoundError:
        print("Error: 'pdftocairo' not found. Please install Poppler and ensure it's in your PATH.")
    except subprocess.CalledProcessError as e:
        print(f"Error converting {pdf_path}: {e}")
    finally:
        # Clean up temporary directory
        for f in tmp_dir.glob(f"{basename}-*.png"):
            try: f.unlink()
            except Exception: pass


def main():
    # Project root is where this script is located
    project_root = Path(__file__).resolve().parent

    # PDFs live here:
    pdf_dir = project_root / 'public' / 'pdf'

    # Output images go here:
    output_dir = project_root / 'public' / 'img'
    output_dir.mkdir(parents=True, exist_ok=True)

    # Walk all files and subdirectories in the pdf_dir
    for root, dirs, files in os.walk(pdf_dir):
        for filename in files:
            if filename.lower().endswith('.pdf'):
                pdf_path = Path(root) / filename
                print(f'Converting {pdf_path}')
                convert_pdf_with_transparency(pdf_path, output_dir)


def generate_thumbnails(size=(400, 410)):
    """
    Walks every PNG in img_root and writes a 400×410 thumbnail
    to img_root/thumbnail/, keeping the same filename.
    """
    project_root = Path(__file__).resolve().parent

    # Get the image root directory
    img_root = project_root / "public" / "img"
    img_root   = Path(img_root)

    # Create the thumbnail directory if it doesn't exist
    thumb_root = img_root / "thumbnail"
    thumb_root.mkdir(parents=True, exist_ok=True)

    for png in img_root.rglob("*.png"):
        if thumb_root in png.parents:               # skip thumbnails themselves
            continue

        rel      = png.relative_to(img_root)       # keep sub-folder structure
        out_path = thumb_root / rel
        out_path.parent.mkdir(parents=True, exist_ok=True)

        try:
            with Image.open(png) as im:
                # Preserve transparency + good quality down-scaling
                im.thumbnail(size, Image.Resampling.LANCZOS)

                # ---- palette & compression tweaks ----
                if im.mode == "RGBA":
                    # keep transparency, but use a smaller palette
                    im = im.quantize(colors=256, method=Image.FASTOCTREE)  # or Image.LIBIMAGEQUANT
                else:
                    # no alpha → RGB + median-cut is fine
                    im = im.convert("RGB").quantize(colors=256, method=Image.MEDIANCUT)


                out_path = out_path.with_suffix(".png")    # stick with png extension
                im.save(out_path,
                        format="PNG",
                        optimize=True,     # better compression
                        compress_level=9)  # 0 fastest, 9 smallest

            print(f"✓ {out_path}")
        except Exception as e:
            print(f"✗ {png} – {e}")


def get_new_list():
    """
    Generates a JavaScript file containing a list of image filenames in the public/img directory.
    This is useful for dynamically loading images in a web application.
    Developers do not need to manually manage the image list anymore. It's auto-compiled now.
    """

    # Set your image directory
    image_dir = './public/img'
    output_file = './src/image_list.js'

    # Collect all file names
    image_files = sorted([
        f for f in os.listdir(image_dir)
        if os.path.isfile(os.path.join(image_dir, f)) and f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
    ])

    # Format as a JS array
    js_array_content = 'const imageList = ' + json.dumps(image_files, indent=2) + ';\nexport default imageList;'

    # Write to file
    with open(output_file, 'w') as f:
        f.write(js_array_content)

    print(f"✅ Saved {len(image_files)} image filenames to {output_file}")


if __name__ == '__main__':
    main()
    generate_thumbnails()
    get_new_list()
