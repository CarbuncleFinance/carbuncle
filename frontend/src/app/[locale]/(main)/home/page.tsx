import HomeHeroSection from '@/app/[locale]/(main)/home/_components/_HomeHeroSection'
import HomeFeatureCards from '@/app/[locale]/(main)/home/_components/HomeFeatureCards'
import AnimatedBackground from '@/app/[locale]/(main)/home/_components/AnimatedBackground'
import PageLayout from '@/components/layouts/PageLayout'
import SectionHero from '@/app/[locale]/(main)/home/_components/SectionHero'

export default function Home() {
  return (
    <>
      {/*<AnimatedBackground />*/}
      <PageLayout maxWidth="lg">
        {/*
        <HomeHeroSection />
        <HomeFeatureCards />
        */}
        <SectionHero />
      </PageLayout>
    </>
  )
}
