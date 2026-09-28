import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { safeStorage } from '@/utils/storage';

/**
 * Booth mode = the shared touchscreen at the event.
 * OFF by default. Turned on/off per device by opening the site once with
 * ?booth=1 / ?booth=0 (e.g. https://example.org/?booth=1#/), and remembered
 * on that device only.
 */
const KEY = 'dep.booth';
const Ctx = createContext(false);

function readFlag(): boolean {
  const q = new URLSearchParams(window.location.search).get('booth');
  if (q === '1') { safeStorage.set(KEY, '1'); return true; }
  if (q === '0') { safeStorage.remove(KEY); return false; }
  return safeStorage.get(KEY) === '1';
}

export function BoothModeProvider({ children }: { children: ReactNode }) {
  const [on] = useState(readFlag);
  useEffect(() => {
    document.documentElement.classList.toggle('booth', on);
  }, [on]);
  return <Ctx.Provider value={on}>{children}</Ctx.Provider>;
}

export const useBoothMode = () => useContext(Ctx);
