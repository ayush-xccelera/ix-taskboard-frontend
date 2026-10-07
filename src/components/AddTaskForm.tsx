import { useState } from 'react'
import type { FormEvent } from 'react'
import { Loader2, Plus } from 'lucide-react'
import type { Priority, Task } from '../types'
import { PRIORITIES, PRIORITY_LABELS } from '../constants'
import { validateTitle, MAX_TITLE_LENGTH } from '../validation/validateTask'
import { createTask } from '../data/store'

interface AddTaskFormProps {
  onCreated: (task: Task) => void
  onError: (message: string) => void
}

export default function AddTaskForm({ onCreated, onError }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [titleError, setTitleError] = useState('')
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentTitleError = validateTitle(title)
  const isValid = currentTitleError === ''

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    if (!isValid) {
      setTitleError(currentTitleError)
      return
    }

    setIsSubmitting(true)

    try {
      const task = await createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
      })

      onCreated(task)
      setTitle('')
      setDescription('')
      setPriority('medium')
      setTitleError('')
      setHasAttemptedSubmit(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create task'
      onError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-border bg-surface p-md flex flex-col gap-sm"
    >
      <h2 className="text-h2 text-text-dark">Add a task</h2>

      <div className="flex flex-col gap-xs">
        <label htmlFor="task-title" className="text-small text-muted">
          Title
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (hasAttemptedSubmit) {
              setTitleError(validateTitle(event.target.value))
            }
          }}
          placeholder="What needs to be done?"
          className="rounded-card border border-border px-sm py-xs text-body text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {hasAttemptedSubmit && titleError ? (
          <p className="text-small text-danger">{titleError}</p>
        ) : (
          <p className="text-small text-muted">Required, up to {MAX_TITLE_LENGTH} characters.</p>
        )}
      </div>

      <div className="flex flex-col gap-xs">
        <label htmlFor="task-description" className="text-small text-muted">
          Description (optional)
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add more detail…"
          rows={2}
          className="rounded-card border border-border px-sm py-xs text-body text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-end gap-sm">
        <div className="flex flex-col gap-xs">
          <label htmlFor="task-priority" className="text-small text-muted">
            Priority
          </label>
          <select
            id="task-priority"
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
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex items-center gap-xs rounded-card bg-primary px-md py-xs text-button text-white disabled:cursor-not-allowed disabled:bg-primary/40"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
          Add task
        </button>
      </div>
    </form>
  )
}
