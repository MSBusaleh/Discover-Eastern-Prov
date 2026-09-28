import { useSearchParams } from 'react-router-dom';
import { royalVisits } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { PageHeader } from '@/components/ContentCards/PageHeader';
import { RoyalVisitsGallery } from '@/components/RoyalVisitsGallery/RoyalVisitsGallery';

export default function RoyalVisits() {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  return (
    <div className="page page-royal">
      <PageHeader icon="crown" title={t('navRoyal')} />
      <RoyalVisitsGallery
        visits={royalVisits}
        selectedId={params.get('visit')}
        onSelect={(id) => setParams(id ? { visit: id } : {}, { replace: true })}
      />
    </div>
  );
}
