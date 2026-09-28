import { media, sources } from '@/data';
import { siteConfig } from '@/config/site';
import { useLang } from '@/i18n/LanguageContext';
import { PageHeader } from '@/components/ContentCards/PageHeader';
import { Icon } from '@/components/ContentCards/Icon';
import { isDisplayable } from '@/data/media';

export default function Sources() {
  const { t, L } = useLang();
  const credited = media.filter(isDisplayable);
  return (
    <div className="page page-sources">
      <PageHeader icon="book" title={t('navSources')} />
      <section className="prose-block">
        <h2 className="section-title">{t('sources')}</h2>
        <ol className="source-table">
          {sources.map((s) => (
            <li key={s.id}>
              <span className="mono">{s.id}</span>
              <span>
                {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer">{s.publisher}: {s.title} <Icon name="external" size={14} /></a> : `${s.publisher}: ${s.title}`}
                <span className="muted small"> · {L(s.usedFor)} · {t('accessed')} <span className="mono">{s.accessed}</span></span>
              </span>
              {s.replaceBeforeLaunch && <span className="tag-inline">{t('prototypeSource')}</span>}
            </li>
          ))}
        </ol>
      </section>
      <section className="prose-block">
        <h2 className="section-title">{t('imageCredits')}</h2>
        {credited.length === 0 ? <p>{t('noImages')}</p> : (
          <ul>{credited.map((m) => <li key={m.id}><span className="mono">{m.id}</span> {m.attribution} · {m.license}</li>)}</ul>
        )}
      </section>
      <section className="prose-block">
        <h2 className="section-title">{t('mapCredits')}</h2>
        <p>
          <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> (public domain) ·{' '}
          <span dangerouslySetInnerHTML={{ __html: siteConfig.map.terrain.attribution }} />
        </p>
      </section>
    </div>
  );
}
