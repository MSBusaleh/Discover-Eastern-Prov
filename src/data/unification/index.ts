import type { UnificationStage } from '@/types/content';

/**
 * UNIFICATION NARRATIVE — four stages (brief §7.1).
 * Stage titles and the years 1913 / 1932 come from the brief. Narrative text is
 * intentionally empty ("pending") until the verified content package arrives.
 */
const PENDING = { ar: '', en: '' };

export const unificationStages: UnificationStage[] = [
  {
    id: 'UNI-01', order: 1, status: 'demo',
    title: { ar: 'الخلفية التاريخية قبل عام 1913م', en: 'Historical background before 1913' },
    dateLabel: { ar: 'قبل 1913م', en: 'Before 1913' },
    summary: PENDING, locationIds: ['LOC-001', 'LOC-002'], personIds: [], eventIds: ['HIS-003', 'HIS-004'],
    sourceIds: [], imageIds: [],
  },
  {
    id: 'UNI-02', order: 2, status: 'demo',
    title: { ar: 'استعادة الأحساء عام 1913م', en: 'The recovery of Al-Ahsa in 1913' },
    dateLabel: { ar: '1913م', en: '1913' },
    summary: PENDING, locationIds: ['LOC-001'], personIds: [], eventIds: ['HIS-005'],
    sourceIds: [], imageIds: [],
  },
  {
    id: 'UNI-03', order: 3, status: 'demo',
    title: { ar: 'القطيف والتطورات اللاحقة', en: 'Qatif and subsequent developments' },
    dateLabel: { ar: '', en: '' },
    summary: PENDING, locationIds: ['LOC-002'], personIds: [], eventIds: [],
    sourceIds: [], imageIds: [],
  },
  {
    id: 'UNI-04', order: 4, status: 'demo',
    title: { ar: 'من أحداث الشرقية إلى إعلان المملكة عام 1932م', en: 'From the Eastern Province to the declaration of the Kingdom in 1932' },
    dateLabel: { ar: '1913م ← 1932م', en: '1913 → 1932' },
    summary: PENDING, locationIds: [], personIds: [], eventIds: ['HIS-005'],
    sourceIds: [], imageIds: [],
  },
];
