// Rasterises the social preview (og-image.svg, made by
// generate_brand_assets.py) into og-image.png. All other PNG/ICO files are
// produced by process_logo.py from the official logo.
// Usage: node var/brand/rasterize.mjs   (needs the `sharp` package)
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dir = resolve(root, 'apps/frontend/public/brand');

const svg = await readFile(resolve(dir, 'og-image.svg'));
await sharp(svg, { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(resolve(dir, 'og-image.png'));
console.log('wrote', resolve(dir, 'og-image.png'));
