/**
 * Photo pipeline: run `npm run images` (it also runs before dev and every build).
 *
 * All photos live in src/assets/photos/<section>/…. For each one it:
 *   - converts it to WebP (max 1200 px on its longest side) if it isn't already
 *     a WebP within that size, replacing the original file in place;
 *   - records its size and a tiny blurred preview in src/data/media/photos.json,
 *     which the site shows while the real photo loads.
 *
 * To add a photo: drop the file (JPG, PNG, WebP…) into the right folder, run
 * `npm run images`, and refer to the resulting .webp name in the content files.
 */
import { mkdirSync, readdirSync, statSync, unlinkSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(root, 'src/assets/photos');
const MANIFEST = join(root, 'src/data/media/photos.json');
const MAX = 1200;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const p = join(dir, name);
  return statSync(p).isDirectory() ? walk(p) : EXT.has(extname(name).toLowerCase()) ? [p] : [];
});

mkdirSync(DIR, { recursive: true });
const manifest = {};
let converted = 0;

for (let file of walk(DIR).sort()) {
  const meta = await sharp(file).metadata();
  const isWebp = extname(file).toLowerCase() === '.webp';
  if (!isWebp || Math.max(meta.width ?? 0, meta.height ?? 0) > MAX) {
    const out = file.replace(/\.[^.]+$/, '.webp');
    const buffer = await sharp(file).rotate()
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    if (out !== file) unlinkSync(file);
    writeFileSync(out, buffer);
    console.log(`  optimised ${relative(DIR, file)} → ${relative(DIR, out)} (${(buffer.length / 1024).toFixed(0)} KB)`);
    file = out;
    converted++;
  }

  const { width, height } = await sharp(file).metadata();
  const tiny = await sharp(file).resize({ width: 24, height: 24, fit: 'inside' }).webp({ quality: 40 }).toBuffer();
  const key = relative(DIR, file).split('\\').join('/');            // "kings/king1.webp"
  manifest[key] = { width, height, blur: `data:image/webp;base64,${tiny.toString('base64')}` };
}

const json = JSON.stringify(manifest, null, 2) + '\n';
if (!existsSync(MANIFEST) || readFileSync(MANIFEST, 'utf8') !== json) writeFileSync(MANIFEST, json);
console.log(`Photos: ${Object.keys(manifest).length}${converted ? ` (${converted} optimised)` : ''}`);
