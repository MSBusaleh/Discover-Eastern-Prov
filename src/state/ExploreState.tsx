import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MapTheme } from '@/types/content';
import { siteConfig } from '@/config/site';

export type MapMode = 'terrain' | 'map';

/**
 * Keeps the map's view, selection and filters alive while the visitor moves
 * between sections, so "Back to the map" returns them to the same place
 * (brief §5.3). Lives above the router.
 */
export interface MapView { lat: number; lng: number; zoom: number }

interface ExploreState {
  view: MapView | null;
  setView: (v: MapView | null) => void;
  themes: MapTheme[];
  setThemes: (t: MapTheme[]) => void;
  mode: MapMode;
  setMode: (m: MapMode) => void;
  reset: () => void;
}

const Ctx = createContext<ExploreState | null>(null);

export function ExploreStateProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<MapView | null>(null);
  const [themes, setThemes] = useState<MapTheme[]>([]);
  const [mode, setMode] = useState<MapMode>(siteConfig.map.defaultMode);
  const value = useMemo(() => ({
    view, setView, themes, setThemes, mode, setMode,
    reset: () => { setView(null); setThemes([]); setMode(siteConfig.map.defaultMode); },
  }), [view, themes, mode]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useExploreState() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useExploreState must be used inside <ExploreStateProvider>');
  return v;
}
