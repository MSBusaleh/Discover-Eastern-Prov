import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { RoyalVisit } from '@/types/content';
import { getKing, getLocation, kings, routeFor } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { Chip } from '@/components/ContentCards/Chip';
import { Icon } from '@/components/ContentCards/Icon';
import { SourceList } from '@/components/ContentCards/SourceList';
import { StatusBadge } from '@/components/ContentCards/StatusBadge';
import { Text } from '@/components/ContentCards/Text';

/** Type-only "plate" in place of a photo: never a generated likeness (brief §8.3). */
function VisitPlate({ visit }: { visit: RoyalVisit }) {
  const { L } = useLang();
  const king = getKing(visit.kingId);
  return (
    <div className="visit-plate" aria-hidden="true">
      <Icon name="crown" size={26} />
      <span className="plate-king">{king ? L(king.name) : ''}</span>
      {L(visit.dateLabel) && <span className="plate-date mono">{L(visit.dateLabel)}</span>}
    </div>
  );
}

export function RoyalVisitsGallery({ visits, selectedId, onSelect }: { visits: RoyalVisit[]; selectedId: string | null; onSelect: (id: string | null) => void }) {
  const { L, t, join } = useLang();
  const [king, setKing] = useState<string | null>(null);
  const kingOptions = kings.filter((k) => visits.some((v) => v.kingId === k.id));
  const shown = visits
    .filter((v) => !king || v.kingId === king)
    .sort((a, b) => (getKing(a.kingId)?.order ?? 0) - (getKing(b.kingId)?.order ?? 0) || (a.sortYear ?? 0) - (b.sortYear ?? 0));
  const selected = visits.find((v) => v.id === selectedId);
  const places = (v: RoyalVisit) => join(v.locationIds.map((id) => L(getLocation(id)?.name)));

  return (
    <div className="royal">
      {kingOptions.length > 1 && (
        <div className="filters" role="group" aria-label={t('filters')}>
          <Chip selected={king === null} onClick={() => setKing(null)}>{t('all')}</Chip>
          {kingOptions.map((k) => <Chip key={k.id} selected={king === k.id} onClick={() => setKing(k.id)}>{L(k.name)}</Chip>)}
        </div>
      )}

      {selected && (
        <article key={selected.id} className="detail-card visit-detail swap-in" aria-live="polite" aria-labelledby={`${selected.id}-h`}>
          <div className="detail-media"><VisitPlate visit={selected} /></div>
          <div className="detail-body">
            <div className="card-top">
              <button type="button" className="text-btn" onClick={() => onSelect(null)}><Icon name="close" size={18} /> {t('close')}</button>
              <StatusBadge status={selected.status} />
            </div>
            <h2 id={`${selected.id}-h`}>{L(getKing(selected.kingId)?.name)}</h2>
            <p className="muted">{places(selected)} · {L(selected.occasion)}</p>
            <Text value={selected.summary} />
            <div className="map-links">
              {selected.locationIds.map((id) => {
                const to = routeFor(id); const loc = getLocation(id);
                return to && loc ? <Link key={id} to={to} className="btn btn-secondary"><Icon name="pin" size={18} /> {L(loc.name)}</Link> : null;
              })}
            </div>
            <SourceList ids={selected.sourceIds} />
          </div>
        </article>
      )}

      {shown.length === 0 ? <p className="muted">{t('noVisits')}</p> : (
        <ul className="card-grid">
          {shown.map((v) => (
            <li key={v.id}>
              <button type="button" className={`visit-card ${v.id === selectedId ? 'is-selected' : ''}`} onClick={() => onSelect(v.id)} aria-pressed={v.id === selectedId}>
                <VisitPlate visit={v} />
                <span className="visit-card-body">
                  <span className="visit-place"><Icon name="pin" size={16} /> {places(v)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
