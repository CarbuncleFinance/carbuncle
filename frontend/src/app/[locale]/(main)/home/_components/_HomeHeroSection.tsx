'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { animatedTitle } from '@/styles/index.css'
import { APP_NAME } from '@/constants/app'

export default function HomeHeroSection() {
  const t = useTranslations('HomePage')

  return (
    <>
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
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#e95464' }}>
          {t('title2')}
        </Typography>
      </Box>
    </>
  )
}
