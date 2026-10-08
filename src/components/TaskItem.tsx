import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import type { Priority, Task } from '../types'
import { PRIORITY_COLOR_CLASSES, PRIORITY_LABELS } from '../constants'
import { formatDate } from '../utils/formatDate'
import InlineEditForm from './InlineEditForm'
import ConfirmDialog from './ConfirmDialog'

interface TaskItemProps {
  task: Task
  onToggleCompleted: (task: Task) => void
  onUpdate: (id: string, updates: { title: string; description: string; priority: Priority }) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TaskItem({ task, onToggleCompleted, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSave(updates: { title: string; description: string; priority: Priority }) {
    await onUpdate(task.id, updates)
    setIsEditing(false)
  }

  async function handleConfirmDelete() {
    setIsDeleting(true)

    try {
      await onDelete(task.id)
    } finally {
      setIsDeleting(false)
      setIsConfirmingDelete(false)
    }
  }

  if (isEditing) {
    return (
      <li className="rounded-card border border-border bg-surface p-md">
        <InlineEditForm
          task={task}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    )
  }

  return (
    <li className="rounded-card border border-border bg-surface p-md flex items-start gap-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleCompleted(task)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'active' : 'completed'}`}
        className="mt-1 h-4 w-4 accent-primary"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-sm flex-wrap">
          <p className={task.completed ? 'text-body text-muted line-through' : 'text-body text-text-dark'}>
            {task.title}
          </p>
          <span className={`rounded-pill px-sm py-0.5 text-small ${PRIORITY_COLOR_CLASSES[task.priority]}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
        </div>

        {task.description && (
          <p className={task.completed ? 'text-small text-muted line-through mt-xs' : 'text-small text-muted mt-xs'}>
            {task.description}
          </p>
        )}

        <p className="text-small text-muted mt-xs">{formatDate(task.createdAt)}</p>
      </div>

      <div className="flex items-center gap-xs shrink-0">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Edit task"
          className="rounded-card p-xs text-muted hover:bg-border/40 hover:text-text-dark"
        >
          <Pencil size={16} />
        </button>
        <button
          type="button"
          onClick={() => setIsConfirmingDelete(true)}
          aria-label="Delete task"
          className="rounded-card p-xs text-muted hover:bg-danger/10 hover:text-danger"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {isConfirmingDelete && (
        <ConfirmDialog
          title="Delete task"
          message={`Are you sure you want to delete "${task.title}"? This cannot be undone.`}
          confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmingDelete(false)}
        />
      )}
    </li>
  )
}
