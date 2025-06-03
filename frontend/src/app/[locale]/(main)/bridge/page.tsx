import PageHeader from '@/components/features/layout/PageHeader'
import PageLayout from '@/components/features/layout/PageLayout'
import BridgeStepper from '@/app/[locale]/(main)/bridge/_components/BridgeStepper'

export default function BridgePage() {
  return (
    <PageLayout maxWidth="sm">
      <PageHeader title="Bridge" />
      <BridgeStepper />
    </PageLayout>
  )
}
