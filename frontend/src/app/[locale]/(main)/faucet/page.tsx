import PageLayout from '@/components/layouts/PageLayout'
import PageHeader from '@/components/layouts/PageHeader'
import SectionFaucetList from '@/app/[locale]/(main)/faucet/_components/SectionFaucetList'

export default function FaucetPage() {
  return (
    <PageLayout maxWidth="lg">
      <PageHeader title="Faucet" />
      <SectionFaucetList />
    </PageLayout>
  )
}
