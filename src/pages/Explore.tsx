import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { locations, getLocation, themesOf } from '@/data';
import { themeLabels, themeOrder } from '@/data/taxonomy';
import type { LocalizedText, MapTheme } from '@/types/content';
import { useLang } from '@/i18n/LanguageContext';
import { useExploreState } from '@/state/ExploreState';
import { MapView } from '@/components/InteractiveMap/MapView';
import { LocationCard } from '@/components/InteractiveMap/LocationCard';
import { LocationList } from '@/components/InteractiveMap/LocationList';
import { Chip } from '@/components/ContentCards/Chip';
import { PageHeader } from '@/components/ContentCards/PageHeader';
import { Icon } from '@/components/ContentCards/Icon';

/** Router state a page passes when it links here, so the visitor can return to it. */
export interface BackState { backTo: string; backLabel: LocalizedText; backDetail?: LocalizedText }

export default function Explore() {
  const { t, L } = useLang();
  const [params, setParams] = useSearchParams();
  // Captured once: picking another place on the map replaces the URL and drops router state.
  const { state } = useLocation();
  const [back] = useState(() => (state as BackState | null)?.backTo ? (state as BackState) : null);
  const { view, setView, themes, setThemes, mode, setMode } = useExploreState();
  const [fitSignal, setFitSignal] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedId = params.get('loc');
  const selected = selectedId ? getLocation(selectedId) : undefined;
  // One filter at a time keeps the choice simple.
  const active = themes[0] ?? null;

  const filtered = useMemo(
    () => (active ? locations.filter((l) => themesOf(l).includes(active)) : locations),
    [active],
  );
  const onMap = selected && !filtered.includes(selected) ? [...filtered, selected] : filtered;

  const select = (id: string) => setParams({ loc: id });
  const clearSelection = () => { setParams({}); setFitSignal((n) => n + 1); };
  const pickTheme = (th: MapTheme | null) => { setThemes(th ? [th] : []); setFitSignal((n) => n + 1); };

  useEffect(() => {
    if (selected && window.matchMedia('(max-width: 900px)').matches) {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selected]);

  return (
    <div className="page page-explore">
      <PageHeader icon="map" title={t('navExplore')} />

      {back && (
        <Link to={back.backTo} className="return-banner">
          <span className="return-icon" aria-hidden="true"><Icon name="back" size={26} /></span>
          <span className="return-text">
            <strong>{t('backTo')} {L(back.backLabel)}</strong>
            {back.backDetail && <span>{L(back.backDetail)}</span>}
          </span>
        </Link>
      )}

      <div className="filters" role="group" aria-label={t('filters')}>
        <Chip selected={!active} onClick={() => pickTheme(null)}>{t('all')}</Chip>
        {themeOrder.map((th) => (
          <Chip key={th} selected={active === th} onClick={() => pickTheme(th)}>{L(themeLabels[th])}</Chip>
        ))}
      </div>

      <div className="explore-grid">
        <div className="explore-map">
          <MapView locations={onMap} selectedId={selectedId} onSelect={select} initialView={view} onViewChange={setView} fitSignal={fitSignal} mode={mode} onModeChange={setMode} />
        </div>
        <div className="explore-panel" ref={panelRef} aria-live="polite">
          {selected ? (
            <LocationCard key={selected.id} loc={selected} onClose={clearSelection} onSelect={select} />
          ) : (
            <LocationList locations={filtered} onSelect={select} />
          )}
        </div>
      </div>
    </div>
  );
}
