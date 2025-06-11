import Grid from '@mui/material/Grid'
import PageLayout from '@/components/layouts/PageLayout'
import PageHeader from '@/components/layouts/PageHeader'
import GridSupplyCard from '@/app/[locale]/(main)/home/_components/GridSupplyCard'
import GridAssetsToSupplyCard from '@/app/[locale]/(main)/home/_components/GridAssetsToSupplyCard'
import GridDisconnectCard from '@/app/[locale]/(main)/home/_components/GridDisconnectCard'
import GridBorrowCard from '@/app/[locale]/(main)/home/_components/GridBorrowCard'
import GridAssetsToBorrowCard from '@/app/[locale]/(main)/home/_components/GridAssetsToBorrowCard'

export default function Home() {
  return (
    <>
      {/*<AnimatedBackground />*/}
      <PageLayout maxWidth="xl">
        <PageHeader title="XRP Market" />
        <Grid container spacing={2}>
          <GridDisconnectCard size={6} />
          <GridSupplyCard size={6} />
          <GridBorrowCard size={6} />
          <GridAssetsToSupplyCard size={6} />
          <GridAssetsToBorrowCard size={6} />
        </Grid>
      </PageLayout>
    </>
  )
}
