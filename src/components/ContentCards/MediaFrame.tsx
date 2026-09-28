import { isDisplayable, mediaById } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { Icon, type IconName } from './Icon';

/**
 * Shows the first approved image of an item, or a designed placeholder.
 * Placeholders are original geometric patterns, clearly labelled, so they can
 * never be mistaken for a historical photograph.
 */
export function MediaFrame({
  imageIds, label, icon = 'image', ratio = '16 / 9', note,
}: { imageIds: string[]; label?: string; icon?: IconName; ratio?: string; note?: string }) {
  const { L, t } = useLang();
  const img = imageIds.map((id) => mediaById.get(id)).find(isDisplayable);

  if (img) {
    return (
      <figure className="media-frame" style={{ aspectRatio: ratio }}>
        <img src={img.file} alt={L(img.alt)} loading="lazy" decoding="async" />
        {img.attribution && <figcaption className="media-credit">{img.attribution}</figcaption>}
      </figure>
    );
  }

  return (
    <div className="media-frame media-placeholder" style={{ aspectRatio: ratio }} role="img" aria-label={`${label ?? ''} — ${t('imagePending')}`}>
      <div className="placeholder-pattern" aria-hidden="true" />
      <div className="placeholder-body">
        <Icon name={icon} size={28} />
        <span className="placeholder-note">{note ?? t('imagePending')}</span>
      </div>
    </div>
  );
}
