"""
Builds the social preview image (og-image.svg) for Manassa (منصة):
the official logo (prepared by process_logo.py) + the Arabic tagline,
with the tagline converted to vector paths so it does not depend on
installed fonts.

Usage (needs: pip install fonttools uharfbuzz pillow):
    python var/brand/process_logo.py
    python var/brand/generate_brand_assets.py
    node var/brand/rasterize.mjs
"""
import pathlib

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

TAGLINE_AR = "جدولة ونشر محتواك على كل المنصات من مكان واحد"
NAME_EN = "Manassa"

ROOT = pathlib.Path(__file__).resolve().parents[2]
FONT_DIR = ROOT / "apps/frontend/src/fonts/ibm-plex-sans-arabic"
OUT = ROOT / "apps/frontend/public/brand"


def text_path(text: str, font_file: str, size: float, rtl: bool):
    """Shape `text` with HarfBuzz and return (svg_path_d, width, ascent)."""
    path = str(FONT_DIR / font_file)
    font = hb.Font(hb.Face(hb.Blob.from_file_path(path)))
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    if rtl:
        buf.direction = "rtl"
    hb.shape(font, buf, {"kern": True, "liga": True})

    tt = TTFont(path)
    scale = size / tt["head"].unitsPerEm
    glyph_set = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    ascent = tt["hhea"].ascent * scale
    pen = SVGPathPen(glyph_set)
    x = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        t = TransformPen(
            pen,
            (scale, 0, 0, -scale, (x + pos.x_offset) * scale, ascent - pos.y_offset * scale),
        )
        glyph_set[order[info.codepoint]].draw(t)
        x += pos.x_advance
    return pen.getCommands(), x * scale, ascent


def main():
    lockup_uri = (OUT / ".og-lockup.txt").read_text(encoding="utf-8")
    # lockup is 900 px wide, ratio from logo-text.png (640 x 241)
    lw, lh = 720, round(720 * 241 / 640)
    tag_d, tag_w, _ = text_path(TAGLINE_AR, "IBMPlexSansArabic-Medium.ttf", 40, True)
    en_d, en_w, _ = text_path(NAME_EN, "IBMPlexSansArabic-SemiBold.ttf", 30, False)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="0.8" cy="0.15" r="1.1">
      <stop offset="0" stop-color="#2A1170"/>
      <stop offset="0.55" stop-color="#120733"/>
      <stop offset="1" stop-color="#0A0420"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1060" cy="90" r="260" fill="#6A2BF0" fill-opacity="0.16"/>
  <circle cx="120" cy="600" r="220" fill="#A66BFF" fill-opacity="0.08"/>
  <image x="{(1200 - lw) / 2}" y="110" width="{lw}" height="{lh}" xlink:href="{lockup_uri}"/>
  <path d="{tag_d}" fill="#DCD3FF" transform="translate({(1200 - tag_w) / 2} 420)"/>
  <rect x="{(1200 - 120) / 2}" y="500" width="120" height="6" rx="3" fill="#8B5CF6"/>
  <path d="{en_d}" fill="#9C8BD6" transform="translate({(1200 - en_w) / 2} 530)"/>
</svg>
"""
    (OUT / "og-image.svg").write_text(svg, encoding="utf-8")
    print("wrote", OUT / "og-image.svg")


if __name__ == "__main__":
    main()
