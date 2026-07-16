import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Disclosure, DisclosureTrigger, DisclosureContent } from '@/components/motion-primitives/disclosure'

export function StepDisclosure({ summary, children }: { summary: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <Disclosure
      open={open}
      onOpenChange={setOpen}
      className="my-3.5 overflow-hidden rounded-xl border border-border"
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <DisclosureTrigger>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 bg-surface-2 px-4 py-2.5 text-left text-sm font-medium text-primary"
        >
          <span>{summary}</span>
          <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} />
        </button>
      </DisclosureTrigger>
      <DisclosureContent>
        <div className="space-y-2.5 px-4 py-3.5 text-[14.5px] leading-relaxed text-text-dim [&_b]:font-semibold [&_b]:text-text [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5">
          {children}
        </div>
      </DisclosureContent>
    </Disclosure>
  )
}
