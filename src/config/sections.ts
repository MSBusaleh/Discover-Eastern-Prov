import type { IconName } from '@/components/ContentCards/Icon';
import type { StringKey } from '@/i18n/strings';

/** The seven primary sections (brief §3), in navigation order. */
export const sections: { path: string; icon: IconName; label: StringKey; short: StringKey; blurb?: StringKey }[] = [
  { path: '/explore', icon: 'map', label: 'navExplore', short: 'shortExplore' },
  { path: '/timeline', icon: 'clock', label: 'navTimeline', short: 'shortTimeline', blurb: 'blurbTimeline' },
  { path: '/unification', icon: 'flag', label: 'navUnification', short: 'shortUnification', blurb: 'blurbUnification' },
  { path: '/royal-visits', icon: 'crown', label: 'navRoyal', short: 'shortRoyal', blurb: 'blurbRoyal' },
  { path: '/people', icon: 'people', label: 'navPeople', short: 'shortPeople', blurb: 'blurbPeople' },
  { path: '/today', icon: 'spark', label: 'navToday', short: 'shortToday', blurb: 'blurbToday' },
];
