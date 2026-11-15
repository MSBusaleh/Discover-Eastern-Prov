import type { ContentStatus } from '@/types/content';

/**
 * Site-wide settings. This is the one file to edit before launch.
 */
export const siteConfig = {
  /**
   * Which content statuses are visible. All current content is 'draft', so
   * keep 'draft' here: switching to ['approved'] alone would empty every section.
   */
  visibleStatuses: ['demo', 'draft', 'approved'] as ContentStatus[],

  /** Show small status badges on items. Keep false on the public site; for internal review only. */
  showStatusBadges: false,

  /** Default language on first load and after a booth reset. */
  defaultLang: 'ar' as const,

  map: {
    /** View shown first on the home page and the map page. */
    defaultMode: 'map' as 'terrain' | 'map',
    /**
     * Terrain view: online tiles drawn on top when the device has internet.
     * The bundled Natural Earth basemap is always underneath, so the map is
     * never empty offline.
     */
    terrain: {
      // OpenTopoMap — CC BY-SA. Light, event-scale use; see https://opentopomap.org/about
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors, SRTM | Style: &copy; <a href="https://opentopomap.org" target="_blank" rel="noopener">OpenTopoMap</a> (CC BY-SA)',
      maxZoom: 15,
    },
    maxZoom: 14,
  },

  booth: {
    /**
     * Booth mode is OFF by default and never turns on by itself for phone
     * visitors. Enable it on the booth screen by opening the site once with
     * `?booth=1` before the hash, e.g. https://example.org/?booth=1#/
     * Disable with `?booth=0`.
     */
    idleSeconds: 120,
    /** Countdown shown before the reset, with a "Keep exploring" button. */
    warningSeconds: 15,
  },
};
