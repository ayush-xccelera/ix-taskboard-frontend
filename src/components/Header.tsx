import { useEffect, useState } from 'react'
import { CheckCircle2, ClipboardList, XCircle } from 'lucide-react'
import { getHealth } from '../data/store'
import type { HealthStatus } from '../types'

export default function Header() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [isLoadingHealth, setIsLoadingHealth] = useState(true)

  useEffect(() => {
    let isMounted = true

    getHealth()
      .then((result) => {
        if (isMounted) {
          setHealth(result)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingHealth(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <header className="bg-surface border-b border-border">
      <div className="mx-auto max-w-3xl px-lg py-md flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <ClipboardList className="text-primary" size={28} />
          <h1 className="text-h1 text-text-dark">Taskboard</h1>
        </div>

        <div className="flex items-center gap-xs text-small">
          {isLoadingHealth ? (
            <span className="text-muted">Checking API…</span>
          ) : health?.status === 'ok' ? (
            <span className="flex items-center gap-xs text-success">
              <CheckCircle2 size={16} />
              API healthy
            </span>
          ) : (
            <span className="flex items-center gap-xs text-danger">
              <XCircle size={16} />
              API unavailable
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
