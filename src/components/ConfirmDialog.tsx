interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-md">
      <div className="w-full max-w-sm rounded-card bg-surface p-lg shadow-lg">
        <h2 className="text-h2 text-text-dark mb-xs">{title}</h2>
        <p className="text-body text-muted mb-md">{message}</p>

        <div className="flex justify-end gap-sm">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-card px-md py-xs text-button text-text-dark border border-border hover:bg-border/30"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-card bg-danger px-md py-xs text-button text-white hover:bg-danger/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
