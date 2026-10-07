interface ActiveTaskCounterProps {
  count: number
}

export default function ActiveTaskCounter({ count }: ActiveTaskCounterProps) {
  return (
    <span className="text-small text-muted">
      {count} {count === 1 ? 'task' : 'tasks'} active
    </span>
  )
}
