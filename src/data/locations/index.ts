import type { Location } from '@/types/content';

/**
 * LOCATIONS
 * ---------
 * Coordinates: every value below is copied from the source named in
 * `coordinates.sourceId` (consulted 2026-09-25). None are estimated.
 * Summaries: one short, sourced sentence each (status 'draft'), to be replaced
 * by the approved descriptions from the content package.
 *
 * To add a location (e.g. Hafr Al-Batin, Khafji, Abqaiq, Nairyah, Ras Al-Khair):
 *   1. Pick the next free ID (LOC-012 …).
 *   2. Set kind (governorate / city / island / site) and parentId if it sits
 *      inside another location.
 *   3. Add coordinates WITH a sourceId — or set `coordinates: null` to list it
 *      without a map marker until coordinates are verified.
 */
export const locations: Location[] = [
  {
    id: 'LOC-001',
    status: 'draft',
    name: { ar: 'الأحساء', en: 'Al-Ahsa' },
    kind: 'governorate',
    coordinates: {
      lat: 25.383,
      lng: 49.583,
      sourceId: 'SRC-001',
      review: 'verified-against-source',
      note: { ar: 'العلامة موضوعة عند مدينة الهفوف، المدينة الرئيسة في المحافظة', en: 'Marker placed at Al-Hofuf, the governorate’s main city' },
    },
    themes: ['history', 'culture', 'nature'],
    summary: {
      ar: 'محافظة تتمحور حول واحة الأحساء، ومدينتها الرئيسة الهفوف.',
      en: 'A governorate centred on the Al-Ahsa oasis; Al-Hofuf is its main city.',
    },
    sourceIds: ['SRC-001'],
    imageIds: [],
  },
  {
    id: 'LOC-011',
    status: 'draft',
    name: { ar: 'قصر إبراهيم', en: 'Ibrahim Palace' },
    kind: 'site',
    siteType: 'historical-landmark',
    parentId: 'LOC-001',
    coordinates: { lat: 25.37883, lng: 49.58692, sourceId: 'SRC-011', review: 'verified-against-source' },
    themes: ['history'],
    summary: {
      ar: 'حصن تاريخي في الهفوف يعود إلى الحقبة العثمانية.',
      en: 'A historic fort in Al-Hofuf dating from the Ottoman period.',
    },
    sourceIds: ['SRC-011', 'SRC-012'],
    imageIds: [],
  },
  {
    id: 'LOC-010',
    status: 'draft',
    name: { ar: 'العقير', en: 'Al-Uqair' },
    kind: 'site',
    siteType: 'historic-port',
    parentId: 'LOC-001',
    coordinates: { lat: 25.64417, lng: 50.215, sourceId: 'SRC-010', review: 'verified-against-source' },
    themes: ['history', 'nature'],
    summary: {
      ar: 'ميناء تاريخي على ساحل الخليج العربي ضمن محافظة الأحساء.',
      en: 'A historic seaport on the Arabian Gulf coast, within Al-Ahsa Governorate.',
    },
    sourceIds: ['SRC-010'],
    imageIds: [],
  },
  {
    id: 'LOC-002',
    status: 'draft',
    name: { ar: 'القطيف', en: 'Qatif' },
    kind: 'governorate',
    coordinates: { lat: 26.556, lng: 49.996, sourceId: 'SRC-002', review: 'verified-against-source' },
    themes: ['history', 'culture'],
    summary: {
      ar: 'محافظة ساحلية تضم مدن القطيف وصفوى وسيهات وجزيرة تاروت.',
      en: 'A coastal governorate that includes Qatif City, Safwa, Saihat and Tarout Island.',
    },
    sourceIds: ['SRC-002'],
    imageIds: [],
  },
  {
    id: 'LOC-003',
    status: 'draft',
    name: { ar: 'جزيرة تاروت', en: 'Tarout Island' },
    kind: 'island',
    parentId: 'LOC-002',
    coordinates: { lat: 26.571, lng: 50.056, sourceId: 'SRC-003', review: 'verified-against-source' },
    themes: ['history', 'culture'],
    summary: {
      ar: 'جزيرة في الخليج العربي تتبع محافظة القطيف، وتتصل باليابسة عبر جسور.',
      en: 'An island in the Arabian Gulf within Qatif Governorate, linked to the mainland by causeways.',
    },
    sourceIds: ['SRC-003'],
    imageIds: [],
  },
  {
    id: 'LOC-005',
    status: 'draft',
    name: { ar: 'الدمام', en: 'Dammam' },
    kind: 'city',
    coordinates: { lat: 26.433, lng: 50.1, sourceId: 'SRC-005', review: 'verified-against-source' },
    themes: ['energy'],
    summary: {
      ar: 'مقر إمارة المنطقة الشرقية وأكبر مدنها، ومدينة ميناء على الخليج العربي.',
      en: 'The seat and largest city of the Eastern Province, and a port city on the Arabian Gulf.',
    },
    sourceIds: ['SRC-005'],
    imageIds: [],
  },
  {
    id: 'LOC-004',
    status: 'draft',
    name: { ar: 'الظهران', en: 'Dhahran' },
    kind: 'city',
    coordinates: { lat: 26.267, lng: 50.15, sourceId: 'SRC-004', review: 'verified-against-source' },
    themes: ['energy'],
    summary: {
      ar: 'مقر أرامكو السعودية، وتضم جامعة الملك فهد للبترول والمعادن.',
      en: 'Home to Saudi Aramco’s headquarters and King Fahd University of Petroleum and Minerals.',
    },
    sourceIds: ['SRC-004'],
    imageIds: [],
  },
  {
    id: 'LOC-006',
    status: 'draft',
    name: { ar: 'الخبر', en: 'Al-Khobar' },
    kind: 'city',
    coordinates: { lat: 26.283, lng: 50.2, sourceId: 'SRC-006', review: 'verified-against-source' },
    themes: ['nature'],
    summary: {
      ar: 'مدينة ساحلية يمتد منها جسر الملك فهد إلى مملكة البحرين.',
      en: 'A coastal city and the starting point of the King Fahd Causeway to Bahrain.',
    },
    sourceIds: ['SRC-006'],
    imageIds: [],
  },
  {
    id: 'LOC-007',
    status: 'draft',
    name: { ar: 'الجبيل', en: 'Jubail' },
    kind: 'city',
    coordinates: { lat: 27.0, lng: 49.65444, sourceId: 'SRC-007', review: 'verified-against-source' },
    themes: ['energy', 'history'],
    summary: {
      ar: 'مدينة صناعية على ساحل الخليج، اختيرت عام 1975م موقعًا لمدينة الجبيل الصناعية.',
      en: 'An industrial city on the Gulf coast, chosen in 1975 as the site of Jubail Industrial City.',
    },
    sourceIds: ['SRC-007'],
    imageIds: [],
  },
  {
    id: 'LOC-008',
    status: 'draft',
    name: { ar: 'رأس تنورة', en: 'Ras Tanura' },
    kind: 'governorate',
    coordinates: { lat: 26.633, lng: 50.15, sourceId: 'SRC-008', review: 'verified-against-source' },
    themes: ['energy'],
    summary: {
      ar: 'محافظة على شبه جزيرة رأس تنورة، تضم مصفاة نفط وميناءً بحريًا لتصدير النفط.',
      en: 'A governorate on the Ras Tanura peninsula with an oil refinery and marine export terminal.',
    },
    sourceIds: ['SRC-008'],
    imageIds: [],
  },
  {
    id: 'LOC-009',
    status: 'draft',
    name: { ar: 'ثاج', en: 'Thaj' },
    kind: 'site',
    siteType: 'archaeological-site',
    coordinates: {
      lat: 26.871643,
      lng: 48.7202923,
      sourceId: 'SRC-009',
      review: 'needs-review',
      note: {
        ar: 'تختلف الإحداثيات بين المصادر (ويكيبيديا وويكي بيانات) بنحو 5 كم — يلزم التحقق.',
        en: 'Sources disagree by about 5 km (Wikipedia vs Wikidata) — needs verification.',
      },
    },
    themes: ['history'],
    summary: {
      ar: 'موقع أثري ومدينة قديمة غرب الجبيل، ترتبط بالحقبة الهلنستية.',
      en: 'An archaeological site and ancient town west of Jubail, associated with the Hellenistic era.',
    },
    sourceIds: ['SRC-009', 'SRC-013'],
    imageIds: [],
  },
];
