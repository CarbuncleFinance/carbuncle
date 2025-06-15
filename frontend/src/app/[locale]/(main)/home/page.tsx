import Grid from '@mui/material/Grid'
import PageLayout from '@/components/layouts/PageLayout'
import PageHeader from '@/components/layouts/PageHeader'
import MainContent from '@/app/[locale]/(main)/home/_components/MainContent'

export default function Home() {
  return (
    <PageLayout maxWidth="xl">
      <PageHeader title="XRP Market" />
      <MainContent />
    </PageLayout>
  )
}
