import type {
  ContentStatus, EraId, LocalizedText, LocationKind, MapTheme, SiteType,
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
  royal: { ar: 'التاريخ السعودي وعهود الملوك', en: 'Saudi History & the Kings' },
};

export const eraOrder: EraId[] = ['ancient', 'classical', 'islamic', 'maritime', 'unification', 'oil', 'modern'];

export const statusLabels: Record<ContentStatus, LocalizedText> = {
  demo: { ar: 'محتوى نموذجي', en: 'Sample' },
  draft: { ar: 'مسودة بانتظار المراجعة', en: 'Draft · pending review' },
  approved: { ar: 'معتمد', en: 'Approved' },
};
