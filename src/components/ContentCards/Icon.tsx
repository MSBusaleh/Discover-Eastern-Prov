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
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Zm0 15A2.5 2.5 0 0 0 6.5 23H20v-5',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M5 12.5 10 17.5 19 7',
  external: 'M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  image: 'M4 5h16v14H4V5Zm0 11 4.5-4.5 4 4 2.5-2.5L20 18M15.5 9.5h.01',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-13v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4',
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
