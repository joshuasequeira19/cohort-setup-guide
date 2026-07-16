import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function GuideCard({
  to,
  guideId,
  icon,
  title,
  description,
  meta,
}: {
  to: string
  guideId: string
  icon: ReactNode
  title: string
  description: string
  meta: string
}) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    try {
      setDone(localStorage.getItem(`guide-completed-${guideId}`) === '1')
    } catch {
      /* ignore */
    }
  }, [guideId])

  return (
    <Link
      to={to}
      className="group flex items-start gap-4 rounded-2xl border border-border bg-surface px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-primary-dim hover:bg-surface-2"
    >
      <span className="mt-0.5 shrink-0 text-primary [&>svg]:h-7 [&>svg]:w-7">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="mb-1 font-display text-[1.05rem] font-semibold text-text">{title}</p>
        <p className="mb-2 text-sm text-text-dim">{description}</p>
        <div className="flex items-center gap-3.5 font-mono text-xs text-text-dim">
          <span>{meta}</span>
          {done && (
            <span className="flex items-center gap-1 text-good">
              <CheckCircle2 className="h-3.5 w-3.5" /> completed
            </span>
          )}
        </div>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-text-dim transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  )
}
