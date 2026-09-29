import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-note">{t('prototypeNote')}</p>
        <Link to="/sources" className="footer-link"><Icon name="book" size={18} /> {t('navSources')}</Link>
      </div>
    </footer>
  );
}
