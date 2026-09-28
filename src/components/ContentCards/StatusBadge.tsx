import type { ContentStatus } from '@/types/content';
import { siteConfig } from '@/config/site';
import { statusLabels } from '@/data/taxonomy';
import { useLang } from '@/i18n/LanguageContext';

/** Small label marking sample or draft content. Hidden for approved items. */
export function StatusBadge({ status }: { status: ContentStatus }) {
  const { L } = useLang();
  if (!siteConfig.showStatusBadges || status === 'approved') return null;
  return <span className={`status-badge status-${status}`}>{L(statusLabels[status])}</span>;
}
