import type { MediaAsset } from '@/types/content';

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
    file: null, // e.g. 'images/locations/al-ahsa-oasis.webp' (put the file in public/images/...)
    alt: { ar: 'نص بديل يصف الصورة', en: 'Alternative text describing the image' },
    caption: { ar: 'تعليق الصورة', en: 'Image caption' },
    sourceUrl: undefined,
    rightsHolder: undefined,
    license: undefined,
    attribution: undefined,
    accuracyReview: 'pending',
    rightsReview: 'pending',
  },
];

export const mediaById = new Map(media.map((m) => [m.id, m]));

export function isDisplayable(m: MediaAsset | undefined): m is MediaAsset & { file: string } {
  return !!m && m.file !== null && m.accuracyReview === 'approved' && m.rightsReview === 'approved';
}
