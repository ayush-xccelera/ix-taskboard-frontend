import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-sm bg-background px-lg text-center">
      <h1 className="text-h1 text-text-dark">404</h1>
      <p className="text-body text-muted">This page does not exist.</p>
      <Link
        to="/"
        className="flex items-center gap-xs rounded-card bg-primary px-md py-xs text-button text-white"
      >
        <Home size={16} />
        Go Home
      </Link>
    </div>
  )
}
