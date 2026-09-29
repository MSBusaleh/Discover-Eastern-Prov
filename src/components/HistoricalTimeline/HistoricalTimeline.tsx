import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { HistoricalEvent } from '@/types/content';
import { getLocation, routeFor } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';
import { MediaFrame } from '@/components/ContentCards/MediaFrame';
import { SourceList } from '@/components/ContentCards/SourceList';
import { StatusBadge } from '@/components/ContentCards/StatusBadge';
import { Text } from '@/components/ContentCards/Text';
import { strings } from '@/i18n/strings';
import type { BackState } from '@/pages/Explore';

interface Props {
  events: HistoricalEvent[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Horizontal, swipeable track on wide screens; vertical list on phones (CSS).
 * Arrow keys move between events when the track has focus.
 */
export function HistoricalTimeline({ events, selectedId, onSelect }: Props) {
  const { L, t, n } = useLang();
  const trackRef = useRef<HTMLOListElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const idx = Math.max(0, events.findIndex((e) => e.id === selectedId));
  const current = events[idx];

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
    const next = events[idx + delta];
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
  const backState: BackState = {
    backTo: `/timeline?event=${current.id}`,
    backLabel: strings.navTimeline,
    backDetail: current.title,
  };

  return (
    <div className="timeline">
      <div className="track-wrap">
        <ol className="track" ref={trackRef} tabIndex={0} onKeyDown={onKey} aria-label={t('navTimeline')}>
          {events.map((e) => (
            <li key={e.id} data-id={e.id} className={`track-item ${e.id === current.id ? 'is-selected' : ''}`}>
              <button type="button" onClick={() => onSelect(e.id)} aria-current={e.id === current.id ? 'step' : undefined}>
                <span className="track-dot" aria-hidden="true" />
                <span className="track-date mono">{L(e.dateLabel)}</span>
                <span className="track-title">{L(e.title)}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="stepper">
        <button type="button" className="btn btn-ghost" onClick={() => go(-1)} disabled={idx === 0}>
          <Icon name="back" /> {t('previous')}
        </button>
        <span className="step-count mono">{n(idx + 1)} / {n(events.length)}</span>
        <button type="button" className="btn btn-ghost" onClick={() => go(1)} disabled={idx === events.length - 1}>
          {t('next')} <Icon name="arrow" />
        </button>
      </div>

      <article key={current.id} ref={detailRef} className="detail-card event-detail swap-in" aria-live="polite" aria-labelledby={`${current.id}-h`}>
        <div className="detail-media">
          <MediaFrame imageIds={current.imageIds} label={L(current.title)} icon="clock" ratio="4 / 3" />
        </div>
        <div className="detail-body">
          <div className="detail-meta">
            {L(current.dateLabel) && <span className="date-pill mono">{L(current.dateLabel)}</span>}
            <StatusBadge status={current.status} />
          </div>
          <h2 id={`${current.id}-h`}>{L(current.title)}</h2>
          <Text value={current.summary} />
          {current.locationIds.length > 0 && (
            <div className="map-links">
              {current.locationIds.map((id) => {
                const loc = getLocation(id);
                const to = routeFor(id);
                return loc && to ? (
                  <Link key={id} to={to} state={backState} className="btn btn-secondary">
                    <Icon name="pin" size={18} /> {t('viewOnMap')}: {L(loc.name)}
                  </Link>
                ) : null;
              })}
            </div>
          )}
          <SourceList ids={current.sourceIds} />
        </div>
      </article>
    </div>
  );
}
