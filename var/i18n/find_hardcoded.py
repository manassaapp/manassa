"""
Lists user-visible English text that is hard-coded in JSX (not passed
through t()), so it would stay English in the Arabic interface.

Usage: python var/i18n/find_hardcoded.py [--summary]
"""
import pathlib
import re
import sys
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = [ROOT / "apps/frontend/src", ROOT / "libraries/react-shared-libraries/src"]
# >Some text<   (text node with at least two latin words)
TEXT = re.compile(r">\s*([A-Za-z][A-Za-z'’,.!?:()\- ]{3,}[A-Za-z.!?:)])\s*<")
ATTR = re.compile(r"""\b(placeholder|title|aria-label|label)=["']([A-Z][A-Za-z'’ ,.!?\-]{3,})["']""")
SKIP_DIRS = {"locales", "icons"}
SKIP_FILES = ("preview", "admin", ".spec.", "legal.content")  # previews mimic platform UIs


def main():
    hits = []
    for base in SRC:
        for f in base.rglob("*.tsx"):
            if SKIP_DIRS & set(f.parts) or any(s in f.name for s in SKIP_FILES):
                continue
            for n, line in enumerate(f.read_text(encoding="utf-8").split("\n"), 1):
                st = line.strip()
                if st.startswith(("//", "*", "{/*")):
                    continue
                for m in TEXT.finditer(line):
                    txt = m.group(1).strip()
                    if len(txt.split()) >= 2 or txt[0].isupper():
                        hits.append((f.relative_to(ROOT).as_posix(), n, txt))
                for m in ATTR.finditer(line):
                    hits.append((f.relative_to(ROOT).as_posix(), n, f"{m.group(1)}={m.group(2)}"))
    if "--summary" in sys.argv:
        c = Counter(h[0] for h in hits)
        for f, k in c.most_common():
            print(f"{k:4d}  {f}")
    else:
        for h in hits:
            print(f"{h[0]}:{h[1]}: {h[2]}")
    print("TOTAL", len(hits))


if __name__ == "__main__":
    main()
