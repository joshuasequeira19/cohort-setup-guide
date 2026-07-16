import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { TerminalPanel } from '@/components/ui/TerminalPanel'

const steps = [
  {
    n: '1',
    title: 'answer',
    body: "About your OS and hardware. Nothing to install yet, just figuring out which path is yours.",
  },
  {
    n: '2',
    title: 'follow',
    body: 'Only the instructions that apply to your setup, no scrolling past steps meant for a different OS.',
  },
  {
    n: '3',
    title: 'verify',
    body: 'A quick terminal check confirms everything worked before the cohort starts.',
  },
]

export function HowItWorks() {
  return (
    <div className="mt-6">
      <TerminalPanel path="~ --how-it-works">
        <AnimatedGroup preset="blur-slide" className="space-y-5">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-3">
              <span className="shrink-0 font-mono text-sm text-good">$</span>
              <div>
                <p className="font-mono text-sm text-text">
                  step <span className="text-primary">{s.n}</span>
                  <span className="text-text-faint"> --</span>
                  {s.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text-dim">{s.body}</p>
              </div>
            </div>
          ))}
        </AnimatedGroup>
      </TerminalPanel>
    </div>
  )
}
