import { ArrowDownAZ, ArrowUpZA } from 'lucide-react';

export type SortOrder = 'asc' | 'desc';

interface SortControlsProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

export const SortControls = ({ sortOrder, onSortChange }: SortControlsProps) => {
  return (
    <div className="sort-controls">
      <button
        className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
        onClick={() => onSortChange('asc')}
        aria-label="Sort A to Z"
      >
        <ArrowDownAZ size={20} />
        A-Z
      </button>
      <button
        className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
        onClick={() => onSortChange('desc')}
        aria-label="Sort Z to A"
      >
        <ArrowUpZA size={20} />
        Z-A
      </button>
    </div>
  );
};
