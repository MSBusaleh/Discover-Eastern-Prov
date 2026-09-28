import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang, LocalizedText } from '@/types/content';
import { siteConfig } from '@/config/site';
import { strings, type StringKey } from './strings';
import { safeStorage } from '@/utils/storage';

interface LanguageApi {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Interface string by key. */
  t: (key: StringKey) => string;
  /** Pick the current language from a content field. */
  L: (text: LocalizedText | undefined) => string;
  /** Number formatting (Western digits in both languages). */
  n: (value: number) => string;
  /** Join a list with the language's comma. */
  join: (items: string[]) => string;
}

const Ctx = createContext<LanguageApi | null>(null);
const KEY = 'dep.lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = safeStorage.get(KEY);
    return saved === 'en' || saved === 'ar' ? saved : siteConfig.defaultLang;
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    safeStorage.set(KEY, l);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = `${strings.siteName[lang]} | ${strings.siteName[lang === 'ar' ? 'en' : 'ar']}`;
  }, [lang]);

  const api = useMemo<LanguageApi>(() => ({
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    setLang,
    toggle: () => setLang(lang === 'ar' ? 'en' : 'ar'),
    t: (key) => strings[key][lang],
    L: (text) => (text ? text[lang] : ''),
    // Western digits in both languages: Saudi official usage commonly keeps them
    // for dates, and it keeps years/coordinates identical across languages.
    n: (value) => value.toLocaleString(lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US', { useGrouping: false }),
    join: (items) => items.filter(Boolean).join(lang === 'ar' ? '، ' : ', '),
  }), [lang, setLang]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useLang(): LanguageApi {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLang must be used inside <LanguageProvider>');
  return v;
}
