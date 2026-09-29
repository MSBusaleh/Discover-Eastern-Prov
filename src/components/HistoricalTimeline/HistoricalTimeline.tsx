import type { HistoricalEvent } from '@/types/content';
import { useLang } from '@/i18n/LanguageContext';
import { strings } from '@/i18n/strings';
import { Journey } from '@/components/Journey/Journey';
import { MapLinks } from '@/components/ContentCards/MapLinks';
import { MediaFrame } from '@/components/ContentCards/MediaFrame';
import { SourceList } from '@/components/ContentCards/SourceList';
import { StatusBadge } from '@/components/ContentCards/StatusBadge';
import { Text } from '@/components/ContentCards/Text';

interface Props {
  events: HistoricalEvent[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function HistoricalTimeline({ events, selectedId, onSelect }: Props) {
  const { L, t } = useLang();
  const current = events.find((e) => e.id === selectedId) ?? events[0];
  if (!current) return null;

  return (
    <Journey
      label={t('navTimeline')}
      stops={events.map((e) => ({ id: e.id, date: L(e.dateLabel), title: L(e.title) }))}
      selectedId={current.id}
      onSelect={onSelect}
    >
      <div className="detail-media">
        <MediaFrame imageIds={current.imageIds} label={L(current.title)} icon="clock" ratio="4 / 3" />
      </div>
      <div className="detail-body">
        <div className="detail-meta">
          {L(current.dateLabel) && <span className="date-pill mono">{L(current.dateLabel)}</span>}
          <StatusBadge status={current.status} />
        </div>
        <h2 id={`${current.id}-h`}>{L(current.title)}</h2>
        <Text value={current.summary} />
        <MapLinks
          ids={current.locationIds}
          back={{ backTo: `/timeline?event=${current.id}`, backLabel: strings.navTimeline, backDetail: current.title }}
        />
        <SourceList ids={current.sourceIds} />
      </div>
    </Journey>
  );
}
