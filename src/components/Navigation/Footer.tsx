import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';

export function Footer() {
  const { t, L } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="logo-slots">
          {siteConfig.logos.map((logo) =>
            logo.src ? (
              <img key={logo.id} src={logo.src} alt={L(logo.label)} className="logo-img" />
            ) : (
              <div key={logo.id} className="logo-placeholder" role="img" aria-label={L(logo.label)}>
                <span className="mono">{t('logoPlaceholder')}</span>
                <span>{L(logo.label)}</span>
              </div>
            ),
          )}
        </div>
        <p className="footer-note">{t('prototypeNote')}</p>
        <Link to="/sources" className="footer-link"><Icon name="book" size={18} /> {t('navSources')}</Link>
      </div>
    </footer>
  );
}
