/**
 * Small original line-icon set (24px grid, stroke = currentColor).
 * Icons marked `directional` are mirrored automatically in RTL.
 */
const paths = {
  home: 'M4 11 12 4l8 7M6 9.5V20h4.5v-5h3v5H18V9.5',
  map: 'M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Zm0 0v14m6-12v14',
  pin: 'M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2',
  flag: 'M5 21V4m0 0h11l-2 4 2 4H5',
  crown: 'M4 18h16M5 15 3.5 7l5 3.5L12 5l3.5 5.5 5-3.5L19 15H5Z',
  people: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9c0-3.3 2.7-6 6-6s6 2.7 6 6m1-9a3 3 0 1 0 0-6m2.5 15c0-2.6-1.2-4.6-3-5.6',
  spark: 'M12 3v4m0 10v4m9-9h-4M7 12H3m14.4-5.4-2.8 2.8m-5.2 5.2-2.8 2.8m10.8 0-2.8-2.8M9.4 9.4 6.6 6.6',
  quiz: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-2.5-11.5a2.6 2.6 0 0 1 5 .8c0 1.9-2.5 2.2-2.5 3.7m0 3v.1',
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Zm0 15A2.5 2.5 0 0 0 6.5 23H20v-5',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M5 12.5 10 17.5 19 7',
  x: 'M7 7l10 10M17 7 7 17',
  filter: 'M4 5h16l-6 7.5V19l-4-2v-4.5L4 5Z',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  external: 'M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  image: 'M4 5h16v14H4V5Zm0 11 4.5-4.5 4 4 2.5-2.5L20 18M15.5 9.5h.01',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-10v6m0-9v.1',
  warn: 'M12 4 2.5 20h19L12 4Zm0 6v4.5m0 3v.1',
  factory: 'M3 20V10l5 3v-3l5 3V6h3l1.5 14H3Zm0 0h18',
  cap: 'M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Zm4 2.2V16c1.5 1.6 3.4 2.3 5.5 2.3s4-.7 5.5-2.3v-4.8M21.5 9v5',
  briefcase: 'M4 8h16v11H4V8Zm5 0V5.5h6V8M4 13h16',
  bridge: 'M2 16h20M4 16v4m16-4v4M4 16c2-5 5-8 8-8s6 3 8 8M12 8v8M8 10.2V16m8-5.8V16',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-13v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z',
  palm: 'M12 21V11m0 0C10 8 6.5 7 4 8.5 6 5.5 10 6 12 11Zm0 0c2-3 5.5-4 8-2.5C18 5.5 14 6 12 11Zm0 0c-.5-3.5 1-6.5 3.5-7.5M12 11c.5-3.5-1-6.5-3.5-7.5',
  mountain: 'M2.5 19 9 8l4 6.5 2.5-3.5 6 8H2.5Zm6.5-11 2.2 3.6',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  // directional
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  chevron: 'M9 5l7 7-7 7',
  back: 'M19 12H5m6 6-6-6 6-6',
} as const;

export type IconName = keyof typeof paths;
const directional = new Set<IconName>(['arrow', 'chevron', 'back']);

export function Icon({ name, size = 22, className = '' }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={`icon ${directional.has(name) ? 'flip-rtl' : ''} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
