import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { TerminalPanel } from '@/components/ui/TerminalPanel'

export function GuideCard({
  to,
  guideId,
  path,
  title,
  description,
  meta,
  supports,
}: {
  to: string
  guideId: string
  path: string
  title: string
  description: string
  meta: string
  supports: string[]
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
    <Link to={to} className="group block">
      <TerminalPanel
        path={path}
        className="transition-colors group-hover:border-primary-dim"
        headerRight={
          done ? (
            <span className="flex items-center gap-1 font-mono text-xs text-good">
              <Check className="h-3 w-3" /> done
            </span>
          ) : undefined
        }
      >
        <p className="font-display text-lg font-semibold text-text">{title}</p>
        <p className="mt-2 text-[15px] text-text-dim">{description}</p>

        <p className="mt-4 font-mono text-xs text-text-faint">
          supports <span className="text-text-dim">{supports.join(' · ')}</span>
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-mono text-xs text-text-dim">{meta}</span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
            Start guide
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </TerminalPanel>
    </Link>
  )
}
