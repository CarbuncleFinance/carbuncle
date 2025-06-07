'use client'

import { useAccount } from 'wagmi'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import WalletConnectEvnButton from '@/components/ui/buttons/WalletConnectEvnButton'

type LinkedAccountInfoCardProps = {
  size: number
}

export default function LinkedAccountInfoCard({
  size
}: LinkedAccountInfoCardProps) {
  const { isConnected, address } = useAccount()
  const t = useTranslations('MyPage.linkedAccountInfo')

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
            {isConnected && (
              <TextField
                label={t('chainLabel')}
                variant="outlined"
                value="EVM"
                disabled
                fullWidth
              />
            )}
            {isConnected && (
              <TextField
                label={t('addressLabel')}
                variant="outlined"
                value={address}
                disabled
                fullWidth
              />
            )}
            <WalletConnectEvnButton />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
