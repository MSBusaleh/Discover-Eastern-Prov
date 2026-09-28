import type { King, RoyalVisit } from '@/types/content';

/** Kings of Saudi Arabia, in reign order. */
export const kings: King[] = [
  { id: 'KING-01', order: 1, name: { ar: 'الملك عبدالعزيز', en: 'King Abdulaziz' } },
  { id: 'KING-02', order: 2, name: { ar: 'الملك سعود', en: 'King Saud' } },
  { id: 'KING-03', order: 3, name: { ar: 'الملك فيصل', en: 'King Faisal' } },
  { id: 'KING-04', order: 4, name: { ar: 'الملك خالد', en: 'King Khalid' } },
  { id: 'KING-05', order: 5, name: { ar: 'الملك فهد', en: 'King Fahd' } },
  { id: 'KING-06', order: 6, name: { ar: 'الملك عبدالله', en: 'King Abdullah' } },
  { id: 'KING-07', order: 7, name: { ar: 'الملك سلمان', en: 'King Salman' } },
];

/**
 * ROYAL VISITS — SAMPLE CARDS ONLY.
 * These show how a visit card, the filters and the map links work. They are
 * NOT records of real visits: date, occasion and description are left pending,
 * and every card is labelled "Sample". Replace them with documented visits.
 */
const TBC = { ar: '', en: '' }; // empty = date not confirmed yet (hidden on screen)
const PENDING = { ar: '', en: '' };

export const royalVisits: RoyalVisit[] = [
  {
    id: 'RV-001', status: 'demo', kingId: 'KING-01', dateLabel: TBC, sortYear: null,
    locationIds: ['LOC-008'],
    occasion: { ar: 'بطاقة نموذجية: زيارة مرتبطة بقطاع الطاقة', en: 'Sample card: an energy-related visit' },
    summary: PENDING, relatedIds: ['HIS-006'], sourceIds: [], imageIds: [],
  },
  {
    id: 'RV-002', status: 'demo', kingId: 'KING-05', dateLabel: TBC, sortYear: null,
    locationIds: ['LOC-006'],
    occasion: { ar: 'بطاقة نموذجية: زيارة مرتبطة بمشروع بنية تحتية', en: 'Sample card: an infrastructure-related visit' },
    summary: PENDING, relatedIds: ['CT-002'], sourceIds: [], imageIds: [],
  },
  {
    id: 'RV-003', status: 'demo', kingId: 'KING-07', dateLabel: TBC, sortYear: null,
    locationIds: ['LOC-001'],
    occasion: { ar: 'بطاقة نموذجية: زيارة مرتبطة بالتراث', en: 'Sample card: a heritage-related visit' },
    summary: PENDING, sourceIds: [], imageIds: [],
  },
];
