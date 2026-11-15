import type { LocalizedText } from '@/types/content';
import { useLang } from '@/i18n/LanguageContext';

/** Renders content text in the current language. Empty text renders nothing. */
export function Text({ value, as: Tag = 'p', className = '' }: { value: LocalizedText | undefined; as?: 'p' | 'span' | 'div'; className?: string }) {
  const { L } = useLang();
  const text = L(value).trim();
  if (!text) return null;
  return <Tag className={className}>{text}</Tag>;
}

export const hasText = (v: LocalizedText | undefined, lang: 'ar' | 'en') => !!v && v[lang].trim().length > 0;
