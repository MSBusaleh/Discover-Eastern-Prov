import L from './leafletSetup';
import type { Location } from '@/types/content';

/**
 * Marker design encodes the geographic hierarchy by SHAPE (not only colour):
 *   governorate = ringed circle   city = solid circle
 *   island      = rounded square  site = diamond
 * The label under each marker appears from zoom 9 (see .map-labels CSS).
 */
export function markerIcon(loc: Location, name: string, selected: boolean) {
  const cls = ['mk', `mk-${loc.kind}`, selected ? 'is-selected' : ''].join(' ');
  const safe = name.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
  return L.divIcon({
    className: 'mk-wrap',
    html: `<div class="${cls}"><span class="mk-shape"></span><span class="mk-label" dir="auto">${safe}</span></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

export function clusterIcon(count: number) {
  return L.divIcon({
    className: 'mk-wrap',
    html: `<div class="mk-cluster"><strong>${count}</strong></div>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  });
}
