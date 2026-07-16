import { AnimatedGroup } from '@/components/motion-primitives/animated-group'

const steps = [
  {
    n: '01',
    title: 'Answer a few questions',
    body: "About your OS and hardware. Nothing to install yet, just figuring out which path is yours.",
  },
  {
    n: '02',
    title: 'Follow your exact steps',
    body: 'Only the instructions that apply to your setup, no scrolling past steps meant for a different OS.',
  },
  {
    n: '03',
    title: 'Verify before day one',
    body: 'A quick terminal check confirms everything worked before the cohort starts.',
  },
]

export function HowItWorks() {
  return (
    <div className="mt-12">
      <p className="mb-5 font-mono text-xs uppercase tracking-wider text-text-faint">How this works</p>
      <AnimatedGroup preset="blur-slide" className="grid gap-5 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n}>
            <p className="mb-2 font-mono text-sm text-primary">{s.n}</p>
            <p className="mb-1 font-display text-[15px] font-semibold text-text">{s.title}</p>
            <p className="text-sm leading-relaxed text-text-dim">{s.body}</p>
          </div>
        ))}
      </AnimatedGroup>
    </div>
  )
}
