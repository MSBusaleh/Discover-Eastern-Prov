import { useSearchParams } from 'react-router-dom';
import { personalities } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { PageHeader } from '@/components/ContentCards/PageHeader';
import { PeopleGallery } from '@/components/PeopleGallery/PeopleGallery';

export default function People() {
  const { t } = useLang();
  const [params] = useSearchParams();
  return (
    <div className="page page-people">
      <PageHeader icon="people" title={t('navPeople')} />
      <PeopleGallery people={personalities} initialPlace={params.get('place')} />
    </div>
  );
}
