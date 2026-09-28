/**
 * Content integrity check: run `npm run check:content` after editing data.
 * Fails (exit 1) on: duplicate IDs, links to unknown IDs, unknown source or
 * image IDs, map markers without a source.
 * Reports (without failing) demo/draft items still in the data.
 */
import { locations } from '../src/data/locations';
import { historicalEvents } from '../src/data/historical-events';
import { unificationStages } from '../src/data/unification';
import { kings, royalVisits } from '../src/data/royal-visits';
import { personalities } from '../src/data/personalities';
import { contemporaryTopics } from '../src/data/contemporary-topics';
import { sources } from '../src/data/sources';
import { media } from '../src/data/media';

const errors: string[] = [];
const all = [...locations, ...historicalEvents, ...unificationStages, ...royalVisits, ...personalities, ...contemporaryTopics];
const ids = new Set<string>();
for (const x of [...all, ...kings, ...sources, ...media]) {
  if (ids.has(x.id)) errors.push(`Duplicate ID ${x.id}`);
  ids.add(x.id);
}
const sourceIds = new Set(sources.map((s) => s.id));
const mediaIds = new Set(media.map((m) => m.id));
const contentIds = new Set(all.map((x) => x.id));

for (const x of all as unknown as Record<string, unknown>[]) {
  const id = x.id as string;
  for (const key of ['locationIds', 'personIds', 'eventIds', 'relatedIds']) {
    for (const ref of (x[key] as string[] | undefined) ?? []) if (!contentIds.has(ref)) errors.push(`${id}.${key} → unknown ${ref}`);
  }
  for (const s of (x.sourceIds as string[]) ?? []) if (!sourceIds.has(s)) errors.push(`${id} → unknown source ${s}`);
  for (const m of (x.imageIds as string[]) ?? []) if (!mediaIds.has(m)) errors.push(`${id} → unknown image ${m}`);
}
for (const l of locations) {
  if (l.parentId && !locations.some((p) => p.id === l.parentId)) errors.push(`${l.id} → unknown parent ${l.parentId}`);
  if (l.coordinates && !sourceIds.has(l.coordinates.sourceId)) errors.push(`${l.id} coordinates have no valid sourceId`);
}
for (const v of royalVisits) if (!kings.some((k) => k.id === v.kingId)) errors.push(`${v.id} → unknown king ${v.kingId}`);

const byStatus = { demo: 0, draft: 0, approved: 0 };
for (const x of all) byStatus[x.status]++;
console.log(`Items: ${all.length}  ·  demo ${byStatus.demo}  ·  draft ${byStatus.draft}  ·  approved ${byStatus.approved}`);
console.log(`Sources: ${sources.length}  ·  images: ${media.length}  ·  coordinates needing review: ${locations.filter((l) => l.coordinates?.review === 'needs-review').map((l) => l.id).join(', ') || 'none'}`);
if (errors.length) { console.error(`\n✗ ${errors.length} problem(s):\n  ` + errors.join('\n  ')); process.exit(1); }
console.log('✓ All links, sources and images resolve.');
