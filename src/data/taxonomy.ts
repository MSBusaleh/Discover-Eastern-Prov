import type {
  ContentStatus, DevelopmentStage, EraId, LocalizedText, LocationKind, MapTheme, OriginType, PersonField, SiteType,
} from '@/types/content';

/** Bilingual labels for every controlled vocabulary used by the content model. */

export const kindLabels: Record<LocationKind, LocalizedText> = {
  governorate: { ar: 'محافظة', en: 'Governorate' },
  city: { ar: 'مدينة', en: 'City' },
  island: { ar: 'جزيرة', en: 'Island' },
  site: { ar: 'موقع', en: 'Site' },
};

export const siteTypeLabels: Record<SiteType, LocalizedText> = {
  'historical-landmark': { ar: 'معلم تاريخي', en: 'Historical landmark' },
  'archaeological-site': { ar: 'موقع أثري', en: 'Archaeological site' },
  'historic-port': { ar: 'ميناء تاريخي', en: 'Historic port' },
  cultural: { ar: 'معلم ثقافي', en: 'Cultural landmark' },
  natural: { ar: 'معلم طبيعي', en: 'Natural attraction' },
  industrial: { ar: 'موقع صناعي', en: 'Industrial site' },
};

export const themeOrder: MapTheme[] = ['history', 'culture', 'nature', 'energy', 'royal'];

export const themeLabels: Record<MapTheme, LocalizedText> = {
  history: { ar: 'التاريخ والآثار', en: 'History & Archaeology' },
  culture: { ar: 'الثقافة والتراث', en: 'Culture & Heritage' },
  nature: { ar: 'الطبيعة والسياحة', en: 'Nature & Tourism' },
  energy: { ar: 'الطاقة والصناعة', en: 'Energy & Industry' },
  people: { ar: 'شخصيات', en: 'Historical Figures' },
  royal: { ar: 'التاريخ السعودي وعهود الملوك', en: 'Saudi History & the Kings' },
};

export const eraOrder: EraId[] = ['ancient', 'classical', 'islamic', 'maritime', 'unification', 'oil', 'modern'];

export const eraLabels: Record<EraId, LocalizedText> = {
  ancient: { ar: 'الحضارات القديمة', en: 'Ancient civilisations' },
  classical: { ar: 'المراكز التجارية القديمة', en: 'Ancient trade centres' },
  islamic: { ar: 'العصور الإسلامية', en: 'Islamic periods' },
  maritime: { ar: 'التجارة البحرية', en: 'Maritime trade' },
  unification: { ar: 'التوحيد', en: 'Unification' },
  oil: { ar: 'عصر النفط', en: 'The oil era' },
  modern: { ar: 'الشرقية الحديثة', en: 'The modern province' },
};

export const fieldLabels: Record<PersonField, LocalizedText> = {
  'ancient-islamic': { ar: 'التاريخ القديم والإسلامي', en: 'Ancient & Islamic history' },
  unification: { ar: 'توحيد المملكة', en: 'Unification of Saudi Arabia' },
  'literature-heritage': { ar: 'الأدب والتراث', en: 'Literature & heritage' },
  'science-education': { ar: 'العلوم والتعليم', en: 'Science & education' },
  'energy-industry': { ar: 'الطاقة والصناعة', en: 'Energy & industry' },
  'administration-business': { ar: 'الإدارة وريادة الأعمال', en: 'Administration & business' },
  innovation: { ar: 'الابتكار المعاصر', en: 'Contemporary innovation' },
};

export const originLabels: Record<OriginType, { label: LocalizedText; hint: LocalizedText }> = {
  'from-region': {
    label: { ar: 'من أبناء الشرقية', en: 'From the Eastern Province' },
    hint: { ar: 'مولده أو نشأته أو أصله في المنطقة موثّق', en: 'Documented birthplace, upbringing or origin in the region' },
  },
  associated: {
    label: { ar: 'ارتبطت مسيرته بالشرقية', en: 'Career linked to the region' },
    hint: { ar: 'درس أو عمل أو أسهم في المنطقة، وليس بالضرورة من أبنائها', en: 'Studied, worked or contributed here; not necessarily from the region' },
  },
};

export const stageLabels: Record<DevelopmentStage, LocalizedText> = {
  existing: { ar: 'قائم حاليًا', en: 'Existing' },
  'in-progress': { ar: 'قيد التطوير', en: 'Under development' },
  announced: { ar: 'مبادرة مستقبلية معلنة', en: 'Announced plan' },
};

export const statusLabels: Record<ContentStatus, LocalizedText> = {
  demo: { ar: 'محتوى نموذجي', en: 'Sample' },
  draft: { ar: 'مسودة بانتظار المراجعة', en: 'Draft · pending review' },
  approved: { ar: 'معتمد', en: 'Approved' },
};
