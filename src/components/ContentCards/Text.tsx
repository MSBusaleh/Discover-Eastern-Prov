import type { LocalizedText } from '@/types/content';
import { useLang } from '@/i18n/LanguageContext';

/**
 * Renders content text. An empty string means "not supplied yet" and shows a
 * clearly styled pending line instead of invented filler.
 */
export function Text({ value, as: Tag = 'p', className = '' }: { value: LocalizedText | undefined; as?: 'p' | 'span' | 'div'; className?: string }) {
  const { L, t } = useLang();
  const text = L(value).trim();
  if (!text) return <Tag className={`pending-text ${className}`}>{t('pendingText')}</Tag>;
  return <Tag className={className}>{text}</Tag>;
}

export const hasText = (v: LocalizedText | undefined, lang: 'ar' | 'en') => !!v && v[lang].trim().length > 0;
