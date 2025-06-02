import PageHeader from '@/components/features/layout/PageHeader'
import PageLayout from '@/components/features/layout/PageLayout'
import BridgeFormStepper from '@/app/[locale]/(main)/bridge/_components/BridgeFormStepper'

export default function BridgePage() {
  return (
    <PageLayout maxWidth="sm">
      <PageHeader title="Bridge" />
      <BridgeFormStepper />
    </PageLayout>
  )
}
