import { useEffect, useRef } from 'react';
import L from './leafletSetup';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import type { Feature, FeatureCollection } from 'geojson';
import type { Location } from '@/types/content';
import { siteConfig } from '@/config/site';
import basemap from '@/data/geo/basemap.json';
import detailData from '@/data/geo/detail.json';
import { useLang } from '@/i18n/LanguageContext';
import type { MapView as SavedView, MapMode } from '@/state/ExploreState';
import { Icon, type IconName } from '@/components/ContentCards/Icon';
import { markerIcon, clusterIcon } from './markers';

interface Props {
  locations: Location[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  /** Home page variant: no scroll-wheel zoom. */
  compact?: boolean;
  initialView?: SavedView | null;
  onViewChange?: (v: SavedView) => void;
  /** Increment to ask the map to fit all markers again. */
  fitSignal?: number;
  mode: MapMode;
  /** When given, a Satellite / Terrain / Map switch is shown on the map. */
  onModeChange?: (m: MapMode) => void;
}

const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** Resolves true if a single tile from the provider loads within 5 s. Cached per URL. */
const probeCache = new Map<string, Promise<boolean>>();
function probeTiles(template: string): Promise<boolean> {
  if (!probeCache.has(template)) {
    const url = template.replace('{s}', 'a').replace('{z}', '5').replace('{x}', '20').replace('{y}', '13');
    probeCache.set(template, new Promise<boolean>((resolve) => {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return resolve(false);
      const img = new Image();
      const timer = window.setTimeout(() => resolve(false), 5000);
      img.onload = () => { window.clearTimeout(timer); resolve(img.naturalWidth > 0); };
      img.onerror = () => { window.clearTimeout(timer); resolve(false); };
      img.src = url;
    }));
  }
  return probeCache.get(template)!;
}

const MODES: { id: MapMode; icon: IconName; ar: string; en: string }[] = [
  { id: 'terrain', icon: 'mountain', ar: 'تضاريس', en: 'Terrain' },
  { id: 'map', icon: 'map', ar: 'خريطة', en: 'Map' },
];

const LABEL_ZOOM = 9;
const geo = basemap as unknown as FeatureCollection;
const detail = detailData as unknown as FeatureCollection;
/** Zoom cap when online imagery is unavailable (bundled data stays readable up to here). */
const OFFLINE_MAX_ZOOM = 10;
/** Neighbours worth naming on the map (ISO codes from the basemap). */
const NAMED = new Set(['BH', 'QA', 'KW', 'AE']);

/**
 * Leaflet map drawn from the bundled basemap (always available), with our
 * content markers on top. Optional online tiles can be layered via siteConfig.
 */
export function MapView({ locations, selectedId, onSelect, compact, initialView, onViewChange, fitSignal = 0, mode, onModeChange }: Props) {
  const { L: pick, t, lang } = useLang();
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const selectedLayerRef = useRef<L.LayerGroup | null>(null);
  const labelLayerRef = useRef<L.LayerGroup | null>(null);
  const onlineRef = useRef<L.TileLayer | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onViewRef = useRef(onViewChange);
  onViewRef.current = onViewChange;
  const firstFit = useRef(true);

  const withCoords = locations.filter((l) => l.coordinates);

  // Create the map once.
  useEffect(() => {
    if (!el.current || mapRef.current) return;
    const map = L.map(el.current, {
      zoomControl: false,
      scrollWheelZoom: !compact,
      attributionControl: true,
      minZoom: 5,
      maxZoom: siteConfig.map.maxZoom,
      maxBounds: L.latLngBounds([10, 34], [36, 66]),
      maxBoundsViscosity: 0.8,
      zoomSnap: 0.5,
    });
    L.control.zoom({ position: 'topright' }).addTo(map);
    map.attributionControl.setPrefix(false);
    map.attributionControl.addAttribution('Natural Earth');

    // Layer stack (bottom → top):
    //   basePane    Natural Earth fills (always; the offline/terrain/map fallback)
    //   tilePane    online terrain tiles when available
    //   outlinePane Eastern Province outline + place names
    //   markerPane  our markers
    map.createPane('basePane').style.zIndex = '150';
    map.createPane('outlinePane').style.zIndex = '350';
    map.getPane('outlinePane')!.style.pointerEvents = 'none';

    const style = (f?: Feature): L.PathOptions => {
      const role = f?.properties?.role;
      if (role === 'province') return { className: 'geo-province', weight: 0, fillOpacity: 1 };
      return { className: 'geo-country', weight: 0.8, fillOpacity: 1 };
    };
    L.geoJSON(geo, { style, interactive: false, pane: 'basePane' }).addTo(map);
    // City areas and main roads (Natural Earth), for crisp detail when zoomed in.
    L.geoJSON(detail, {
      pane: 'basePane',
      interactive: false,
      style: (f) => f?.properties?.role === 'urban'
        ? { className: 'geo-urban', weight: 0, fillOpacity: 1 }
        : { className: f?.properties?.major ? 'geo-road geo-road-major' : 'geo-road', weight: f?.properties?.major ? 2 : 1.2, fill: false },
    }).addTo(map);
    L.geoJSON(
      { type: 'FeatureCollection', features: geo.features.filter((f) => f.properties?.role === 'province') } as FeatureCollection,
      { style: { className: 'geo-outline', weight: 2.5, fill: false }, interactive: false, pane: 'outlinePane' },
    ).addTo(map);

    labelLayerRef.current = L.layerGroup().addTo(map);

    const updateLabels = () => {
      const z = map.getZoom();
      el.current?.classList.toggle('map-labels', z >= LABEL_ZOOM);
      el.current?.classList.toggle('map-labels-sites', z >= 12);
    };
    map.on('zoomend', updateLabels);
    map.on('moveend', () => {
      const c = map.getCenter();
      onViewRef.current?.({ lat: c.lat, lng: c.lng, zoom: map.getZoom() });
    });

    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 38,
      spiderfyOnMaxZoom: true,
      disableClusteringAtZoom: 11,
      iconCreateFunction: (c) => clusterIcon(c.getChildCount()),
    });
    cluster.addTo(map);
    selectedLayerRef.current = L.layerGroup().addTo(map);
    clusterRef.current = cluster;
    mapRef.current = map;

    if (initialView) map.setView([initialView.lat, initialView.lng], initialView.zoom);
    else map.setView([26.2, 49.6], 7);
    updateLabels();

    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el.current);
    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      clusterRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Place names on the basemap (Eastern Province, neighbours, the Gulf), per language.
  useEffect(() => {
    const layer = labelLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    const add = (latlng: L.LatLngExpression, text: string, cls: string) =>
      L.marker(latlng, { pane: 'outlinePane', icon: L.divIcon({ className: `geo-label ${cls}`, html: `<span dir="auto">${text}</span>`, iconSize: [0, 0] }), interactive: false, keyboard: false }).addTo(layer);
    for (const f of geo.features) {
      const p = f.properties as { role: string; iso: string; ar: string; en: string };
      if (p.role === 'country' && NAMED.has(p.iso)) {
        add(L.geoJSON(f).getBounds().getCenter(), p[lang], 'geo-label-country');
      }
    }
    add([28.4, 50.3], lang === 'ar' ? 'الخليج العربي' : 'Arabian Gulf', 'geo-label-sea');
  }, [lang]);

