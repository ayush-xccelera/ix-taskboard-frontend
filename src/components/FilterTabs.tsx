import { FILTERS } from '../constants'
import type { TaskFilter } from '../types'

interface FilterTabsProps {
  activeFilter: TaskFilter
  onChange: (filter: TaskFilter) => void
}

export default function FilterTabs({ activeFilter, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-xs">
      {FILTERS.map((filter) => {
        const isActive = filter.value === activeFilter

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={
              isActive
                ? 'rounded-pill bg-primary px-md py-xs text-button text-white'
                : 'rounded-pill bg-transparent px-md py-xs text-button text-muted hover:bg-border/50'
            }
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
