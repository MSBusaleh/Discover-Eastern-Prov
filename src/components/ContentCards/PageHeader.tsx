import { Icon, type IconName } from './Icon';

/** Page title only. Short and scannable: no intro paragraphs. */
export function PageHeader({ icon, title }: { icon: IconName; title: string }) {
  return (
    <h1 className="page-title">
      <span className="page-title-mark" aria-hidden="true"><Icon name={icon} size={24} /></span>
      {title}
    </h1>
  );
}
