import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  label?: string
}

export default function LoadingSpinner({ label = 'Loading…' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-xs py-xl text-muted text-body">
      <Loader2 className="animate-spin" size={20} />
      <span>{label}</span>
    </div>
  )
}
