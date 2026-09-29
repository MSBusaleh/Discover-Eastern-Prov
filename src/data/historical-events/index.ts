import type { HistoricalEvent, MediaAsset, Source } from '@/types/content';
import data from './events.json';

/**
 * TIMELINE ENTRIES ("عبر الزمن").
 * Content lives in events.json (bilingual ar/en). The sources and images cited
 * by the entries are declared there too and merged into their registries.
 */
export const historicalEvents = data.events as HistoricalEvent[];
export const timelineSources = data.sources as Source[];
export const timelineImages = data.images as MediaAsset[];
