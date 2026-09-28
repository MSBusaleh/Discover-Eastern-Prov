/**
 * Bundled images under src/assets. A media entry's `file` may name one of these
 * by its path relative to src/assets (e.g. 'unification/unification1.jpg');
 * Vite fingerprints it, or inlines it in the single-file build.
 * Kept apart from ./index.ts because import.meta.glob only exists under Vite.
 */
const bundled = import.meta.glob<string>('../../assets/**/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

/** URL for a media file: a bundled asset if one matches, else the path as given (under /public). */
export function mediaUrl(file: string): string {
  return bundled[`../../assets/${file}`] ?? file;
}
