import type { MediaAsset } from '@/types/content';
import { unificationImages } from '../unification';
import { timelineImages } from '../historical-events';
import { kingImages } from '../kings';

/**
 * Image registry (brief §15.4). The prototype ships NO external photographs.
 *
 * An image is only rendered when:
 *   file !== null && accuracyReview === 'approved' && rightsReview === 'approved'
 * Otherwise the component shows a designed placeholder instead.
 *
 * IMG-001 is a template entry showing every field. Copy it for each new image.
 */
export const media: MediaAsset[] = [
  {
    id: 'IMG-001',
    file: null, // a path under src/assets (e.g. 'unification/unification1.jpg') or under public/
    alt: { ar: 'نص بديل يصف الصورة', en: 'Alternative text describing the image' },
    caption: { ar: 'تعليق الصورة', en: 'Image caption' },
    sourceUrl: undefined,
    rightsHolder: undefined,
    license: undefined,
    attribution: undefined,
    accuracyReview: 'pending',
    rightsReview: 'pending',
  },
  ...unificationImages,
  ...timelineImages,
  ...kingImages,
];

export const mediaById = new Map(media.map((m) => [m.id, m]));

/** Short credit line for an image: its attribution, or the website it came from. */
export function creditOf(m: MediaAsset): string | null {
  if (m.attribution) return m.attribution;
  if (m.sourceUrl) return new URL(m.sourceUrl).hostname.replace(/^www\./, '');
  return null;
}

export function isDisplayable(m: MediaAsset | undefined): m is MediaAsset & { file: string } {
  return !!m && m.file !== null && m.accuracyReview === 'approved' && m.rightsReview === 'approved';
}
