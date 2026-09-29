import { Link } from 'react-router-dom';
import { getLocation, routeFor } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import type { BackState } from '@/pages/Explore';
import { Icon } from './Icon';

/**
 * "View on map" buttons for an item's places. `back` tells the map page where
 * the visitor came from, so it can show only the map and a way back.
 */
export function MapLinks({ ids, back }: { ids: string[]; back: BackState }) {
  const { t, L } = useLang();
  const links = ids.flatMap((id) => {
    const loc = getLocation(id);
    const to = routeFor(id);
    return loc && to ? [{ id, to, name: L(loc.name) }] : [];
  });
  if (!links.length) return null;
  return (
    <div className="map-links">
      {links.map((l) => (
        <Link key={l.id} to={l.to} state={back} className="btn btn-secondary">
          <Icon name="pin" size={18} /> {t('viewOnMap')}: {l.name}
        </Link>
      ))}
    </div>
  );
}
