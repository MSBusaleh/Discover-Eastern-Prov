/**
 * CONTENT REGISTRY
 * ----------------
 * The single entry point components use to read content. It:
 *   1. filters every collection by `siteConfig.visibleStatuses`
 *   2. indexes everything by ID
 *   3. resolves relationships in BOTH directions, so a link only has to be
 *      written once (e.g. an event lists LOC-003 → Tarout's card automatically
 *      shows that event)
 *   4. maps any ID to the page that displays it
 */
import { siteConfig } from '@/config/site';
import type {
  AnyItem, ContemporaryTopic, HistoricalEvent, Location, MapTheme, Personality,
  RoyalVisit, UnificationStage, ContentStatus,
} from '@/types/content';
import { locations as allLocations } from './locations';
import { historicalEvents as allEvents } from './historical-events';
import { unificationStages as allStages } from './unification';
import { kings, royalVisits as allVisits } from './royal-visits';
import { personalities as allPeople } from './personalities';
import { contemporaryTopics as allTopics, topicCategories } from './contemporary-topics';
import { eraOrder } from './taxonomy';

export { kings, topicCategories };
export { sources, sourceById } from './sources';
export { media, mediaById, isDisplayable } from './media';

const visible = <T extends { status: ContentStatus }>(xs: T[]) =>
  xs.filter((x) => siteConfig.visibleStatuses.includes(x.status));

export const locations: Location[] = visible(allLocations);
export const unificationStages: UnificationStage[] = visible(allStages).sort((a, b) => a.order - b.order);
export const royalVisits: RoyalVisit[] = visible(allVisits);
export const personalities: Personality[] = visible(allPeople);
export const contemporaryTopics: ContemporaryTopic[] = visible(allTopics);
export const historicalEvents: HistoricalEvent[] = visible(allEvents).sort((a, b) => {
  const era = eraOrder.indexOf(a.era) - eraOrder.indexOf(b.era);
  if (era !== 0) return era;
  if (a.sortYear !== null && b.sortYear !== null) return a.sortYear - b.sortYear;
  return 0;
});

/* ---------------- ID index ---------------- */

const index = new Map<string, AnyItem>();
locations.forEach((item) => index.set(item.id, { type: 'location', item }));
historicalEvents.forEach((item) => index.set(item.id, { type: 'event', item }));
unificationStages.forEach((item) => index.set(item.id, { type: 'stage', item }));
royalVisits.forEach((item) => index.set(item.id, { type: 'visit', item }));
personalities.forEach((item) => index.set(item.id, { type: 'person', item }));
contemporaryTopics.forEach((item) => index.set(item.id, { type: 'topic', item }));

export function getItem(id: string): AnyItem | undefined {
  return index.get(id);
}
export const getLocation = (id: string) => locations.find((l) => l.id === id);
export const getKing = (id: string) => kings.find((k) => k.id === id);

/** Route that displays an item. Unknown IDs return null (link is hidden). */
export function routeFor(id: string): string | null {
  const hit = index.get(id);
  if (!hit) return null;
  switch (hit.type) {
    case 'location': return `/explore?loc=${id}`;
    case 'event': return `/timeline?event=${id}`;
    case 'stage': return `/unification?stage=${id}`;
    case 'visit': return `/royal-visits?visit=${id}`;
    case 'person': return null; // the People section is not published
    case 'topic': return null; // the Today & Tomorrow section is not published
  }
}

/** Title of any item, for link labels. */
export function titleOf(hit: AnyItem) {
  switch (hit.type) {
    case 'location': return hit.item.name;
    case 'person': return hit.item.name;
    case 'visit': {
      const k = getKing(hit.item.kingId);
      return k ? k.name : { ar: hit.item.id, en: hit.item.id };
    }
    default: return hit.item.title;
  }
}

/* ---------------- Relationships ---------------- */

/** All IDs an item points at (forward links). */
function forwardIds(hit: AnyItem): string[] {
  const i = hit.item as unknown as Record<string, unknown>;
  const ids: string[] = [];
  for (const key of ['locationIds', 'personIds', 'eventIds', 'relatedIds']) {
    const v = i[key];
    if (Array.isArray(v)) ids.push(...(v as string[]));
  }
  return ids;
}

/** Items related to `id`, via forward links from it and reverse links to it. */
export function relatedTo(id: string): AnyItem[] {
  const self = index.get(id);
  const out = new Map<string, AnyItem>();
  if (self) for (const fid of forwardIds(self)) {
    const hit = index.get(fid);
    if (hit && fid !== id) out.set(fid, hit);
  }
  for (const [otherId, hit] of index) {
    if (otherId === id) continue;
    if (forwardIds(hit).includes(id)) out.set(otherId, hit);
  }
  return [...out.values()];
}

/** Child locations (sites inside a governorate, etc.). */
export const childrenOf = (id: string) => locations.filter((l) => l.parentId === id);

/** Themes for a location: manual ones + `royal` derived from relations. */
export function themesOf(loc: Location): MapTheme[] {
  const themes = new Set(loc.themes);
  const rel = relatedTo(loc.id);
  if (rel.some((r) => r.type === 'visit' || r.type === 'stage')) themes.add('royal');
  return [...themes];
}
