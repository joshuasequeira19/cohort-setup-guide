import type { ReactNode } from 'react'

export type StepOption = {
  label: string
  to: string
  icon?: ReactNode
}

export type Step = {
  tag: string
  crumb?: string | null
  title: string
  body: ReactNode
  options?: StepOption[]
  next?: string
  nextLabel?: string
  end?: boolean
  endGood?: boolean
}

export type StepMap = Record<string, Step>
