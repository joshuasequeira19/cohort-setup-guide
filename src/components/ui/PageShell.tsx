import type { ReactNode } from 'react'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { GridBackdrop } from '@/components/ui/GridBackdrop'

export function PageShell({
  eyebrow,
  title,
  subtitle,
  footer,
  children,
}: {
  eyebrow: ReactNode
  title: string
  subtitle: string
  footer: ReactNode
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <GridBackdrop />
      <div className="mx-auto max-w-[760px] px-6 pb-24 pt-12 sm:pt-16">
        <div className="mb-2 font-mono text-[12.5px] uppercase tracking-wider text-primary">{eyebrow}</div>
        <TextEffect
          as="h1"
          per="word"
          preset="fade-in-blur"
          className="mb-2 font-display text-[1.7rem] font-bold tracking-tight text-text sm:text-[2.1rem]"
        >
          {title}
        </TextEffect>
        <p className="mb-9 max-w-[52ch] text-[15px] text-text-dim">{subtitle}</p>

        {children}

        <footer className="mt-12 text-center text-[12.5px] text-text-dim">{footer}</footer>
      </div>
    </div>
  )
}
