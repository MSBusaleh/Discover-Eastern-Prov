import { useSearchParams } from 'react-router-dom';
import { historicalEvents } from '@/data';
import { useLang } from '@/i18n/LanguageContext';
import { PageHeader } from '@/components/ContentCards/PageHeader';
import { HistoricalTimeline } from '@/components/HistoricalTimeline/HistoricalTimeline';

export default function Timeline() {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const selected = params.get('event') ?? historicalEvents[0]?.id ?? '';
  return (
    <div className="page page-timeline">
      <PageHeader icon="clock" title={t('navTimeline')} />
      <HistoricalTimeline events={historicalEvents} selectedId={selected} onSelect={(id) => setParams({ event: id }, { replace: true })} />
    </div>
  );
}
