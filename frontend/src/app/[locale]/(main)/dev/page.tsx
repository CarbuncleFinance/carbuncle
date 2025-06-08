import DevContent from '@/app/[locale]/(main)/dev/_components/dev-content'
import PageLayout from '@/components/layouts/PageLayout'
import PageHeader from '@/components/layouts/PageHeader'

export default function DevPage() {
  return (
    <PageLayout maxWidth="lg">
      <PageHeader title="Development" />
      <DevContent />
    </PageLayout>
  )
}
