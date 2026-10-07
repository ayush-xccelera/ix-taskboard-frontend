import { AlertTriangle, X } from 'lucide-react'

interface ErrorBannerProps {
  message: string
  onDismiss: () => void
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="flex items-start justify-between gap-sm rounded-card border border-danger/30 bg-danger/10 px-md py-sm text-small text-danger">
      <div className="flex items-start gap-xs">
        <AlertTriangle size={16} className="mt-0.5 shrink-0" />
        <span>{message}</span>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="shrink-0 text-danger hover:text-danger/70"
      >
        <X size={16} />
      </button>
    </div>
  )
}
