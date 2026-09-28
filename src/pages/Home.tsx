import { Link, useNavigate } from 'react-router-dom';
import { locations } from '@/data';
import { sections } from '@/config/sections';
import { useLang } from '@/i18n/LanguageContext';
import { useExploreState } from '@/state/ExploreState';
import { MapView } from '@/components/InteractiveMap/MapView';
import { Icon } from '@/components/ContentCards/Icon';
import { Emblem } from '@/components/Navigation/Emblem';
import { QuickControls } from '@/components/Navigation/QuickControls';

/**
 * Welcome screen: no header bar. One message, one button, the province map,
 * and quiet section tiles. Staggered entrance animation via CSS (--i).
 */
export default function Home() {
  const { t } = useLang();
  const navigate = useNavigate();
  const { setView, mode } = useExploreState();
  const tiles = sections.filter((s) => s.path !== '/explore');

  return (
    <div className="page page-home">
      <div className="home-corner">
        <Emblem size={44} />
        <div className="home-controls"><QuickControls /></div>
      </div>

      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title enter" style={{ ['--i' as string]: 0 }}>{t('siteName')}</h1>
          <p className="hero-tagline enter" style={{ ['--i' as string]: 1 }}>{t('tagline')}</p>
          <Link to="/explore" className="btn btn-primary btn-lg enter btn-glow" style={{ ['--i' as string]: 2 }} onClick={() => setView(null)}>
            {t('startExploring')} <Icon name="arrow" />
          </Link>
        </div>
        <div className="hero-map enter-map">
          <MapView locations={locations} onSelect={(id) => navigate(`/explore?loc=${id}`)} compact mode={mode} />
        </div>
      </section>

      <nav aria-label={t('menu')}>
        <ul className="entry-grid" style={{ ['--cols' as string]: tiles.length }}>
          {tiles.map((s, i) => (
            <li key={s.path} className="enter" style={{ ['--i' as string]: 3 + i }}>
              <Link to={s.path} className="entry-card">
                <Icon name={s.icon} size={28} />
                <span className="entry-title">{t(s.short)}</span>
                {s.blurb && <span className="entry-blurb">{t(s.blurb)}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
