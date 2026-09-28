import type { HistoricalEvent } from '@/types/content';

/**
 * TIMELINE ENTRIES
 * ----------------
 * These are DEMONSTRATION entries built from the themes listed in the brief
 * (§6.2). They carry theme titles only: no invented dates, rulers or narrative.
 * Empty `summary` strings render as a clearly marked "pending" block.
 *
 * Replace each with an approved event from the content package (keep or reuse
 * the IDs so links elsewhere keep working).
 */
const TBC = { ar: '', en: '' }; // empty = date not confirmed yet (hidden on screen)
const PENDING = { ar: '', en: '' };

export const historicalEvents: HistoricalEvent[] = [
  {
    id: 'HIS-001', status: 'demo', era: 'ancient', sortYear: null, dateLabel: TBC,
    title: { ar: 'الاستيطان البشري القديم في جزيرة تاروت', en: 'Ancient settlement on Tarout Island' },
    summary: PENDING, locationIds: ['LOC-003'], personIds: [], sourceIds: [], imageIds: [],
  },
  {
    id: 'HIS-002', status: 'demo', era: 'classical', sortYear: null, dateLabel: TBC,
    title: { ar: 'ثاج مركزًا تجاريًا وحضريًا قديمًا', en: 'Thaj as an ancient commercial and urban centre' },
    summary: PENDING, locationIds: ['LOC-009'], personIds: ['PER-002'], sourceIds: [], imageIds: [],
  },
  {
    id: 'HIS-003', status: 'demo', era: 'islamic', sortYear: null, dateLabel: TBC,
    title: { ar: 'المنطقة في العصور الإسلامية', en: 'The region in the Islamic periods' },
    summary: PENDING, locationIds: ['LOC-001', 'LOC-002'], personIds: ['PER-001'], sourceIds: [], imageIds: [],
  },
  {
    id: 'HIS-004', status: 'demo', era: 'maritime', sortYear: null, dateLabel: TBC,
    title: { ar: 'التجارة البحرية والروابط عبر الخليج العربي', en: 'Maritime trade and links across the Arabian Gulf' },
    summary: PENDING, locationIds: ['LOC-010', 'LOC-002'], personIds: [], sourceIds: [], imageIds: [],
  },
  {
    id: 'HIS-005', status: 'draft', era: 'unification', sortYear: 1913,
    dateLabel: { ar: '1913م', en: '1913' },
    title: { ar: 'انضمام الأحساء إلى الدولة السعودية', en: 'Al-Ahsa joins the Saudi state' },
    summary: PENDING, locationIds: ['LOC-001'], personIds: [], sourceIds: ['SRC-001'], imageIds: [],
    relatedIds: ['UNI-02'],
  },
  {
    id: 'HIS-006', status: 'demo', era: 'oil', sortYear: null, dateLabel: TBC,
    title: { ar: 'نشأة صناعة النفط', en: 'The beginnings of the oil industry' },
    summary: PENDING, locationIds: ['LOC-004', 'LOC-008'], personIds: ['PER-004'], sourceIds: [], imageIds: [],
    relatedIds: ['RV-001'],
  },
  {
    id: 'HIS-007', status: 'demo', era: 'modern', sortYear: null, dateLabel: TBC,
    title: { ar: 'تأسيس المدن الصناعية الحديثة', en: 'Founding of the modern industrial cities' },
    summary: PENDING, locationIds: ['LOC-007'], personIds: ['PER-005'], sourceIds: [], imageIds: [],
  },
  {
    id: 'HIS-008', status: 'demo', era: 'modern', sortYear: null, dateLabel: TBC,
    title: { ar: 'تطور النقل والربط الإقليمي', en: 'Transport and regional connectivity' },
    summary: PENDING, locationIds: ['LOC-006', 'LOC-005'], personIds: [], sourceIds: [], imageIds: [],
    relatedIds: ['CT-002'],
  },
  {
    id: 'HIS-009', status: 'demo', era: 'modern', sortYear: null, dateLabel: TBC,
    title: { ar: 'الاعتراف بالتراث الثقافي والمحافظة عليه', en: 'Recognising and preserving cultural heritage' },
    summary: PENDING, locationIds: ['LOC-001', 'LOC-011'], personIds: ['PER-003'], sourceIds: [], imageIds: [],
  },
];
