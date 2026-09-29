import { useSearchParams } from 'react-router-dom';
import { kingReigns } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { strings } from '@/i18n/strings';
import { PageHeader } from '@/components/ContentCards/PageHeader';
import { Journey } from '@/components/Journey/Journey';
import { MapLinks } from '@/components/ContentCards/MapLinks';
import { MediaFrame } from '@/components/ContentCards/MediaFrame';
import { SourceList } from '@/components/ContentCards/SourceList';
import { StatusBadge } from '@/components/ContentCards/StatusBadge';
import { Text } from '@/components/ContentCards/Text';

/** The Eastern Province reign by reign: what each king's era brought to the region. */
export default function Kings() {
  const { t, L } = useLang();
  const [params, setParams] = useSearchParams();
  const current = kingReigns.find((k) => k.id === params.get('king')) ?? kingReigns[0];
  if (!current) return null;

  return (
    <div className="page page-kings">
      <PageHeader icon="crown" title={t('navRoyal')} />
      <Journey
        label={t('navRoyal')}
        stops={kingReigns.map((k) => ({ id: k.id, date: L(k.reign), title: L(k.name) }))}
        selectedId={current.id}
        onSelect={(id) => setParams({ king: id }, { replace: true })}
      >
        <div className="detail-media">
          <MediaFrame imageIds={current.imageIds} label={L(current.name)} icon="crown" ratio="4 / 5" />
        </div>
        <div className="detail-body">
          <div className="detail-meta">
            <span className="date-pill mono">{L(current.reign)}</span>
            <StatusBadge status={current.status} />
          </div>
          <div className="reign-head">
            <h2 id={`${current.id}-h`}>{L(current.name)}</h2>
            <p className="reign-theme">{L(current.title)}</p>
          </div>
          <Text value={current.summary} />
          {current.milestones.length > 0 && (
            <section className="milestones" aria-labelledby={`${current.id}-m`}>
              <h3 id={`${current.id}-m`}>{t('milestones')}</h3>
              <ol>
                {current.milestones.map((m, i) => (
                  <li key={i}>
                    <span className="milestone-year mono">{m.year}</span>
                    <span>{L(m.text)}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <MapLinks
            ids={current.locationIds}
            back={{
              backTo: `/kings?king=${current.id}`,
              backLabel: strings.navRoyal,
              backDetail: current.name,
            }}
          />
          <SourceList ids={current.sourceIds} />
        </div>
      </Journey>
    </div>
  );
}
