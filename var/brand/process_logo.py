"""
Builds every Manassa (منصة) brand asset from the official logo file
var/brand/source/manassa-logo-original.png (transparent PNG supplied by the
owner). Run after replacing that file:

    pip install pillow fonttools uharfbuzz
    python var/brand/process_logo.py
    node var/brand/rasterize.mjs      # social preview PNG (needs `sharp`)

Outputs go to apps/frontend/public/brand/ and apps/frontend/public/.
"""
import base64
import io
import pathlib

from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "var/brand/source/manassa-logo-original.png"
OUT = ROOT / "apps/frontend/public/brand"
PUB = ROOT / "apps/frontend/public"
OUT.mkdir(parents=True, exist_ok=True)

# Colours sampled from the logo
INK = (25, 9, 75)          # navy wordmark  #19094B
VIOLET = (106, 43, 240)    # primary        #6A2BF0
LIGHT_INK = (246, 243, 255)  # wordmark on dark backgrounds #F6F3FF

# Paper-plane symbol region in the 1536x1024 source (plane + motion ticks)
PLANE_BOX = (1075, 285, 1420, 560)


def trim(im: Image.Image, pad: int = 0) -> Image.Image:
    box = im.getchannel("A").point(lambda a: 255 if a > 12 else 0).getbbox()
    im = im.crop(box)
    if pad:
        canvas = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
        canvas.paste(im, (pad, pad), im)
        im = canvas
    return im


def is_ink(r, g, b):
    # the navy wordmark/calendar: dark and blue-ish, not the violet accents
    return r < 80 and g < 60 and b < 140 and (r + g + b) < 230


def light_variant(im: Image.Image) -> Image.Image:
    """Same logo with the navy parts turned near-white, for dark backgrounds."""
    out = im.copy()
    px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            if a and is_ink(r, g, b):
                px[x, y] = (*LIGHT_INK, a)
    return out


def save_png(im: Image.Image, path: pathlib.Path, width: int | None = None):
    if width and im.width != width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    im.save(path, optimize=True)
    print("wrote", path, im.size)
    return im


def png_data_uri(im: Image.Image) -> str:
    buf = io.BytesIO()
    im.save(buf, format="PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def svg_wrapper(im: Image.Image, path: pathlib.Path):
    """An SVG that embeds the PNG, for places that expect an .svg file."""
    path.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
        f'width="{im.width}" height="{im.height}" viewBox="0 0 {im.width} {im.height}">'
        f'<image width="{im.width}" height="{im.height}" xlink:href="{png_data_uri(im)}"/></svg>\n',
        encoding="utf-8",
    )
    print("wrote", path)


def tile(symbol: Image.Image, size: int, bg, radius_ratio=0.22, scale=0.72, full_bleed=False):
    """Symbol centred on a rounded (or full-bleed) square."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(mask)
    if full_bleed:
        d.rectangle((0, 0, size, size), fill=255)
    else:
        d.rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius_ratio), fill=255)
    bg_layer = Image.new("RGBA", (size, size), bg)
    canvas.paste(bg_layer, (0, 0), mask)
    s = symbol.copy()
    target = int(size * scale)
    s.thumbnail((target, target), Image.LANCZOS)
    canvas.alpha_composite(s, ((size - s.width) // 2, (size - s.height) // 2))
    return canvas


def main():
    src = Image.open(SRC).convert("RGBA")

    # --- full lockup (calendar + wordmark + paper plane) ---
    lockup = trim(src, pad=8)
    lockup_light = light_variant(lockup)
    full_dark = save_png(lockup, OUT / "logo-text-dark.png", 640)  # navy ink: light backgrounds, e-mails
    full_light = save_png(lockup_light, OUT / "logo-text.png", 640)  # light ink: dark UI
    svg_wrapper(full_light, OUT / "logo-text.svg")
    svg_wrapper(full_dark, OUT / "logo-text-dark.svg")
    svg_wrapper(full_light, PUB / "logo-text.svg")
    svg_wrapper(full_light, PUB / "postiz-text.svg")

    # --- symbol: the paper plane ---
    region = src.crop(PLANE_BOX)
    rp = region.load()
    ox, oy = PLANE_BOX[0], PLANE_BOX[1]
    for y in range(region.height):
        for x in range(region.width):
            r, g, b, a = rp[x, y]
            # drop the neighbouring letter (navy) and the start of the swoosh
            if a and (is_ink(r, g, b) or (x + ox < 1234 and y + oy > 505)):
                rp[x, y] = (0, 0, 0, 0)
    plane = trim(region, pad=4)
    sq = max(plane.width, plane.height)
    plane_sq = Image.new("RGBA", (sq, sq), (0, 0, 0, 0))
    plane_sq.alpha_composite(plane, ((sq - plane.width) // 2, (sq - plane.height) // 2))
    save_png(plane_sq, OUT / "symbol.png", 256)

    white = (255, 255, 255, 255)
    mark = tile(plane_sq, 256, white)
    save_png(mark, OUT / "logo-256.png")
    svg_wrapper(tile(plane_sq, 128, white), OUT / "logo.svg")
    svg_wrapper(tile(plane_sq, 128, white), PUB / "logo.svg")
    svg_wrapper(tile(plane_sq, 128, white), PUB / "postiz.svg")
    save_png(tile(plane_sq, 64, white), PUB / "favicon.png")
    save_png(tile(plane_sq, 256, white), PUB / "postiz-fav.png")
    for s in (16, 32, 48):
        save_png(tile(plane_sq, s, white, scale=0.8), OUT / f"favicon-{s}.png")
    tile(plane_sq, 256, white, scale=0.8).save(
        PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )
    print("wrote", PUB / "favicon.ico")

    # App / PWA icons: white full-bleed square (safe for maskable cropping)
    save_png(tile(plane_sq, 512, white, full_bleed=True, scale=0.6), OUT / "icon-512.png")
    save_png(tile(plane_sq, 192, white, full_bleed=True, scale=0.6), OUT / "icon-192.png")
    save_png(tile(plane_sq, 180, white, full_bleed=True, scale=0.66), OUT / "apple-touch-icon.png")
    # TikTok / store listings ask for a square app icon (1024 px)
    save_png(tile(plane_sq, 1024, white, full_bleed=True, scale=0.6), OUT / "app-icon-1024.png")

    # Symbol + full lockup data for the social preview SVG
    (OUT / ".og-lockup.txt").write_text(png_data_uri(full_light.resize((900, round(full_light.height * 900 / full_light.width)), Image.LANCZOS)), encoding="utf-8")


if __name__ == "__main__":
    main()
