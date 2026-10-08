import type { HealthStatus, Task, TaskInput } from '../types'
import { mockTasks } from './mockData'
import { apiClient } from '../api/client'

const TASKS_STORAGE_KEY = 'tasks'
const MAX_TITLE_LENGTH = 100

function loadTasks(): Task[] {
  const raw = localStorage.getItem(TASKS_STORAGE_KEY)

  if (raw) {
    return JSON.parse(raw) as Task[]
  }

  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(mockTasks))
  return mockTasks
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
}

// MOCK: stands in for GET /api/tasks
function localGetTasks(): Task[] {
  return loadTasks()
}

// MOCK: stands in for POST /api/tasks, including the 100-char title validation
// the real backend is expected to enforce server-side.
function localCreateTask(input: TaskInput): Task {
  if (!input.title.trim()) {
    throw new Error('Title is required')
  }

  if (input.title.length > MAX_TITLE_LENGTH) {
    throw new Error(`Title must be ${MAX_TITLE_LENGTH} characters or fewer`)
  }

  const all = loadTasks()
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    description: input.description.trim(),
    priority: input.priority,
    completed: false,
    createdAt: new Date().toISOString(),
  }

  all.unshift(task)
  saveTasks(all)
  return task
}

// MOCK: stands in for PUT /api/tasks/:id (full field update or partial
// { completed } toggle, matching the real API's accepted body shapes).
function localUpdateTask(id: string, updates: Partial<TaskInput> & { completed?: boolean }): Task {
  const all = loadTasks()
  const index = all.findIndex((task) => task.id === id)

  if (index === -1) {
    throw new Error('Task not found')
  }

  if (updates.title !== undefined) {
    if (!updates.title.trim()) {
      throw new Error('Title is required')
    }

    if (updates.title.length > MAX_TITLE_LENGTH) {
      throw new Error(`Title must be ${MAX_TITLE_LENGTH} characters or fewer`)
    }
  }

  const updated: Task = {
    ...all[index],
    ...updates,
  }

  all[index] = updated
  saveTasks(all)
  return updated
}

// MOCK: stands in for DELETE /api/tasks/:id
function localDeleteTask(id: string): void {
  const all = loadTasks().filter((task) => task.id !== id)
  saveTasks(all)
}

// MOCK: stands in for GET /api/health
function localGetHealth(): HealthStatus {
  return { status: 'ok' }
}

// TODO(USE_MOCK): verify path + response shape against the real backend's
// OpenAPI schema before flipping this to false. When false, requests go to
// `${REACT_APP_API_URL}/api/tasks` via src/api/client.ts (fetch-based).
export const USE_MOCK = false

export async function getTasks(): Promise<Task[]> {
  if (USE_MOCK) return localGetTasks()
  const data = await apiClient.get<Task[]>('/api/tasks')
  return data ?? []
}

export async function createTask(input: TaskInput): Promise<Task> {
  if (USE_MOCK) return localCreateTask(input)
  const data = await apiClient.post<Task>('/api/tasks', input)
  if (!data) throw new Error('No task returned from server')
  return data
}

export async function updateTask(
  id: string,
  updates: Partial<TaskInput> & { completed?: boolean },
): Promise<Task> {
  if (USE_MOCK) return localUpdateTask(id, updates)
  const data = await apiClient.put<Task>(`/api/tasks/${id}`, updates)
  if (!data) throw new Error('No task returned from server')
  return data
}

export async function deleteTask(id: string): Promise<void> {
  if (USE_MOCK) {
    localDeleteTask(id)
    return
  }

  await apiClient.delete<void>(`/api/tasks/${id}`)
}

export async function getHealth(): Promise<HealthStatus> {
  if (USE_MOCK) return localGetHealth()

  try {
    const data = await apiClient.get<HealthStatus>('/api/health')
    return data ?? { status: 'error' }
  } catch {
    return { status: 'error' }
  }
}
