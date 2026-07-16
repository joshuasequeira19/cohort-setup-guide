import { useCallback, useEffect, useRef, useState } from 'react'
import type { StepMap } from '@/types/guide'

function loadHistory(storageKey: string, steps: StepMap): { history: string[]; resumed: boolean } {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (
      saved &&
      Array.isArray(saved.history) &&
      saved.history.length &&
      saved.history.every((id: string) => steps[id])
    ) {
      return { history: saved.history, resumed: saved.history.length > 1 }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return { history: ['start'], resumed: false }
}

export function useGuideEngine(guideId: string, steps: StepMap) {
  const storageKey = `guide-progress-${guideId}`
  const completeKey = `guide-completed-${guideId}`

  const initial = useRef(loadHistory(storageKey, steps))
  const [history, setHistory] = useState<string[]>(initial.current.history)
  const [showResumeBanner, setShowResumeBanner] = useState(initial.current.resumed)

  const currentStepId = history[history.length - 1]
  const currentStep = steps[currentStepId]

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ history }))
      if (currentStep?.endGood) {
        localStorage.setItem(completeKey, '1')
      }
    } catch {
      /* storage unavailable, progress just won't persist */
    }
  }, [history, storageKey, completeKey, currentStep?.endGood])

  const goTo = useCallback((id: string) => {
    setShowResumeBanner(false)
    setHistory((h) => [...h, id])
  }, [])

  const goBack = useCallback(() => {
    setShowResumeBanner(false)
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h))
  }, [])

  const jumpTo = useCallback((index: number) => {
    setShowResumeBanner(false)
    setHistory((h) => h.slice(0, index + 1))
  }, [])

  const restart = useCallback(() => {
    setShowResumeBanner(false)
    setHistory(['start'])
  }, [])

  const buildSummary = useCallback(async () => {
    const { renderToStaticMarkup } = await import('react-dom/server')
    const lines: string[] = []
    history.forEach((id) => {
      const step = steps[id]
      if (!step) return
      lines.push(`# ${step.title}`)
      const html = renderToStaticMarkup(step.body as React.ReactElement)
      const tmp = document.createElement('div')
      tmp.innerHTML = html
      const text = (tmp.textContent ?? '').replace(/\n{3,}/g, '\n\n').trim()
      if (text) lines.push(text)
      lines.push('')
    })
    return lines.join('\n')
  }, [history, steps])

  return {
    history,
    currentStepId,
    currentStep,
    showResumeBanner,
    dismissResumeBanner: () => setShowResumeBanner(false),
    goTo,
    goBack,
    jumpTo,
    restart,
    buildSummary,
  }
}
