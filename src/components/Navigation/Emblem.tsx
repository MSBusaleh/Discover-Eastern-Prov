/**
 * Original site emblem: an eight-point star (a common motif in Saudi
 * architectural ornament) over a wave line for the Gulf coast.
 * The site's own identity; the SPE KFUPM logo appears in the footer.
 */
export function Emblem({ size = 40 }: { size?: number }) {
  return (
    <svg className="emblem" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="var(--c-fill)" />
      <path d="M20 6l3.8 9.2L33 19l-9.2 3.8L20 32l-3.8-9.2L7 19l9.2-3.8z" fill="var(--c-gold)" />
      <path d="M20 11.5l2 4.9 4.9 2-4.9 2-2 4.9-2-4.9-4.9-2 4.9-2z" fill="var(--c-fill)" />
      <path d="M6 33c3.5 0 3.5-2 7-2s3.5 2 7 2 3.5-2 7-2 3.5 2 7 2" stroke="var(--c-on-fill)" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity=".75" />
    </svg>
  );
}
