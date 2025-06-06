import PageLayout from '@/app/[locale]/(lp)/_components/PageLayout'
import SectionHero from '@/app/[locale]/(lp)/_components/SectionHero'
import SectionFooter from '@/app/[locale]/(lp)/_components/SectionFooter'

export default function LPPage() {
  return (
    <>
      <PageLayout maxWidth="lg">
        <SectionHero />
      </PageLayout>
      <SectionFooter />
    </>
  )
}
