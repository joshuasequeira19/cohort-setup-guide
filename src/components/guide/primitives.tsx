import { useState, type ReactNode } from 'react'
import { Check, Copy, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CommandBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return (
    <div className="my-3.5 overflow-hidden rounded-xl border border-border bg-[#0c0d12]">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2">
        <span className="font-mono text-xs text-text-dim">{label}</span>
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center gap-1.5 rounded-md border border-border-strong px-2.5 py-1 font-mono text-xs text-text-dim transition-colors hover:border-primary-dim hover:text-text"
        >
          {copied ? <Check className="h-3 w-3 text-good" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3">
        <code className="whitespace-pre font-mono text-[13.5px] text-[#dbe4ee]">{code}</code>
      </pre>
    </div>
  )
}

export function LinkChip({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return (
    <span
      className={cn(
        'mx-0.5 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 align-middle font-mono text-[13.5px] transition-colors',
        copied ? 'border-good text-good' : 'border-border-strong text-primary',
      )}
    >
      <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
        {url}
      </a>
      <button type="button" onClick={onCopy} aria-label="Copy link" className="opacity-70 transition-opacity hover:opacity-100">
        {copied ? <Check className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
      </button>
    </span>
  )
}

const calloutClasses = {
  warn: 'bg-bad/10 border-bad/30 text-[#f0b3ad]',
  good: 'bg-good/10 border-good/30 text-[#a7e0c6]',
  info: 'bg-primary/10 border-primary/30 text-[#f0c98a]',
}

export function Callout({ variant, children }: { variant: keyof typeof calloutClasses; children: ReactNode }) {
  return <div className={cn('my-3.5 rounded-lg border px-4 py-3 text-sm leading-relaxed', calloutClasses[variant])}>{children}</div>
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-md border border-b-2 border-border-strong bg-surface-2 px-1.5 py-0.5 font-mono text-[13px] text-text">
      {children}
    </kbd>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[13.5px] text-primary">{children}</code>
}

export function StepBody({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        'space-y-3.5 text-[15px] leading-relaxed text-text-dim',
        '[&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5',
        '[&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5',
        '[&_b]:font-semibold [&_b]:text-text',
      )}
    >
      {children}
    </div>
  )
}

export function IconWindows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="4" width="8" height="8" />
      <rect x="13" y="4" width="8" height="8" />
      <rect x="3" y="14" width="8" height="6" />
      <rect x="13" y="14" width="8" height="6" />
    </svg>
  )
}

export function IconMac({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
  )
}

export function IconLinux({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3" />
      <line x1="12" y1="15" x2="16" y2="15" />
    </svg>
  )
}
