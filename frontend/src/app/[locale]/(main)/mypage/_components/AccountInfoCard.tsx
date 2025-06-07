'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import { useWallet } from '@/hooks/useWallet'

type AccountInfoCardProps = {
  size: number
}

export default function AccountInfoCard({ size }: AccountInfoCardProps) {
  const { address } = useWallet()
  const t = useTranslations('MyPage.accountInfo')

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
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label={t('chainLabel')}
              variant="outlined"
              value={'XRP Ledger'}
              disabled
              fullWidth
            />
            <TextField
              label={t('addressLabel')}
              variant="outlined"
              value={address}
              disabled
              fullWidth
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
