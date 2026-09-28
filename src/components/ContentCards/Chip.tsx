import type { ReactNode } from 'react';
import { Icon } from './Icon';

/** Toggle chip for filters. Selection is shown by a check mark AND colour (§14). */
export function Chip({ selected, onClick, children, count }: { selected: boolean; onClick: () => void; children: ReactNode; count?: number }) {
  return (
    <button type="button" className={`chip ${selected ? 'is-selected' : ''}`} aria-pressed={selected} onClick={onClick}>
      {selected && <Icon name="check" size={16} />}
      <span>{children}</span>
      {count !== undefined && <span className="chip-count">{count}</span>}
    </button>
  );
}
