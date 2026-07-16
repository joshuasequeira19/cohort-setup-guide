import { cn } from '@/lib/utils'
import type { StepMap } from '@/types/guide'

export function Trail({
  history,
  steps,
  onJump,
}: {
  history: string[]
  steps: StepMap
  onJump: (index: number) => void
}) {
  const crumbs = history
    .map((id, index) => ({ id, index, crumb: steps[id]?.crumb }))
    .filter((c) => c.crumb)

  return (
    <div className="mb-8 flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-3 font-mono text-[13px] text-text-dim">
      <span className="mr-0.5 text-good">student@setup:~$</span>
      {crumbs.length === 0 ? (
        <span className="rounded px-1 py-0.5 font-medium text-primary">start</span>
      ) : (
        crumbs.map((c, i) => (
          <span key={c.index} className="flex items-center gap-1.5">
            <span className="text-border-strong">/</span>
            <button
              type="button"
              onClick={() => onJump(c.index)}
              className={cn(
                i === crumbs.length - 1 ? 'text-primary font-medium' : 'text-text-dim',
                'rounded px-1 py-0.5 transition-colors hover:bg-surface-2 hover:text-text',
              )}
            >
              {c.crumb}
            </button>
          </span>
        ))
      )}
    </div>
  )
}
