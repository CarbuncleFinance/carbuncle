import PageHeader from '@/components/layouts/PageHeader'
import PageLayout from '@/components/layouts/PageLayout'
import HistoryTable from '@/app/[locale]/(main)/history/_components/HistoryTable'

export default function HistoryPage() {
  return (
    <PageLayout maxWidth="md">
      <PageHeader title="History" />
      <HistoryTable />
    </PageLayout>
  )
}
