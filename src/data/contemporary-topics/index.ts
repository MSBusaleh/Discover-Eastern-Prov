import type { ContemporaryTopic, LocalizedText, TopicCategoryId } from '@/types/content';

export const topicCategories: { id: TopicCategoryId; label: LocalizedText; blurb: LocalizedText }[] = [
  { id: 'tourism', label: { ar: 'السياحة والاستكشاف', en: 'Tourism & Exploration' }, blurb: { ar: 'معالم ثقافية ووجهات تاريخية وترفيه', en: 'Cultural sights, historic destinations, entertainment' } },
  { id: 'nature', label: { ar: 'الطبيعة والمغامرة', en: 'Nature & Adventure' }, blurb: { ar: 'واحات وسواحل وصحارى وأنشطة خارجية', en: 'Oases, coastlines, desert and the outdoors' } },
  { id: 'culture', label: { ar: 'الثقافة والتراث', en: 'Culture & Heritage' }, blurb: { ar: 'أطعمة وحرف وأسواق تاريخية', en: 'Food, crafts and historic markets' } },
  { id: 'energy', label: { ar: 'الطاقة والصناعة', en: 'Energy & Industry' }, blurb: { ar: 'النفط والغاز والبتروكيماويات والخدمات اللوجستية', en: 'Oil and gas, petrochemicals, logistics' } },
  { id: 'education', label: { ar: 'التعليم والابتكار', en: 'Education & Innovation' }, blurb: { ar: 'جامعات ومراكز أبحاث وابتكار', en: 'Universities, research and innovation' } },
  { id: 'business', label: { ar: 'الأعمال والاستثمار', en: 'Business & Investment' }, blurb: { ar: 'قطاعات اقتصادية وفرص أعمال', en: 'Economic sectors and opportunities' } },
  { id: 'lifestyle', label: { ar: 'جودة الحياة', en: 'Lifestyle & Quality of Life' }, blurb: { ar: 'واجهات بحرية وترفيه وخدمات وحياة حضرية', en: 'Waterfronts, recreation, services, city life' } },
  { id: 'connectivity', label: { ar: 'الربط الإقليمي', en: 'Regional Connectivity' }, blurb: { ar: 'روابط الشرقية مع دول الخليج المجاورة', en: 'Links with neighbouring Gulf countries' } },
];

/**
 * TOPICS
 * 'draft' items carry one sourced sentence each and need content-team review.
 * 'demo' items are empty samples that show the in-progress / announced stages.
 */
const PENDING = { ar: '', en: '' };

export const contemporaryTopics: ContemporaryTopic[] = [
  {
    id: 'CT-001', status: 'draft', stage: 'existing', categoryIds: ['education'],
    title: { ar: 'جامعة الملك فهد للبترول والمعادن', en: 'King Fahd University of Petroleum and Minerals' },
    summary: { ar: 'جامعة تقع في الظهران.', en: 'A university located in Dhahran.' },
    locationIds: ['LOC-004'], sourceIds: ['SRC-004'], imageIds: [],
  },
  {
    id: 'CT-002', status: 'draft', stage: 'existing', categoryIds: ['connectivity'],
    title: { ar: 'جسر الملك فهد', en: 'King Fahd Causeway' },
    summary: {
      ar: 'سلسلة جسور وطرق تربط المملكة العربية السعودية بمملكة البحرين من الخبر، افتُتحت رسميًا في 25 نوفمبر 1986م.',
      en: 'A series of causeways and bridges linking Saudi Arabia with Bahrain from Al-Khobar, officially opened on 25 November 1986.',
    },
    locationIds: ['LOC-006'], sourceIds: ['SRC-006'], imageIds: [],
  },
  {
    id: 'CT-003', status: 'draft', stage: 'existing', categoryIds: ['energy', 'business'],
    title: { ar: 'مدينة الجبيل الصناعية', en: 'Jubail Industrial City' },
    summary: {
      ar: 'اختارت الحكومة الجبيل عام 1975م موقعًا لمدينة صناعية جديدة.',
      en: 'In 1975 the Saudi government designated Jubail as the site of a new industrial city.',
    },
    locationIds: ['LOC-007'], sourceIds: ['SRC-007'], imageIds: [], relatedIds: ['HIS-007'],
  },
  {
    id: 'CT-004', status: 'draft', stage: 'existing', categoryIds: ['culture', 'tourism'],
    title: { ar: 'مركز الملك عبدالعزيز الثقافي العالمي (إثراء)', en: 'King Abdulaziz Center for World Culture (Ithra)' },
    summary: {
      ar: 'مركز ثقافي في الظهران يضم متحفًا ومكتبة وقاعات عرض.',
      en: 'A cultural centre in Dhahran with a museum, library and exhibition halls.',
    },
    locationIds: ['LOC-004'], sourceIds: ['SRC-004', 'SRC-005'], imageIds: [],
  },
  {
    id: 'CT-005', status: 'draft', stage: 'existing', categoryIds: ['lifestyle', 'tourism'],
    title: { ar: 'كورنيش الخبر', en: 'Al-Khobar Corniche' },
    summary: {
      ar: 'واجهة بحرية بطول نحو 16 كم على ساحل الخليج العربي.',
      en: 'A waterfront of about 16 km along the Arabian Gulf coast.',
    },
    locationIds: ['LOC-006'], sourceIds: ['SRC-006'], imageIds: [],
  },
  {
    id: 'CT-006', status: 'draft', stage: 'existing', categoryIds: ['lifestyle', 'connectivity'],
    title: { ar: 'شبكة النقل العام بالحافلات', en: 'Public bus network' },
    summary: {
      ar: 'أُطلقت عام 2023م وتخدم الدمام والخبر والقطيف والظهران.',
      en: 'Launched in 2023, serving Dammam, Al-Khobar, Qatif and Dhahran.',
    },
    locationIds: ['LOC-005', 'LOC-006', 'LOC-002', 'LOC-004'], sourceIds: ['SRC-005'], imageIds: [],
  },
  {
    id: 'CT-007', status: 'draft', stage: 'existing', categoryIds: ['business', 'connectivity'],
    title: { ar: 'ميناء الملك عبدالعزيز', en: 'King Abdulaziz Port' },
    summary: { ar: 'ميناء على ساحل الخليج العربي في الدمام.', en: 'A port on the Arabian Gulf coast in Dammam.' },
    locationIds: ['LOC-005'], sourceIds: ['SRC-005'], imageIds: [],
  },
  {
    id: 'CT-008', status: 'demo', stage: 'in-progress', categoryIds: ['nature', 'tourism'],
    title: { ar: 'مثال: مشروع قيد التطوير', en: 'Example: a project under development' },
    summary: PENDING, locationIds: [], sourceIds: [], imageIds: [],
  },
  {
    id: 'CT-009', status: 'demo', stage: 'announced', categoryIds: ['business', 'energy'],
    title: { ar: 'مثال: مبادرة مستقبلية معلنة رسميًا', en: 'Example: an officially announced future initiative' },
    summary: PENDING, locationIds: [], sourceIds: [], imageIds: [],
  },
  {
    id: 'CT-010', status: 'demo', stage: 'existing', categoryIds: ['nature', 'culture'],
    title: { ar: 'مثال: تجربة في واحة الأحساء', en: 'Example: an Al-Ahsa oasis experience' },
    summary: PENDING, locationIds: ['LOC-001'], sourceIds: [], imageIds: [],
  },
];
