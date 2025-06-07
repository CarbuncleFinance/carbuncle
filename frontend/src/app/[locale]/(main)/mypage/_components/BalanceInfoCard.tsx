'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'

type BalanceInfoCardProps = {
  size: number
}

export default function BalanceInfoCard({ size }: BalanceInfoCardProps) {
  const t = useTranslations('MyPage.balanceInfo')

  return (
    <Grid size={size}>
      <Card variant="outlined">
        <CardContent>
          <Box mb={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              {t('title')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('description')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
