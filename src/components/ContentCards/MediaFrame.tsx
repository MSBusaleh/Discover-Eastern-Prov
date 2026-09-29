import { useEffect, useRef, useState } from 'react';
import { isDisplayable, mediaById } from '@/data';
import { creditOf } from '@/data/media';
import { photoFor } from '@/data/media/assets';
import { useLang } from '@/i18n/LanguageContext';
import { Icon, type IconName } from './Icon';

/**
 * A photo that never leaves a blank space: its blurred preview shows at once,
 * in the photo's own proportions, and the real photo fades in over it.
 */
function Photo({ file, alt }: { file: string; alt: string }) {
  const photo = photoFor(file);
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  // A photo already in the browser cache can finish before React listens for it.
  useEffect(() => { if (ref.current?.complete) setLoaded(true); }, []);

  return (
    <div className={`media-frame is-image photo ${loaded ? 'is-loaded' : 'is-loading'}`}>
      {photo.blur && <img className="photo-blur" src={photo.blur} alt="" aria-hidden="true" />}
      <img
        ref={ref}
        className="photo-img"
        src={photo.url}
        alt={alt}
        width={photo.width}
        height={photo.height}
        decoding="async"
        {...{ fetchpriority: 'high' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
}

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
    const credit = creditOf(img);
    return (
      <figure className="media-figure">
        <Photo key={img.id} file={img.file} alt={L(img.alt)} />
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
