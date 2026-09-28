import type { Personality } from '@/types/content';
import { isDisplayable, mediaById } from '@/data';
import { useLang } from '@/i18n/LanguageContext';

/**
 * Portrait slot. Until an approved photo exists it shows a monogram tile:
 * a deliberate typographic placeholder, never a generated likeness (brief §13.5).
 */
export function PersonPortrait({ person, size = 'md' }: { person: Personality; size?: 'md' | 'lg' }) {
  const { L, t } = useLang();
  const img = person.imageIds.map((id) => mediaById.get(id)).find(isDisplayable);
  if (img) return <img className={`portrait portrait-${size}`} src={img.file} alt={L(img.alt)} loading="lazy" />;
  const name = L(person.name);
  const initial = name.replace(/^(شخصية نموذجية|Sample personality)\s*\(?/, '').replace(/\)$/, '').trim().charAt(0) || name.charAt(0);
  return (
    <div className={`portrait portrait-${size} portrait-placeholder`} role="img" aria-label={`${name} — ${t('imagePending')}`}>
      <span aria-hidden="true">{initial}</span>
    </div>
  );
}
