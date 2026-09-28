import { Link, useSearchParams } from 'react-router-dom';
import { unificationStages, getLocation, routeFor } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { PageHeader } from '@/components/ContentCards/PageHeader';
import { Icon } from '@/components/ContentCards/Icon';
import { MediaFrame } from '@/components/ContentCards/MediaFrame';
import { SourceList } from '@/components/ContentCards/SourceList';
import { StatusBadge } from '@/components/ContentCards/StatusBadge';
import { Text } from '@/components/ContentCards/Text';
import type { BackState } from './Explore';
import { strings } from '@/i18n/strings';

/** A to-scale strip that keeps 1913 and 1932 visibly apart (brief §7.1). */
function Chronology({ active }: { active: number }) {
  const { t, n } = useLang();
  const start = 1905, end = 1940;
  const pos = (y: number) => `${((y - start) / (end - start)) * 100}%`;
  const ticks = [1910, 1920, 1930, 1940];
  return (
    <figure className="chronology" aria-label={t('distinction')}>
      <div className="chrono-axis">
        <span className="chrono-span" style={{ insetInlineStart: pos(1913), width: `calc(${pos(1932)} - ${pos(1913)})` }} />
        {ticks.map((y) => <span key={y} className="chrono-tick mono" style={{ insetInlineStart: pos(y) }}>{y}</span>)}
        <span className={`chrono-point ${active === 2 ? 'is-active' : ''}`} style={{ insetInlineStart: pos(1913) }}>
          <strong className="mono">{n(1913)}</strong><em>{t('milestone1913')}</em>
        </span>
        <span className={`chrono-point is-major ${active === 4 ? 'is-active' : ''}`} style={{ insetInlineStart: pos(1932) }}>
          <strong className="mono">{n(1932)}</strong><em>{t('milestone1932')}</em>
        </span>
      </div>
      <figcaption><strong>{t('distinction')}.</strong> {t('distinctionText')}</figcaption>
    </figure>
  );
}

export default function Unification() {
  const { t, L, n } = useLang();
  const [params, setParams] = useSearchParams();
  const stages = unificationStages;
  const idx = Math.max(0, stages.findIndex((s) => s.id === params.get('stage')));
  const stage = stages[idx];
  const goTo = (i: number) => stages[i] && setParams({ stage: stages[i].id }, { replace: true });

  if (!stage) return null;
  const backState: BackState = {
    backTo: `/unification?stage=${stage.id}`,
    backLabel: strings.navUnification,
    backDetail: {
      ar: `${strings.stage.ar} ${stage.order}: ${stage.title.ar}`,
      en: `${strings.stage.en} ${stage.order}: ${stage.title.en}`,
    },
  };
  return (
    <div className="page page-unification">
      <PageHeader icon="flag" title={t('navUnification')} />

      <ol className="stage-steps" aria-label={t('stage')}>
        {stages.map((s, i) => (
          <li key={s.id} className={i === idx ? 'is-current' : i < idx ? 'is-done' : ''}>
            <button type="button" onClick={() => goTo(i)} aria-current={i === idx ? 'step' : undefined}>
              <span className="step-num mono">{n(s.order)}</span>
              <span className="step-label">
                {L(s.dateLabel) && <span className="step-date mono">{L(s.dateLabel)}</span>}
                <span>{L(s.title)}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <article key={stage.id} className="detail-card stage-card swap-in" aria-live="polite" aria-labelledby={`${stage.id}-h`}>
        <div className="detail-media">
          <MediaFrame imageIds={stage.imageIds} label={`${t('stage')} ${n(stage.order)}`} icon="flag" ratio="4 / 3" />
        </div>
        <div className="detail-body">
          <div className="detail-meta">
            {L(stage.dateLabel) && <span className="date-pill mono">{L(stage.dateLabel)}</span>}
            <StatusBadge status={stage.status} />
          </div>
          <h2 id={`${stage.id}-h`}>{L(stage.title)}</h2>
          <Text value={stage.summary} />
          {stage.locationIds.length > 0 && (
            <div className="map-links">
              {stage.locationIds.map((id) => {
                const loc = getLocation(id);
                const to = routeFor(id);
                return loc && to ? (
                  <Link key={id} to={to} state={backState} className="btn btn-secondary"><Icon name="pin" size={18} /> {t('viewOnMap')}: {L(loc.name)}</Link>
                ) : null;
              })}
            </div>
          )}
          <SourceList ids={stage.sourceIds} />
        </div>
      </article>

      <div className="stepper">
        <button type="button" className="btn btn-ghost" onClick={() => goTo(idx - 1)} disabled={idx === 0}><Icon name="back" /> {t('previous')}</button>
        <span className="step-count mono">{n(idx + 1)} / {n(stages.length)}</span>
        <button type="button" className="btn btn-primary" onClick={() => goTo(idx + 1)} disabled={idx === stages.length - 1}>{t('next')} <Icon name="arrow" /></button>
      </div>

      <Chronology active={stage.order} />
    </div>
  );
}
