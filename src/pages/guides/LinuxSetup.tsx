import { Link } from 'react-router-dom'
import { PageShell } from '@/components/ui/PageShell'
import { GuideView } from '@/components/guide/GuideView'
import { linuxSetupSteps } from '@/data/linuxSetup'

export default function LinuxSetup() {
  return (
    <PageShell
      eyebrow={
        <>
          <Link to="/" className="text-primary hover:underline">
            Pre-cohort setup
          </Link>{' '}
          / Linux
        </>
      }
      title="Get Linux running on your own machine"
      subtitle="Answer a few questions about your computer and this will build the exact steps for your setup. Takes about 1–2 hours, most of it just waiting on a download."
      footer="Stuck at any point? Post a screenshot in the class group, that's faster to help with than a text description."
    >
      <GuideView guideId="linux-setup" steps={linuxSetupSteps} />
    </PageShell>
  )
}
