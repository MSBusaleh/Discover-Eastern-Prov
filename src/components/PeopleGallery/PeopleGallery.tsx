import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { PersonField, Personality } from '@/types/content';
import { fieldLabels, originLabels } from '@/data/taxonomy';
import { useLang } from '@/i18n/LanguageContext';
import { Chip } from '@/components/ContentCards/Chip';
import { PersonPortrait } from './PersonPortrait';

/** One row of field chips, then portrait cards. */
export function PeopleGallery({ people, initialPlace }: { people: Personality[]; initialPlace?: string | null }) {
  const { L, t } = useLang();
  const [field, setField] = useState<PersonField | null>(null);
  const fields = (Object.keys(fieldLabels) as PersonField[]).filter((f) => people.some((p) => p.fields.includes(f)));
  const shown = people.filter((p) => (!field || p.fields.includes(field)) && (!initialPlace || p.locationIds.includes(initialPlace)));

  return (
    <div className="people">
      <div className="filters" role="group" aria-label={t('field')}>
        <Chip selected={field === null} onClick={() => setField(null)}>{t('all')}</Chip>
        {fields.map((f) => <Chip key={f} selected={field === f} onClick={() => setField(f)}>{L(fieldLabels[f])}</Chip>)}
      </div>
      {shown.length === 0 ? <p className="muted">{t('noPeople')}</p> : (
        <ul className="card-grid people-grid">
          {shown.map((p) => (
            <li key={p.id}>
              <Link to={`/people/${p.id}`} className="person-card">
                <PersonPortrait person={p} />
                <span className="person-card-body">
                  <span className="person-name">{L(p.name)}</span>
                  <span className={`origin-tag origin-${p.originType}`}>{L(originLabels[p.originType].label)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
