import type { KingReign, MediaAsset, Source } from '@/types/content';
import data from './reigns.json';

/**
 * THE KINGS ("الملوك"): the Eastern Province reign by reign.
 * Content lives in reigns.json (bilingual ar/en). The sources and images cited
 * by each reign are declared there too and merged into their registries.
 */
export const kingReigns = data.reigns as KingReign[];
export const kingSources = data.sources as Source[];
export const kingImages = data.images as MediaAsset[];
