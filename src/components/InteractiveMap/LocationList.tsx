import type { Location } from '@/types/content';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';

/** Plain list of places: the quick, readable alternative to tapping the map. */
export function LocationList({ locations, onSelect }: { locations: Location[]; onSelect: (id: string) => void }) {
  const { L, t } = useLang();
  if (!locations.length) return <p className="muted">{t('noPlacesForFilter')}</p>;
  return (
    <ul className="place-list">
      {locations.map((l) => (
        <li key={l.id}>
          <button type="button" className="place-row" onClick={() => onSelect(l.id)}>
            <span className="place-name">{L(l.name)}</span>
            <Icon name="chevron" size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}
