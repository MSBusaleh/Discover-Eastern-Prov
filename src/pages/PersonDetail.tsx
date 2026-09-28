import { Link, useParams } from 'react-router-dom';
import { getItem, getLocation, routeFor } from '@/data';
import { fieldLabels, originLabels } from '@/data/taxonomy';
import type { Personality } from '@/types/content';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';
import { RelatedLinks } from '@/components/ContentCards/RelatedLinks';
import { SourceList } from '@/components/ContentCards/SourceList';
import { StatusBadge } from '@/components/ContentCards/StatusBadge';
import { Text, hasText } from '@/components/ContentCards/Text';
import { PersonPortrait } from '@/components/PeopleGallery/PersonPortrait';
import NotFound from './NotFound';

export default function PersonDetail() {
  const { id = '' } = useParams();
  const { L, t, lang } = useLang();
  const hit = getItem(id);
  if (!hit || hit.type !== 'person') return <NotFound />;
  const p: Personality = hit.item;

  return (
    <div className="page page-person">
      <Link to="/people" className="text-btn back-link"><Icon name="back" size={18} /> {t('allPeople')}</Link>
      <article className="detail-card person-detail" aria-labelledby="person-h">
        <div className="detail-media"><PersonPortrait person={p} size="lg" /></div>
        <div className="detail-body">
          <div className="detail-meta">
            {L(p.periodLabel) && <span className="date-pill mono">{L(p.periodLabel)}</span>}
            <span className={`origin-tag origin-${p.originType}`}>{L(originLabels[p.originType].label)}</span>
            <StatusBadge status={p.status} />
          </div>
          <h1 id="person-h">{L(p.name)}</h1>
          <p className="person-fields">{p.fields.map((f) => L(fieldLabels[f])).join(' · ')}</p>

          {hasText(p.biography, lang) || hasText(p.connection, lang) ? (
            <>
              <Text value={p.biography} />
              {p.contributions.some((c) => hasText(c, lang)) && (
                <ul className="bullets">{p.contributions.filter((c) => hasText(c, lang)).map((c, i) => <li key={i}>{L(c)}</li>)}</ul>
              )}
              {hasText(p.connection, lang) && <Text value={p.connection} />}
            </>
          ) : <Text value={p.biography} />}

          {p.locationIds.length > 0 && (
            <div className="map-links">
              {p.locationIds.map((lid) => {
                const loc = getLocation(lid); const to = routeFor(lid);
                return loc && to ? <Link key={lid} to={to} className="btn btn-secondary"><Icon name="pin" size={18} /> {t('viewOnMap')}: {L(loc.name)}</Link> : null;
              })}
            </div>
          )}
          <RelatedLinks id={p.id} exclude={['location']} />
          <SourceList ids={p.sourceIds} />
        </div>
      </article>
    </div>
  );
}
