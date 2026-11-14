# Renaming / rebranding منصة

Everything brand-related comes from one place.

| What | Where |
|---|---|
| Name (Arabic/English), tagline, colours, asset paths, legal details | `libraries/helpers/src/brand/brand.config.ts` |
| Official logo (source) | `var/brand/source/manassa-logo-original.png` (transparent PNG) |
| Generated logo files | `apps/frontend/public/brand/*` (+ `favicon.ico`, `favicon.png`, `logo.svg`, `logo-text.svg` in `public/`) |
| Web app manifest | `apps/frontend/public/manifest.webmanifest` (name/short name) |
| Theme colours (UI) | `apps/frontend/src/app/manassa.theme.scss` |
| Translations | `{{brand}}` inside `libraries/react-shared-libraries/src/translation/locales/*/translation.json` |
| Backend messages / e-mails | `BRAND_NAME` (English name from the config) |

## To rename

1. Edit `brand.name`, `brand.tagline` and `brand.legal` in `brand.config.ts`.
2. Edit `name` / `short_name` / `description` in `manifest.webmanifest`.
3. Replace `var/brand/source/manassa-logo-original.png` with the new logo (transparent PNG,
   about 1536×1024, symbol on the right). If the symbol you want for the favicon is not a
   paper plane at the same place, change `PLANE_BOX` in `var/brand/process_logo.py`.
4. Regenerate assets:
   ```bash
   pip install pillow fonttools uharfbuzz
   python var/brand/process_logo.py
   python var/brand/generate_brand_assets.py   # social preview text
   node var/brand/rasterize.mjs                # needs `sharp`
   ```
5. If the colours change, update `brand.colors` and the `--brand-*` / token values in
   `manassa.theme.scss` (keep white-on-primary contrast ≥ 4.5:1).
6. Rebuild the Docker image.
