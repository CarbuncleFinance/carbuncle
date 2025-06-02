'use client'

import { useTranslations } from 'next-intl'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function HomeFeatureCards() {
  const t = useTranslations('HomePage')

  return (
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
  )
}
