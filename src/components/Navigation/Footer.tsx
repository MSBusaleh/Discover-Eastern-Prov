import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';
import speLogo from '@/assets/brand/spe-kfupm.jpeg';

/** Credits the organisation behind the site, quietly, under the site's own identity. */
export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-credit">
          <span className="footer-logo">
            <img src={speLogo} alt={t('speLogoAlt')} width={96} height={64} loading="lazy" decoding="async" />
          </span>
          <p className="footer-note">{t('footerCredit')}</p>
        </div>
        <Link to="/sources" className="footer-link"><Icon name="book" size={18} /> {t('navSources')}</Link>
      </div>
    </footer>
  );
}
