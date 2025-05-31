'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { APP_NAME } from '@/constants/app'
import PageLayout from '@/components/features/layout/PageLayout'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { animatedTitle } from '@/styles/index.css'

export default function HomeView() {
  const t = useTranslations('HomePage')

  return (
    <>
      <AnimatedBackground />
      <PageLayout maxWidth="lg">
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography
            variant="h3"
            className={animatedTitle}
            sx={{ fontWeight: 'bold' }}
          >
            {APP_NAME}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#fff' }}>
            {t('title1')}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 'bold', color: '#e95464' }}
          >
            {t('title2')}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid size={4} key={index}>
              <Card sx={{ backgroundColor: '#1a1a1a' }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={`/images/image${index + 1}.jpg`}
                  title={t(`card${index + 1}.title`)}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      color: '#fff',
                      textAlign: 'center',
                      mt: 1,
                      mb: 2
                    }}
                  >
                    {t(`card${index + 1}.title`)}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'gray' }}>
                    {t(`card${index + 1}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </PageLayout>
    </>
  )
}
