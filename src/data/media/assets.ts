/**
 * Resolves a media entry's `file` to something the browser can load.
 *
 * Photos live in src/assets/photos/<section>/… as WebP files prepared by
 * `npm run images` (see scripts/optimize-images.mjs), which also records each
 * photo's size and a tiny blurred preview in photos.json.
 * Kept apart from ./index.ts because import.meta.glob only exists under Vite.
 */
import photos from './photos.json';

export interface Photo {
  url: string;
  width?: number;
  height?: number;
  /** Tiny blurred preview (data URI) shown while the photo loads. */
  blur?: string;
}

const bundled = import.meta.glob<string>('../../assets/photos/**/*.webp', { eager: true, import: 'default' });
const manifest = photos as Record<string, { width: number; height: number; blur: string }>;

export function photoFor(file: string): Photo {
  const url = bundled[`../../assets/photos/${file}`];
  const p = manifest[file];
  // Anything that is not in src/assets/photos is treated as a path under public/.
  return url ? { url, width: p?.width, height: p?.height, blur: p?.blur } : { url: file };
}

/** Photos already requested, so each one is fetched once per visit. */
const requested = new Set<string>();

/**
 * Starts downloading photos in the background so they are ready (and in the
 * browser cache) before the visitor opens them.
 */
export function preloadPhotos(files: string[]) {
  for (const file of files) {
    const { url } = photoFor(file);
    if (requested.has(url)) continue;
    requested.add(url);
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  }
}
