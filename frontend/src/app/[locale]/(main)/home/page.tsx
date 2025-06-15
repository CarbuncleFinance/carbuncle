import Grid from '@mui/material/Grid'
import { useTranslations } from 'next-intl'
import PageLayout from '@/components/layouts/PageLayout'
import PageHeader from '@/components/layouts/PageHeader'
import MainContent from '@/app/[locale]/(main)/home/_components/MainContent'

export default function Home() {
  const t = useTranslations('Market')

  return (
    <PageLayout maxWidth="xl">
      <PageHeader title={t('pageTitle')} />
      <MainContent />
    </PageLayout>
  )
}
