import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Outlet />
      <Toaster position="top-right" />
    </div>
  )
}
