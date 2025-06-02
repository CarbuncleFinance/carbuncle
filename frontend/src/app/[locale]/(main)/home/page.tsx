import HomeHeroSection from '@/app/[locale]/(main)/home/_components/HomeHeroSection'
import HomeFeatureCards from '@/app/[locale]/(main)/home/_components/HomeFeatureCards'
import AnimatedBackground from '@/app/[locale]/(main)/home/_components/AnimatedBackground'
import PageLayout from '@/components/features/layout/PageLayout'

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <PageLayout maxWidth="lg">
        <HomeHeroSection />
        <HomeFeatureCards />
      </PageLayout>
    </>
  )
}
