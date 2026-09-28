import type { Personality } from '@/types/content';

/**
 * PERSONALITIES — SAMPLE PROFILES ONLY.
 * No real people are named here. Each sample demonstrates one field, one
 * origin type (§9.4) and the links to places and events. Replace with the
 * verified list from the content package.
 */
const PENDING = { ar: '', en: '' };
const TBC = { ar: '', en: '' }; // empty = date not confirmed yet (hidden on screen)

function sample(
  id: string,
  letter: [ar: string, en: string],
  fields: Personality['fields'],
  originType: Personality['originType'],
  locationIds: string[],
  eventIds: string[],
): Personality {
  return {
    id, status: 'demo',
    name: { ar: `شخصية نموذجية (${letter[0]})`, en: `Sample personality ${letter[1]}` },
    periodLabel: TBC, sortYear: null, fields, originType,
    biography: PENDING, contributions: [PENDING], connection: PENDING,
    locationIds, eventIds, sourceIds: [], imageIds: [],
  };
}

export const personalities: Personality[] = [
  sample('PER-001', ['أ', 'A'], ['ancient-islamic', 'literature-heritage'], 'from-region', ['LOC-001'], ['HIS-003']),
  sample('PER-002', ['ب', 'B'], ['ancient-islamic'], 'from-region', ['LOC-009'], ['HIS-002']),
  sample('PER-003', ['ج', 'C'], ['literature-heritage'], 'from-region', ['LOC-002', 'LOC-003'], ['HIS-009']),
  sample('PER-004', ['د', 'D'], ['energy-industry', 'science-education'], 'associated', ['LOC-004'], ['HIS-006']),
  sample('PER-005', ['هـ', 'E'], ['administration-business'], 'associated', ['LOC-007'], ['HIS-007']),
  sample('PER-006', ['و', 'F'], ['innovation', 'science-education'], 'from-region', ['LOC-005', 'LOC-004'], []),
];
