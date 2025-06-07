'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import { useWallet } from '@/hooks/useWallet'

export default function SectionHero() {
  const { isConnected, accountInfo } = useWallet()
  const t = useTranslations('Home')

  if (!isConnected) {
    return (
      <Typography
        variant="body1"
        sx={{ textAlign: 'center', mt: 28, color: 'text.secondary' }}
      >
        {t('connectWalletMessage')}
      </Typography>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              ACCOUNT INFO
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
              {t('accountInfoDescription')}
            </Typography>
            {/** Address */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">Address:</Typography>
              <Typography variant="body1">
                {accountInfo?.account || '-'}
              </Typography>
            </Box>
            {/** Balance */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">Balance:</Typography>
              <Typography variant="body1">
                {accountInfo?.balance || '0'} XRP
              </Typography>
            </Box>
            {/** Domain */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">Domain:</Typography>
              <Typography variant="body1">
                {accountInfo?.domain || t('notSet')}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              LINKED ACCOUNT INFO
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
