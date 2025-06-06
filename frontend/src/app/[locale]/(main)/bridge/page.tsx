import PageHeader from '@/components/layouts/PageHeader'
import PageLayout from '@/components/layouts/PageLayout'
import BridgeStepper from '@/app/[locale]/(main)/bridge/_components/BridgeStepper'

export default function BridgePage() {
  return (
    <PageLayout maxWidth="sm">
      <PageHeader title="Bridge" />
      <BridgeStepper />
    </PageLayout>
  )
}
