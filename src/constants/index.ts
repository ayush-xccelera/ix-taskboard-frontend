import type { Priority, TaskFilter } from '../types'

export const PRIORITIES: Priority[] = ['low', 'medium', 'high']

export const FILTERS: { label: string; value: TaskFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const PRIORITY_COLOR_CLASSES: Record<Priority, string> = {
  low: 'bg-info/10 text-info border border-info/30',
  medium: 'bg-warning/10 text-warning border border-warning/30',
  high: 'bg-danger/10 text-danger border border-danger/30',
}
