import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, ClipboardList, RotateCcw } from 'lucide-react'
import { useGuideEngine } from '@/hooks/useGuideEngine'
import { Trail } from '@/components/guide/Trail'
import { StepBody } from '@/components/guide/primitives'
import { TerminalPanel } from '@/components/ui/TerminalPanel'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import type { StepMap } from '@/types/guide'

export function GuideView({ guideId, steps }: { guideId: string; steps: StepMap }) {
  const engine = useGuideEngine(guideId, steps)
  const { history, currentStepId, currentStep, showResumeBanner, goTo, goBack, jumpTo, restart, buildSummary } = engine
  const [copied, setCopied] = useState(false)

  if (!currentStep) return null

  const onCopySummary = async () => {
    const summary = await buildSummary()
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      <Trail history={history} steps={steps} onJump={jumpTo} />

      <AnimatePresence mode="wait">
        {showResumeBanner && (
          <motion.div
            key="resume-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-[#f0c98a]"
          >
            Picking up where you left off. <button onClick={restart} className="underline underline-offset-2">Start over instead</button>
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalPanel
        path={`guides/${guideId}/${currentStepId}.sh`}
        headerRight={<span className="font-mono text-xs text-text-faint">step {history.length}</span>}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStepId}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {history.length > 1 && !currentStep.options && (
              <button
                onClick={goBack}
                className="mb-4 flex items-center gap-1.5 text-[13.5px] text-text-dim transition-colors hover:text-text"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
            )}

            <p className="mb-1.5 font-mono text-xs uppercase tracking-wider text-primary">{currentStep.tag}</p>
            <h2 className="mb-3 font-display text-[1.3rem] font-semibold text-text">{currentStep.title}</h2>

            <StepBody>{currentStep.body}</StepBody>

            {currentStep.options && (
              <div className="mt-5 flex flex-col gap-2.5">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt.to}
                    onClick={() => goTo(opt.to)}
                    className="group flex w-full items-center gap-3 rounded-lg border border-border bg-surface-2 px-4 py-3.5 text-left text-[15px] font-medium text-text transition-all hover:-translate-y-px hover:border-primary-dim hover:bg-[#232b36]"
                  >
                    {opt.icon && <span className="shrink-0 text-primary [&>svg]:h-[22px] [&>svg]:w-[22px]">{opt.icon}</span>}
                    <span className="flex-1">{opt.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-text-dim transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            )}

            {currentStep.next && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => goTo(currentStep.next!)}
                  className="rounded-lg bg-primary px-5 py-2.5 text-[14.5px] font-semibold text-[#1a1206] transition-colors hover:bg-[#f2b357]"
                >
                  {currentStep.nextLabel}
                </button>
              </div>
            )}

            {(currentStep.end || currentStep.endGood) && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  onClick={restart}
                  className="flex items-center gap-1.5 rounded-lg border border-border-strong bg-surface-2 px-4 py-2.5 text-[14.5px] font-medium text-text transition-colors hover:border-primary-dim"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Start over
                </button>
                <button
                  onClick={onCopySummary}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[14.5px] font-medium transition-colors',
                    copied ? 'text-good' : 'text-text-dim hover:text-text',
                  )}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <ClipboardList className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy my steps as notes'}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </TerminalPanel>
    </>
  )
}
