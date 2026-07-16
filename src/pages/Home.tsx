import { PageShell } from '@/components/ui/PageShell'
import { GuideCard } from '@/components/ui/GuideCard'
import { HowItWorks } from '@/components/ui/HowItWorks'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { IconLinux, IconMac, IconWindows } from '@/components/guide/primitives'

export default function Home() {
  return (
    <PageShell
      eyebrow="Pre-cohort setup"
      title="Get your machine ready before day one"
      subtitle="Pick a guide below. Each one asks a few questions about your setup and walks you through only the steps that apply to you."
      footer="More guides get added here as the cohort needs them. Stuck at any point? Post a screenshot in the class group."
    >
      <AnimatedGroup preset="blur-slide">
        <GuideCard
          to="/guides/linux-setup"
          guideId="linux-setup"
          icon={<IconLinux />}
          title="Get Linux running on your own machine"
          description="Install WSL2 (Windows) or a Linux VM (Mac), tailored to your OS and chip."
          meta="~1–2 hours"
          paths={[
            { label: 'Windows', icon: <IconWindows /> },
            { label: 'Mac', icon: <IconMac /> },
            { label: 'Linux', icon: <IconLinux /> },
          ]}
        />
      </AnimatedGroup>

      <HowItWorks />
    </PageShell>
  )
}
