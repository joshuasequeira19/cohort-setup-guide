import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function TerminalPanel({
  path,
  headerRight,
  className,
  bodyClassName,
  children,
}: {
  path: string
  headerRight?: ReactNode
  className?: string
  bodyClassName?: string
  children: ReactNode
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-surface', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-2 px-4 py-2.5">
        <span className="font-mono text-xs text-text-dim">{path}</span>
        {headerRight}
      </div>
      <div className={cn('p-7', bodyClassName)}>{children}</div>
    </div>
  )
}
