/**
 * Content model for "Discover the Eastern Province".
 *
 * Every content item:
 *  - has a unique, prefixed ID (LOC-001, HIS-001, PER-001, ...). IDs are the ONLY
 *    thing used to link items to each other.
 *  - carries separate Arabic and English text (`LocalizedText`).
 *  - carries a `status` so demo / draft material can be hidden from the public
 *    build with one config change (see src/config/site.ts).
 *  - references its evidence by source ID (`sourceIds`) and its images by image ID
 *    (`imageIds`). Sources and images live in their own registries.
 */

export type Lang = 'ar' | 'en';

export interface LocalizedText {
  ar: string;
  en: string;
}

/**
 * demo     = placeholder / sample structure. Must be replaced. Never factual.
 * draft    = sourced text written for the prototype, awaiting content-team review.
 * approved = final, verified content supplied by the content team.
 */
export type ContentStatus = 'demo' | 'draft' | 'approved';

interface BaseItem {
  id: string;
  status: ContentStatus;
  /** IDs from src/data/sources */
  sourceIds: string[];
  /** IDs from src/data/media. Empty → an approved placeholder is shown. */
  imageIds: string[];
}

/* ------------------------------------------------------------------ */
/* Locations                                                            */
/* ------------------------------------------------------------------ */

/**
 * Geographic hierarchy. A governorate contains cities; cities/governorates
 * contain sites. `parentId` expresses the hierarchy.
 */
export type LocationKind = 'governorate' | 'city' | 'island' | 'site';

/** For `kind: 'site'` only — what sort of place it is. */
export type SiteType =
  | 'historical-landmark'
  | 'archaeological-site'
  | 'historic-port'
  | 'cultural'
  | 'natural'
  | 'industrial';

/** Map filter themes (brief §5.4). `people` and `royal` are derived automatically. */
export type MapTheme = 'history' | 'culture' | 'nature' | 'energy' | 'people' | 'royal';

export interface Coordinates {
  lat: number;
  lng: number;
  /** Where these numbers came from (source ID). Required: no invented coordinates. */
  sourceId: string;
  /** 'needs-review' shows a visible warning on the card. */
  review: 'verified-against-source' | 'needs-review';
  /** Optional explanation, e.g. "marker placed at the governorate seat". */
  note?: LocalizedText;
}

export interface Location extends BaseItem {
  name: LocalizedText;
  kind: LocationKind;
  siteType?: SiteType;
  parentId?: string;
  /** null → listed in the location list but not drawn on the map. */
  coordinates: Coordinates | null;
  /** Manually assigned themes. `people`/`royal` are added automatically from relations. */
  themes: MapTheme[];
  summary: LocalizedText;
  /** Extra linked items that aren't reachable by reverse lookup (optional). */
  relatedIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Timeline                                                             */
/* ------------------------------------------------------------------ */

export type EraId = 'ancient' | 'classical' | 'islamic' | 'maritime' | 'unification' | 'oil' | 'modern';

export interface HistoricalEvent extends BaseItem {
  title: LocalizedText;
  /** Display label for the date or period, e.g. "1913" or "3rd c. BCE". */
  dateLabel: LocalizedText;
  /** Numeric year for sorting (negative = BCE). null → sorted by era order only. */
  sortYear: number | null;
  era: EraId;
  summary: LocalizedText;
  locationIds: string[];
  personIds: string[];
  relatedIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Unification narrative                                                */
/* ------------------------------------------------------------------ */

export interface UnificationStage extends BaseItem {
  order: number;
  title: LocalizedText;
  dateLabel: LocalizedText;
  summary: LocalizedText;
  locationIds: string[];
  personIds: string[];
  eventIds: string[];
}

/* ------------------------------------------------------------------ */
/* Kings: the Eastern Province reign by reign                            */
/* ------------------------------------------------------------------ */

export interface Milestone {
  /** Shown as written, e.g. "1938" or "1973 - 1974". */
  year: string;
  text: LocalizedText;
}

export interface KingReign extends BaseItem {
  /** Reign order, used for sorting. */
  order: number;
  name: LocalizedText;
  /** Reign years, e.g. "1932 – 1953". */
  reign: LocalizedText;
  /** One-line theme of the reign in the region. */
  title: LocalizedText;
  summary: LocalizedText;
  milestones: Milestone[];
  locationIds: string[];
  relatedIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Personalities                                                        */
/* ------------------------------------------------------------------ */

export type PersonField =
  | 'ancient-islamic'
  | 'unification'
  | 'literature-heritage'
  | 'science-education'
  | 'energy-industry'
  | 'administration-business'
  | 'innovation';

/**
 * Brief §9.4 — kept strictly apart:
 * from-region   = documented birthplace / upbringing / origin in the Eastern Province.
 * associated    = studied / worked / contributed here, origin elsewhere or undocumented.
 */
export type OriginType = 'from-region' | 'associated';

export interface Personality extends BaseItem {
  name: LocalizedText;
  periodLabel: LocalizedText;
  sortYear: number | null;
  fields: PersonField[];
  originType: OriginType;
  biography: LocalizedText;
  contributions: LocalizedText[];
  connection: LocalizedText;
  locationIds: string[];
  eventIds: string[];
}

/* ------------------------------------------------------------------ */
/* Today & Tomorrow                                                     */
/* ------------------------------------------------------------------ */

export type TopicCategoryId =
  | 'tourism'
  | 'nature'
  | 'culture'
  | 'energy'
  | 'education'
  | 'business'
  | 'lifestyle'
  | 'connectivity';

/** Brief §10.4 — never show a plan as if it were finished. */
export type DevelopmentStage = 'existing' | 'in-progress' | 'announced';

export interface ContemporaryTopic extends BaseItem {
  categoryIds: TopicCategoryId[];
  stage: DevelopmentStage;
  title: LocalizedText;
  summary: LocalizedText;
  locationIds: string[];
  relatedIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Sources and media                                                    */
/* ------------------------------------------------------------------ */

export interface Source {
  id: string;
  /** A plain string when the title only exists in one language. */
  title: string | LocalizedText;
  publisher: string | LocalizedText;
  url?: string;
  /** ISO date the source was consulted. */
  accessed: string;
  /** What this source is used for in the site. */
  usedFor: LocalizedText;
  /** Prototype sources that should be replaced by an official/primary one. */
  replaceBeforeLaunch?: boolean;
}

export type ReviewState = 'pending' | 'approved' | 'rejected';

/** Brief §15.4 — full image metadata. */
export interface MediaAsset {
  id: string;
  /** Path under /public or a bundled import. null until the file is supplied. */
  file: string | null;
  alt: LocalizedText;
  caption?: LocalizedText;
  sourceUrl?: string;
  rightsHolder?: string;
  license?: string;
  attribution?: string;
  accuracyReview: ReviewState;
  rightsReview: ReviewState;
}

/** Any item that can be linked to by ID. */
export type AnyItem =
  | { type: 'location'; item: Location }
  | { type: 'event'; item: HistoricalEvent }
  | { type: 'stage'; item: UnificationStage }
  | { type: 'reign'; item: KingReign }
  | { type: 'person'; item: Personality }
  | { type: 'topic'; item: ContemporaryTopic };
