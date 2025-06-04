import PageHeader from '@/components/features/layout/PageHeader'
import PageLayout from '@/components/features/layout/PageLayout'
import HistoryTable from '@/app/[locale]/(main)/history/_components/HistoryTable'

export default function HistoryPage() {
  return (
    <PageLayout maxWidth="md">
      <PageHeader title="History" />
      <HistoryTable />
    </PageLayout>
  )
}
