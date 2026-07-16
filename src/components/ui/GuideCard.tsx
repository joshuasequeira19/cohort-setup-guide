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
  paths,
}: {
  to: string
  guideId: string
  icon: ReactNode
  title: string
  description: string
  meta: string
  paths: { label: string; icon: ReactNode }[]
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
      className="group block rounded-2xl border border-border bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-primary-dim hover:bg-surface-2"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary [&>svg]:h-6 [&>svg]:w-6">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-primary">Setup guide</p>
          <p className="font-display text-lg font-semibold text-text">{title}</p>
        </div>
        {done && (
          <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-good">
            <CheckCircle2 className="h-3.5 w-3.5" /> done
          </span>
        )}
      </div>

      <p className="mt-3 text-[15px] text-text-dim">{description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {paths.map((p) => (
          <span
            key={p.label}
            className="flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs text-text-dim [&>svg]:h-3.5 [&>svg]:w-3.5"
          >
            {p.icon}
            {p.label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-xs text-text-dim">{meta}</span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
          Start guide
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
