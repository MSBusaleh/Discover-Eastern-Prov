import { useEffect, useRef, type ReactNode } from 'react';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';

export interface JourneyStop {
  id: string;
  /** Small line above the title: a date, a reign… */
  date: string;
  title: string;
}

interface Props {
  label: string;
  stops: JourneyStop[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** Detail of the selected stop. */
  children: ReactNode;
}

/**
 * A row of stops with a detail card: a horizontal, swipeable track on wide
 * screens and a vertical list on phones (CSS). Arrow keys move between stops
 * when the track has focus. Used by the timeline and the kings.
 */
export function Journey({ label, stops, selectedId, onSelect, children }: Props) {
  const { t, n } = useLang();
  const trackRef = useRef<HTMLOListElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const idx = Math.max(0, stops.findIndex((s) => s.id === selectedId));
  const current = stops[idx];

  useEffect(() => {
    const node = trackRef.current?.querySelector<HTMLElement>(`[data-id="${current?.id}"]`);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phone = window.matchMedia('(max-width: 700px)').matches;
    if (phone) {
      // On phones the list sits below the detail: jump back up to the detail.
      if (!firstRender.current) detailRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    } else {
      node?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }
    firstRender.current = false;
  }, [current?.id]);

  const go = (delta: number) => {
    const next = stops[idx + delta];
    if (next) onSelect(next.id);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') { e.preventDefault(); go(rtl ? -1 : 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(rtl ? 1 : -1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
  };

  if (!current) return null;

  return (
    <div className="timeline">
      <div className="track-wrap">
        <ol className="track" ref={trackRef} tabIndex={0} onKeyDown={onKey} aria-label={label}>
          {stops.map((s) => (
            <li key={s.id} data-id={s.id} className={`track-item ${s.id === current.id ? 'is-selected' : ''}`}>
              <button type="button" onClick={() => onSelect(s.id)} aria-current={s.id === current.id ? 'step' : undefined}>
                <span className="track-dot" aria-hidden="true" />
                <span className="track-date mono">{s.date}</span>
                <span className="track-title">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="stepper">
        <button type="button" className="btn btn-ghost" onClick={() => go(-1)} disabled={idx === 0}>
          <Icon name="back" /> {t('previous')}
        </button>
        <span className="step-count mono">{n(idx + 1)} / {n(stops.length)}</span>
        <button type="button" className="btn btn-ghost" onClick={() => go(1)} disabled={idx === stops.length - 1}>
          {t('next')} <Icon name="arrow" />
        </button>
      </div>

      <article key={current.id} ref={detailRef} className="detail-card journey-detail swap-in" aria-live="polite" aria-labelledby={`${current.id}-h`}>
        {children}
      </article>
    </div>
  );
}
