import { ClipboardX } from 'lucide-react'

interface EmptyStateProps {
  message: string
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-xs py-xl text-muted">
      <ClipboardX size={32} />
      <p className="text-body">{message}</p>
    </div>
  )
}
