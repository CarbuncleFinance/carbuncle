import PageLayout from '@/app/[locale]/(lp)/_components/PageLayout'
import SectionHero from '@/app/[locale]/(lp)/_components/SectionHero'
import SectionFooter from '@/app/[locale]/(lp)/_components/SectionFooter'
import { YouTubeEmbed } from '@/app/[locale]/(lp)/_components/YouTubeEmbed'

export default function LPPage() {
  return (
    <>
      <PageLayout maxWidth="lg">
        <SectionHero />
        <YouTubeEmbed videoId="NLHFoORciYM" />
      </PageLayout>
      <SectionFooter />
    </>
  )
}