  // Switch imagery when the view mode changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    onlineRef.current?.remove(); onlineRef.current = null;
    const online = mode === 'terrain' ? siteConfig.map.terrain : null;
    let cancelled = false;
    if (!online) map.setMaxZoom(OFFLINE_MAX_ZOOM);
    if (online) {
      // Only add online tiles after one test tile actually loads. Where images
      // from other sites are blocked (offline, strict networks, the claude.ai
      // preview), the bundled layers are left untouched instead of being
      // covered by failed tiles.
      probeTiles(online.url).then((ok) => {
        if (cancelled || !mapRef.current) return;
        mapRef.current.setMaxZoom(ok ? siteConfig.map.maxZoom : OFFLINE_MAX_ZOOM);
        if (!ok) return;
        onlineRef.current = L.tileLayer(online.url, {
          attribution: online.attribution,
          maxNativeZoom: online.maxZoom,
          maxZoom: siteConfig.map.maxZoom,
          subdomains: 'abc',
          errorTileUrl: TRANSPARENT_PIXEL,
        }).addTo(mapRef.current);
      });
    }
    el.current?.setAttribute('data-mode', mode);
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // (Re)draw markers when the set, the selection or the language changes.
  useEffect(() => {
    const map = mapRef.current;
    const cluster = clusterRef.current;
    if (!map || !cluster) return;
    cluster.clearLayers();
    selectedLayerRef.current?.clearLayers();
    const markers: L.Marker[] = [];
    withCoords.forEach((loc) => {
      const name = pick(loc.name);
      const m = L.marker([loc.coordinates!.lat, loc.coordinates!.lng], {
        icon: markerIcon(loc, name, loc.id === selectedId),
        title: name,
        alt: name,
        keyboard: true,
        riseOnHover: true,
        zIndexOffset: loc.id === selectedId ? 1000 : loc.kind === 'site' ? 0 : 100,
      });
      m.on('click', () => onSelectRef.current(loc.id));
      // The selected marker sits outside the cluster so it is never hidden in one.
      if (loc.id === selectedId) selectedLayerRef.current?.addLayer(m);
      else markers.push(m);
    });
    cluster.addLayers(markers);

    if (firstFit.current && !initialView && compact) {
      // Home: show the whole province outline.
      firstFit.current = false;
      const prov = geo.features.find((f) => f.properties?.role === 'province');
      if (prov) map.fitBounds(L.geoJSON(prov).getBounds(), { padding: [16, 16] });
    }
    if (firstFit.current && !initialView && withCoords.length) {
      firstFit.current = false;
      map.fitBounds(L.latLngBounds(withCoords.map((l) => [l.coordinates!.lat, l.coordinates!.lng])), { padding: [40, 40], maxZoom: 10 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withCoords.map((l) => l.id).join(','), selectedId, lang]);

  // Refit on request (e.g. a filter change).
  useEffect(() => {
    const map = mapRef.current;
    if (!map || fitSignal === 0 || !withCoords.length) return;
    map.flyToBounds(L.latLngBounds(withCoords.map((l) => [l.coordinates!.lat, l.coordinates!.lng])), { padding: [40, 40], maxZoom: 10, duration: 0.6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitSignal]);

  // Bring the selected place into view.
  useEffect(() => {
    const map = mapRef.current;
    const loc = withCoords.find((l) => l.id === selectedId);
    if (!map || !loc) return;
    const target = L.latLng(loc.coordinates!.lat, loc.coordinates!.lng);
    const wanted = Math.min(loc.kind === 'site' || loc.kind === 'island' ? 10 : 8.5, map.getMaxZoom());
    // Always centre the chosen place, so zooming in afterwards stays on it.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    map.flyTo(target, Math.max(Math.min(map.getZoom(), map.getMaxZoom()), wanted), { duration: reduce ? 0 : 0.7 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <div className={`map-shell ${compact ? 'is-compact' : ''}`}>
      <div ref={el} className="map-canvas" dir="ltr" role="region" aria-label={t('mapTitle')} data-mode={mode} />
      {onModeChange && (
        <div className="map-modes" role="group" aria-label={t('mapTitle')}>
          {MODES.map((m) => (
            <button key={m.id} type="button" aria-pressed={mode === m.id} className={mode === m.id ? 'is-selected' : ''} onClick={() => onModeChange(m.id)}>
              <Icon name={m.icon} size={18} /><span>{m[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
