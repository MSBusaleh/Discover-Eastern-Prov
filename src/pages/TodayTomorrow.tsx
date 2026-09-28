import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { contemporaryTopics, getLocation, routeFor, topicCategories } from '@/data';
import { stageLabels } from '@/data/taxonomy';
import type { DevelopmentStage, TopicCategoryId } from '@/types/content';
import { useLang } from '@/i18n/LanguageContext';
import { PageHeader } from '@/components/ContentCards/PageHeader';
import { Icon, type IconName } from '@/components/ContentCards/Icon';
import { SourceList } from '@/components/ContentCards/SourceList';
import { StatusBadge } from '@/components/ContentCards/StatusBadge';
import { Text } from '@/components/ContentCards/Text';

const catIcons: Record<TopicCategoryId, IconName> = {
  tourism: 'compass', nature: 'palm', culture: 'book', energy: 'factory',
  education: 'cap', business: 'briefcase', lifestyle: 'sun', connectivity: 'bridge',
};

/** Stage badge: distinct shape + text, so it never relies on colour alone. */
function StageBadge({ stage }: { stage: DevelopmentStage }) {
  const { L } = useLang();
  return <span className={`stage-badge stage-${stage}`}><span className="stage-shape" aria-hidden="true" />{L(stageLabels[stage])}</span>;
}

export default function TodayTomorrow() {
  const { t, L } = useLang();
  const [params, setParams] = useSearchParams();
  const topicParam = params.get('topic');
  const topicFromParam = contemporaryTopics.find((x) => x.id === topicParam);
  const cat = (params.get('cat') as TopicCategoryId | null) ?? topicFromParam?.categoryIds[0] ?? null;
  const resultsRef = useRef<HTMLElement>(null);

  const topics = cat ? contemporaryTopics.filter((x) => x.categoryIds.includes(cat)) : [];
  const stageOrder: DevelopmentStage[] = ['existing', 'in-progress', 'announced'];
  const choose = (id: TopicCategoryId) => setParams({ cat: id }, { replace: true });

  useEffect(() => {
    if (cat) resultsRef.current?.focus({ preventScroll: true });
    if (topicParam) document.getElementById(`topic-${topicParam}`)?.scrollIntoView({ block: 'center' });
  }, [cat, topicParam]);

  const current = topicCategories.find((c) => c.id === cat);

  return (
    <div className="page page-today">
      <PageHeader icon="spark" title={t('todayQuestion')} />

      <ul className={`interest-grid ${cat ? 'is-compact' : ''}`} aria-label={t('filters')}>
        {topicCategories.map((c) => {
          return (
            <li key={c.id}>
              <button type="button" className={`interest-card ${cat === c.id ? 'is-selected' : ''}`} aria-pressed={cat === c.id} onClick={() => choose(c.id)}>
                <span className="interest-icon" aria-hidden="true"><Icon name={catIcons[c.id]} size={26} /></span>
                <span className="interest-label">{L(c.label)}</span>
                {cat === c.id && <Icon name="check" size={18} className="interest-check" />}
              </button>
            </li>
          );
        })}
      </ul>

      {current && (
        <section key={current.id} className="topic-results swap-in" ref={resultsRef} tabIndex={-1} aria-labelledby="topic-h">
          <h2 id="topic-h" className="sr-only">{L(current.label)}</h2>
          {topics.length === 0 ? <p className="muted">{t('noTopics')}</p> : (
            stageOrder.filter((s) => topics.some((x) => x.stage === s)).map((s) => (
              <div key={s} className="stage-group">
                <h3 className="stage-heading"><StageBadge stage={s} /></h3>
                <ul className="card-grid topic-grid">
                  {topics.filter((x) => x.stage === s).map((x) => (
                    <li key={x.id} id={`topic-${x.id}`}>
                      <article className={`topic-card ${x.id === topicParam ? 'is-highlighted' : ''}`}>
                        <div className="topic-head">
                          <h4>{L(x.title)}</h4>
                          <StatusBadge status={x.status} />
                        </div>
                        <Text value={x.summary} />
                        {x.locationIds.length > 0 && (
                          <div className="map-links small-links">
                            {x.locationIds.map((id) => {
                              const loc = getLocation(id); const to = routeFor(id);
                              return loc && to ? <Link key={id} to={to} className="pill-link"><Icon name="pin" size={16} /> {L(loc.name)}</Link> : null;
                            })}
                          </div>
                        )}
                        <SourceList ids={x.sourceIds} />
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
      )}
    </div>
  );
}
