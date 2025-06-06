import PageHeader from '@/components/layouts/PageHeader'
import PageLayout from '@/components/layouts/PageLayout'
import Grid from '@mui/material/Grid'
import AccountInfoCard from '@/app/[locale]/(main)/mypage/_components/AccountInfoCard'
import LinkedAccountInfoCard from '@/app/[locale]/(main)/mypage/_components/LinkedAccountInfoCard'
import BalanceInfoCard from '@/app/[locale]/(main)/mypage/_components/BalanceInfoCard'

export default function MyPage() {
  return (
    <PageLayout maxWidth="lg">
      <PageHeader title="MyPage" />
      <div>MyPage</div>
      <Grid container spacing={2}>
        <AccountInfoCard size={6} />
        <LinkedAccountInfoCard size={6} />
        <BalanceInfoCard size={12} />
      </Grid>
    </PageLayout>
  )
}
