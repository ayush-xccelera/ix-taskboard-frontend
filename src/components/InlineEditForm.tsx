import { useState } from 'react'
import type { FormEvent } from 'react'
import { Loader2, Save, X } from 'lucide-react'
import type { Priority, Task } from '../types'
import { PRIORITIES, PRIORITY_LABELS } from '../constants'
import { validateTitle, MAX_TITLE_LENGTH } from '../validation/validateTask'

interface InlineEditFormProps {
  task: Task
  onSave: (updates: { title: string; description: string; priority: Priority }) => Promise<void>
  onCancel: () => void
}

export default function InlineEditForm({ task, onSave, onCancel }: InlineEditFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState<Priority>(task.priority)
  const [titleError, setTitleError] = useState('')
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const currentTitleError = validateTitle(title)
  const isValid = currentTitleError === ''

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    if (!isValid) {
      setTitleError(currentTitleError)
      return
    }

    setIsSaving(true)

    try {
      await onSave({ title: title.trim(), description: description.trim(), priority })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
      <div className="flex flex-col gap-xs">
        <input
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (hasAttemptedSubmit) {
              setTitleError(validateTitle(event.target.value))
            }
          }}
          className="rounded-card border border-border px-sm py-xs text-body text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {hasAttemptedSubmit && titleError ? (
          <p className="text-small text-danger">{titleError}</p>
        ) : (
          <p className="text-small text-muted">Required, up to {MAX_TITLE_LENGTH} characters.</p>
        )}
      </div>

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={2}
        placeholder="Description (optional)"
        className="rounded-card border border-border px-sm py-xs text-body text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <div className="flex items-center gap-sm">
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
          className="rounded-card border border-border px-sm py-xs text-body text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {PRIORITIES.map((priorityOption) => (
            <option key={priorityOption} value={priorityOption}>
              {PRIORITY_LABELS[priorityOption]}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!isValid || isSaving}
          className="flex items-center gap-xs rounded-card bg-primary px-md py-xs text-button text-white disabled:cursor-not-allowed disabled:bg-primary/40"
        >
          {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-xs rounded-card border border-border px-md py-xs text-button text-text-dark hover:bg-border/30"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </form>
  )
}
