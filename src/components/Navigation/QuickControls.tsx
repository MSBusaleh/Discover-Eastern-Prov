import { useLang } from '@/i18n/LanguageContext';
import { useTheme } from '@/state/Theme';
import { Icon } from '@/components/ContentCards/Icon';

/** Language + theme buttons, shared by the header and the home page corner. */
export function QuickControls() {
  const { t, toggle: toggleLang, lang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  return (
    <>
      <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')} title={theme === 'dark' ? t('lightMode') : t('darkMode')}>
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
      </button>
      <button type="button" className="lang-btn" onClick={toggleLang} aria-label={t('switchLangLabel')} lang={lang === 'ar' ? 'en' : 'ar'}>
        <Icon name="globe" size={18} />
        <span>{t('switchLang')}</span>
      </button>
    </>
  );
}
