export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  completed: boolean
  createdAt: string
}

export type TaskInput = Pick<Task, 'title' | 'description' | 'priority'>

export type TaskFilter = 'all' | 'active' | 'completed'

export interface HealthStatus {
  status: 'ok' | 'error'
}
