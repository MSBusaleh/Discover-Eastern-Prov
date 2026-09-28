import type { Location } from '@/types/content';
import { childrenOf, getLocation } from '@/data';
import { kindLabels, siteTypeLabels } from '@/data/taxonomy';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';
import { MediaFrame } from '@/components/ContentCards/MediaFrame';
import { RelatedLinks } from '@/components/ContentCards/RelatedLinks';
import { SourceList } from '@/components/ContentCards/SourceList';
import { StatusBadge } from '@/components/ContentCards/StatusBadge';
import { Text } from '@/components/ContentCards/Text';

/** Card for a selected place: picture, name, one line, then where to go next. */
export function LocationCard({ loc, onClose, onSelect }: { loc: Location; onClose: () => void; onSelect: (id: string) => void }) {
  const { L, t } = useLang();
  const parent = loc.parentId ? getLocation(loc.parentId) : undefined;
  const children = childrenOf(loc.id);
  const typeLabel = loc.siteType ? L(siteTypeLabels[loc.siteType]) : L(kindLabels[loc.kind]);

  return (
    <article className="location-card" aria-labelledby={`${loc.id}-title`}>
      <div className="card-top">
        <button type="button" className="text-btn" onClick={onClose}>
          <Icon name="back" size={18} /> {t('backToMap')}
        </button>
        <StatusBadge status={loc.status} />
      </div>

      <MediaFrame imageIds={loc.imageIds} label={L(loc.name)} icon="pin" ratio="16 / 8" />

      <header className="card-head">
        <p className="kind-tag">
          {typeLabel}
          {parent && <> · <button type="button" className="inline-link" onClick={() => onSelect(parent.id)}>{L(parent.name)}</button></>}
        </p>
        <h2 id={`${loc.id}-title`}>{L(loc.name)}</h2>
      </header>

      <Text value={loc.summary} className="card-summary" />

      {children.length > 0 && (
        <ul className="pill-row">
          {children.map((c) => (
            <li key={c.id}>
              <button type="button" className="pill-link" onClick={() => onSelect(c.id)}>
                <Icon name="pin" size={16} /> {L(c.name)}
              </button>
            </li>
          ))}
        </ul>
      )}

      <RelatedLinks id={loc.id} exclude={['location']} />
      <SourceList ids={loc.sourceIds} />
    </article>
  );
}
