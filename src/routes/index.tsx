import { createBrowserRouter, Navigate } from 'react-router-dom'
import { App } from '../App'
import { TaskboardPage } from '../pages/TaskboardPage'
import { NotFound } from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/tasks" replace /> },
      { path: 'tasks', element: <TaskboardPage /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])
