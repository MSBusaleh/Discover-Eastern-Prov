import { sourceById } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from './Icon';

/** Compact, expandable list of the sources behind an item. */
export function SourceList({ ids }: { ids: string[] }) {
  const { t, L } = useLang();
  const list = ids.map((id) => sourceById.get(id)).filter((s): s is NonNullable<typeof s> => !!s);
  if (list.length === 0) return null;
  return (
    <details className="sources">
      <summary><Icon name="book" size={16} /> {t('sources')}</summary>
      {(
        <ul>
          {list.map((s) => (
            <li key={s.id}>
              {s.url
                ? <a href={s.url} target="_blank" rel="noopener noreferrer">{L(s.publisher)}: {L(s.title)} <Icon name="external" size={14} /></a>
                : <span>{L(s.publisher)}: {L(s.title)}</span>}
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}
