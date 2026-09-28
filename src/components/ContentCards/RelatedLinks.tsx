import { Link } from 'react-router-dom';
import { relatedTo, routeFor, titleOf, getKing } from '@/data';
import type { AnyItem } from '@/types/content';
import { useLang } from '@/i18n/LanguageContext';
import { Icon, type IconName } from './Icon';

const icons: Record<AnyItem['type'], IconName> = {
  location: 'pin', event: 'clock', stage: 'flag', visit: 'crown', person: 'people', topic: 'spark',
};
const order: AnyItem['type'][] = ['location', 'event', 'person', 'topic', 'stage', 'visit'];
/** Few, varied choices: at most one link per kind first, then fill up to MAX. */
const MAX = 4;
function pick(items: AnyItem[]): AnyItem[] {
  const firsts = order.map((type) => items.find((i) => i.type === type)).filter((x): x is AnyItem => !!x);
  const rest = items.filter((i) => !firsts.includes(i));
  return [...firsts, ...rest].slice(0, MAX);
}

/**
 * "See also" as one row of pills. The icon shows the kind of content, so no
 * group headings are needed. Hidden entirely when nothing is linked.
 */
export function RelatedLinks({ id, exclude = [] }: { id: string; exclude?: AnyItem['type'][] }) {
  const { t, L } = useLang();
  const items = pick(relatedTo(id).filter((r) => !exclude.includes(r.type)));
  if (!items.length) return null;

  return (
    <section className="related" aria-label={t('related')}>
      <h3 className="related-title">{t('related')}</h3>
      <ul className="pill-row">
        {items.map((hit) => {
          const to = routeFor(hit.item.id);
          if (!to) return null;
          const label = hit.type === 'visit' ? L(getKing(hit.item.kingId)?.name) : L(titleOf(hit));
          return (
            <li key={hit.item.id}>
              <Link className="pill-link" to={to}><Icon name={icons[hit.type]} size={16} /> {label}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
