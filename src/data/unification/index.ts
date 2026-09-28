import type { MediaAsset, Source, UnificationStage } from '@/types/content';
import data from './stages.json';

/**
 * UNIFICATION NARRATIVE — four stages (brief §7.1).
 * Content lives in stages.json (bilingual ar/en). The sources and images cited
 * by the stages are declared there too and merged into their registries.
 */
export const unificationStages = data.stages as UnificationStage[];
export const unificationSources = data.sources as Source[];
export const unificationImages = data.images as MediaAsset[];
