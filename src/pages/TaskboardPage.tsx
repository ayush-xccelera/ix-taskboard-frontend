import { useEffect, useMemo, useState } from 'react'
import type { Priority, Task, TaskFilter } from '../types'
import { getTasks, updateTask, deleteTask } from '../data/store'
import AddTaskForm from '../components/AddTaskForm'
import FilterTabs from '../components/FilterTabs'
import ActiveTaskCounter from '../components/ActiveTaskCounter'
import TaskList from '../components/TaskList'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorBanner from '../components/ErrorBanner'

export function TaskboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    getTasks()
      .then((result) => {
        if (isMounted) {
          setTasks(result)
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : 'Failed to load tasks')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const activeCount = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks])

  const visibleTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed)
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.completed)
    }

    return tasks
  }, [tasks, filter])

  function handleTaskCreated(task: Task) {
    setTasks((previous) => [task, ...previous])
  }

  async function handleToggleCompleted(task: Task) {
    const previousTasks = tasks

    setTasks((current) =>
      current.map((item) => (item.id === task.id ? { ...item, completed: !item.completed } : item)),
    )

    try {
      await updateTask(task.id, { completed: !task.completed })
    } catch (error) {
      setTasks(previousTasks)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update task')
    }
  }

  async function handleUpdateTask(
    id: string,
    updates: { title: string; description: string; priority: Priority },
  ) {
    try {
      const updated = await updateTask(id, updates)
      setTasks((current) => current.map((item) => (item.id === id ? updated : item)))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update task')
      throw error
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await deleteTask(id)
      setTasks((current) => current.filter((item) => item.id !== id))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete task')
    }
  }

  const emptyMessage =
    filter === 'all'
      ? 'No tasks yet — add one above to get started.'
      : filter === 'active'
        ? 'No active tasks.'
        : 'No completed tasks yet.'

  return (
    <div className="mx-auto max-w-3xl px-lg py-lg flex flex-col gap-md">
      {errorMessage && (
        <ErrorBanner message={errorMessage} onDismiss={() => setErrorMessage('')} />
      )}

      <AddTaskForm onCreated={handleTaskCreated} onError={setErrorMessage} />

      <div className="flex items-center justify-between flex-wrap gap-sm">
        <FilterTabs activeFilter={filter} onChange={setFilter} />
        <ActiveTaskCounter count={activeCount} />
      </div>

      {isLoading ? (
        <LoadingSpinner label="Loading tasks…" />
      ) : (
        <TaskList
          tasks={visibleTasks}
          emptyMessage={emptyMessage}
          onToggleCompleted={handleToggleCompleted}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  )
}
