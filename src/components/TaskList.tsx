import type { Priority, Task } from '../types'
import TaskItem from './TaskItem'
import EmptyState from './EmptyState'

interface TaskListProps {
  tasks: Task[]
  emptyMessage: string
  onToggleCompleted: (task: Task) => void
  onUpdate: (id: string, updates: { title: string; description: string; priority: Priority }) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TaskList({ tasks, emptyMessage, onToggleCompleted, onUpdate, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <ul className="flex flex-col gap-sm">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleCompleted={onToggleCompleted}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
