import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { sections } from '@/config/sections';
import { useLang } from '@/i18n/LanguageContext';
import { useBoothMode } from '@/state/BoothMode';
import { Icon } from '@/components/ContentCards/Icon';
import { Emblem } from './Emblem';
import { QuickControls } from './QuickControls';

export function Header() {
  const { t } = useLang();
  const booth = useBoothMode();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menuBtn.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">{t('skipToContent')}</a>
      <div className="header-bar">
        <Link to="/" className="brand" aria-label={t('home')}>
          <Emblem />
          <span className="brand-text">
            <span className="brand-name">{t('siteName')}</span>
          </span>
        </Link>

        <nav className="primary-nav" aria-label={t('menu')}>
          <ul>
            {sections.map((s) => (
              <li key={s.path}>
                <NavLink to={s.path} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                  <Icon name={s.icon} size={18} />
                  <span>{t(s.short)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          {booth && <span className="booth-flag">{t('boothOn')}</span>}
          <Link to="/" className="icon-btn home-btn" aria-label={t('home')}><Icon name="home" /></Link>
          <QuickControls />
          <button
            ref={menuBtn}
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('close') : t('menu')}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label={t('menu')} hidden={!open}>
        <ul>
          <li><NavLink to="/" end><Icon name="home" /><span>{t('home')}</span></NavLink></li>
          {sections.map((s) => (
            <li key={s.path}>
              <NavLink to={s.path}><Icon name={s.icon} /><span>{t(s.label)}</span></NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
