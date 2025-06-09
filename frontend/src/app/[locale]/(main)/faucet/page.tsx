import PageLayout from '@/components/layouts/PageLayout'
import PageHeader from '@/components/layouts/PageHeader'
import SectionFaucetList from '@/app/[locale]/(main)/faucet/_components/SectionFaucetList'

export default function FaucetPage() {
  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Faucet"
        description="Faucet is a service that allows you to get free XRP and XCB tokens."
      />
      <SectionFaucetList />
    </PageLayout>
  )
}
