/**
 * Resolves a media entry's `file` to something the browser can load.
 *
 * Photos live as originals in images/<section>/… and are turned into small
 * WebP files by `npm run images` (see scripts/optimize-images.mjs). A media
 * entry keeps the original name (e.g. 'kings/king1.jpg'); photos.json maps it
 * to the optimised file, its size and a tiny blurred preview.
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
const manifest = photos as Record<string, { src: string; width: number; height: number; blur: string }>;

export function photoFor(file: string): Photo {
  const p = manifest[file];
  const url = p && bundled[`../../assets/photos/${p.src}`];
  // Anything not produced by the pipeline is treated as a path under public/.
  return url ? { url, width: p.width, height: p.height, blur: p.blur } : { url: file };
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
