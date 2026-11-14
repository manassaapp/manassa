"""
Translation coverage check for Manassa.

Scans the frontend and shared React code for t('key', 'English default')
calls and reports keys that are missing from the English and Arabic locale
files. With --write-en it adds missing keys to the English file using the
default text from the code. With --merge FILE it merges a JSON file of
{key: arabic_text} into the Arabic locale.

Usage:
    python var/i18n/check_translations.py
    python var/i18n/check_translations.py --write-en
    python var/i18n/check_translations.py --dump-missing-ar missing.json
    python var/i18n/check_translations.py --merge ar_additions.json
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = [ROOT / "apps/frontend/src", ROOT / "libraries/react-shared-libraries/src"]
LOC = ROOT / "libraries/react-shared-libraries/src/translation/locales"

# t('key', 'default' | "default" | `default`)
CALL = re.compile(
    r"""\bt\(\s*['"]([a-zA-Z0-9_.-]+)['"]\s*,\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)""",
    re.S,
)
TRANSLATED_LABEL = re.compile(r"""label=["']([^"'{}]+)["']""")


def unquote(lit: str) -> str:
    q = lit[0]
    body = lit[1:-1]
    if q == "`":
        return body
    return bytes(body, "utf-8").decode("unicode_escape").encode("latin-1").decode("utf-8") if "\\" in body else body


def scan():
    found = {}
    for base in SRC:
        for f in base.rglob("*.ts*"):
            if "locales" in f.parts:
                continue
            s = f.read_text(encoding="utf-8")
            for m in CALL.finditer(s):
                key, lit = m.group(1), m.group(2)
                if "${" in lit:
                    continue
                try:
                    found.setdefault(key, unquote(lit))
                except Exception:
                    found.setdefault(key, lit[1:-1])
    return found


def load(lang):
    return json.loads((LOC / lang / "translation.json").read_text(encoding="utf-8"))


def save(lang, data):
    (LOC / lang / "translation.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n"
    )


def main():
    found = scan()
    en, ar = load("en"), load("ar")
    miss_en = {k: v for k, v in found.items() if k not in en}
    miss_ar = {k: v for k, v in found.items() if k not in ar}
    # keys present in en but not in ar
    for k, v in en.items():
        if k not in ar:
            miss_ar.setdefault(k, v)
    # Arabic values that are still identical to English (likely untranslated)
    same = [k for k, v in ar.items() if k in en and v == en[k] and re.search(r"[A-Za-z]{4,}", v)]
    print(f"t() keys in code: {len(found)}")
    print(f"missing in en: {len(miss_en)}")
    print(f"missing in ar: {len(miss_ar)}")
    print(f"ar identical to en (latin text): {len(same)}")
    args = sys.argv[1:]
    if "--write-en" in args:
        en.update(miss_en)
        save("en", en)
        print("added", len(miss_en), "keys to en")
    if "--dump-missing-ar" in args:
        out = pathlib.Path(args[args.index("--dump-missing-ar") + 1])
        out.write_text(json.dumps(miss_ar, ensure_ascii=False, indent=1), encoding="utf-8")
        print("wrote", out)
    if "--merge" in args:
        add = json.loads(pathlib.Path(args[args.index("--merge") + 1]).read_text(encoding="utf-8"))
        ar.update(add)
        save("ar", ar)
        print("merged", len(add), "keys into ar")
    if "--list-same" in args:
        for k in same:
            print(" ", k, "=", ar[k][:80])
    return 0 if not miss_ar else 1


if __name__ == "__main__":
    sys.exit(main())
