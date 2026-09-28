import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { useLang } from '@/i18n/LanguageContext';
import { useExploreState } from '@/state/ExploreState';
import { Icon } from '@/components/ContentCards/Icon';

/**
 * Booth-only: after `idleSeconds` without any touch, key or scroll, shows a
 * countdown with a large "Keep exploring" button. Any interaction cancels it.
 * At zero it returns to the home page in the default language for the next
 * visitor. Mounted only when booth mode is on.
 */
export function IdleReset() {
  const { t, n, lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const explore = useExploreState();
  const [countdown, setCountdown] = useState<number | null>(null);
  const idleTimer = useRef<number>();
  const tick = useRef<number>();
  const btnRef = useRef<HTMLButtonElement>(null);

  const atRest = location.pathname === '/' && lang === siteConfig.defaultLang;

  useEffect(() => {
    const clearAll = () => { window.clearTimeout(idleTimer.current); window.clearInterval(tick.current); };
    const arm = () => {
      clearAll();
      setCountdown(null);
      if (atRest) return; // Nothing to reset: never interrupt.
      idleTimer.current = window.setTimeout(() => {
        let left = siteConfig.booth.warningSeconds;
        setCountdown(left);
        tick.current = window.setInterval(() => {
          left -= 1;
          if (left <= 0) {
            clearAll();
            setCountdown(null);
            explore.reset();
            setLang(siteConfig.defaultLang);
            navigate('/', { replace: true });
            window.scrollTo(0, 0);
          } else setCountdown(left);
        }, 1000);
      }, siteConfig.booth.idleSeconds * 1000);
    };
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;
    events.forEach((e) => window.addEventListener(e, arm, { passive: true, capture: true }));
    arm();
    return () => { clearAll(); events.forEach((e) => window.removeEventListener(e, arm, { capture: true })); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atRest, location.key]);

  useEffect(() => { if (countdown !== null) btnRef.current?.focus(); }, [countdown !== null]);

  if (countdown === null) return null;
  return (
    <div className="idle-overlay" role="alertdialog" aria-modal="true" aria-labelledby="idle-h" aria-describedby="idle-p">
      <div className="idle-box">
        <h2 id="idle-h">{t('idleTitle')}</h2>
        <p id="idle-p">{t('idleText')} <strong className="mono">{n(countdown)}</strong> {t('seconds')}</p>
        <button ref={btnRef} type="button" className="btn btn-primary btn-lg" onClick={() => setCountdown(null)}>
          <Icon name="check" /> {t('keepExploring')}
        </button>
      </div>
    </div>
  );
}
