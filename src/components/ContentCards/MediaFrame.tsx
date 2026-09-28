import { isDisplayable, mediaById } from '@/data';
import { mediaUrl } from '@/data/media/assets';
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
    // A real image keeps its own proportions (portraits and documents must not be cropped).
    const credit = img.attribution ?? (img.sourceUrl ? new URL(img.sourceUrl).hostname.replace(/^www\./, '') : null);
    return (
      <figure className="media-figure">
        <div className="media-frame is-image">
          <img src={mediaUrl(img.file)} alt={L(img.alt)} loading="lazy" decoding="async" />
        </div>
        {(img.caption || credit) && (
          <figcaption className="media-caption">
            {img.caption && <span>{L(img.caption)}</span>}
            {credit && (
              <span className="media-credit">
                {t('imageSource')}:{' '}
                {img.sourceUrl ? <a href={img.sourceUrl} target="_blank" rel="noopener noreferrer">{credit}</a> : credit}
              </span>
            )}
          </figcaption>
        )}
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
