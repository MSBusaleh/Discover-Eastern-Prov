/**
 * Photo pipeline: run `npm run images` (it also runs before every build).
 *
 * Reads the original photos in images/<section>/… and writes, for each one:
 *   - src/assets/photos/<section>/<name>.webp — resized (max 1200 px) and compressed
 *   - an entry in src/data/media/photos.json with its size and a tiny blurred
 *     preview (a data URI) that is shown while the real photo loads.
 *
 * Content files keep referring to the original name (e.g. "kings/king1.jpg").
 * Unchanged photos are skipped, so re-running is fast.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'images');
const OUT = join(root, 'src/assets/photos');
const MANIFEST = join(root, 'src/data/media/photos.json');
const MAX = 1200;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const p = join(dir, name);
  return statSync(p).isDirectory() ? walk(p) : EXT.has(extname(name).toLowerCase()) ? [p] : [];
});

const old = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const manifest = {};
let made = 0;

for (const file of walk(SRC)) {
  const key = relative(SRC, file).split('\\').join('/');            // "kings/king1.jpg"
  const webp = key.replace(/\.[^.]+$/, '.webp');                    // "kings/king1.webp"
  const out = join(OUT, webp);

  if (old[key] && existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs) {
    manifest[key] = old[key];
    continue;
  }

  mkdirSync(dirname(out), { recursive: true });
  const info = await sharp(file).rotate()
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(out);
  const tiny = await sharp(file).rotate().resize({ width: 24, height: 24, fit: 'inside' }).webp({ quality: 40 }).toBuffer();

  manifest[key] = {
    src: webp,
    width: info.width,
    height: info.height,
    blur: `data:image/webp;base64,${tiny.toString('base64')}`,
  };
  made++;
  console.log(`  ${key} → ${webp}  ${(statSync(file).size / 1024).toFixed(0)} KB → ${(info.size / 1024).toFixed(0)} KB`);
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Photos: ${Object.keys(manifest).length} (${made} updated)`);
