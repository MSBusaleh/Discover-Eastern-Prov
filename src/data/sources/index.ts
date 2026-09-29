import type { Source } from '@/types/content';
import { unificationSources } from '../unification';
import { timelineSources } from '../historical-events';
import { kingSources } from '../kings';

/**
 * Source registry. Every factual item points here by ID.
 *
 * Prototype note: Wikipedia is used ONLY to fix marker coordinates and a few
 * short, uncontroversial facts so the prototype is not built on invented data.
 * Each is flagged `replaceBeforeLaunch` so the content team can swap in an
 * official or primary source.
 */
const used = {
  coords: { ar: 'موقع العلامة على الخريطة', en: 'Where the map marker goes' },
  coordsFacts: { ar: 'موقع العلامة على الخريطة ومعلومات مختصرة', en: 'Map marker and a few short facts' },
};

export const sources: Source[] = [
  { id: 'SRC-001', title: 'Hofuf', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Hofuf', accessed: '2026-09-25', usedFor: used.coordsFacts, replaceBeforeLaunch: true },
  { id: 'SRC-002', title: 'Qatif', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Qatif', accessed: '2026-09-25', usedFor: used.coords, replaceBeforeLaunch: true },
  { id: 'SRC-003', title: 'Tarout Island', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Tarout_Island', accessed: '2026-09-25', usedFor: used.coordsFacts, replaceBeforeLaunch: true },
  { id: 'SRC-004', title: 'Dhahran', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Dhahran', accessed: '2026-09-25', usedFor: used.coordsFacts, replaceBeforeLaunch: true },
  { id: 'SRC-005', title: 'Dammam', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Dammam', accessed: '2026-09-25', usedFor: used.coordsFacts, replaceBeforeLaunch: true },
  { id: 'SRC-006', title: 'Khobar', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Khobar', accessed: '2026-09-25', usedFor: used.coordsFacts, replaceBeforeLaunch: true },
  { id: 'SRC-007', title: 'Jubail', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Jubail', accessed: '2026-09-25', usedFor: used.coordsFacts, replaceBeforeLaunch: true },
  { id: 'SRC-008', title: 'Ras Tanura', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ras_Tanura', accessed: '2026-09-25', usedFor: used.coords, replaceBeforeLaunch: true },
  { id: 'SRC-009', title: 'Thāj', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Th%C4%81j', accessed: '2026-09-25', usedFor: used.coords, replaceBeforeLaunch: true },
  { id: 'SRC-010', title: 'Uqair', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Uqair', accessed: '2026-09-25', usedFor: used.coords, replaceBeforeLaunch: true },
  { id: 'SRC-011', title: 'Ibrahim Palace — heritage inventory record', publisher: 'IRCICA Islamic Architectural Heritage', url: 'https://www.islamicarchitecturalheritage.com/listings/ibrahim-palace', accessed: '2026-09-25', usedFor: used.coords, replaceBeforeLaunch: true },
  { id: 'SRC-012', title: 'Qasr Ibrahim', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Qasr_Ibrahim', accessed: '2026-09-25', usedFor: { ar: 'التحقق من موقع قصر إبراهيم', en: 'Double-checking where Ibrahim Palace is' }, replaceBeforeLaunch: true },
  { id: 'SRC-013', title: 'Thāj (Q1528269)', publisher: 'Wikidata', url: 'https://www.wikidata.org/wiki/Q1528269', accessed: '2026-09-25', usedFor: { ar: 'مقارنة موقع ثاج (القيم مختلفة)', en: 'Comparing Thaj’s position (the values differ)' }, replaceBeforeLaunch: true },
  { id: 'SRC-014', title: '1:10m Admin 0 countries and Admin 1 states/provinces', publisher: 'Natural Earth', url: 'https://www.naturalearthdata.com/', accessed: '2026-09-27', usedFor: { ar: 'خريطة الأساس وحدود المنطقة الشرقية', en: 'The base map and the outline of the Eastern Province' } },
  ...unificationSources,
  ...timelineSources,
  ...kingSources,
];

export const sourceById = new Map(sources.map((s) => [s.id, s]));
