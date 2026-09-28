import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { Icon } from '@/components/ContentCards/Icon';

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="page page-notfound">
      <h1>{t('notFound')}</h1>
      <Link to="/" className="btn btn-primary"><Icon name="home" /> {t('home')}</Link>
    </div>
  );
}
