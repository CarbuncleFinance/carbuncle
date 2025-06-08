'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import { useWallet } from '@/hooks/useWallet'
import { useWalletConnect } from '@/hooks/useWalletConnect'

export default function SectionHero() {
  const t = useTranslations('Home')

  const { isConnected, accountInfo } = useWallet()

  const { connectEvm: handleConnectEvm, disconnectEvm, linkedWallet } = useWalletConnect()

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
        <Card variant="outlined" sx={{ height: '170px' }}>
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
        <Card variant="outlined" sx={{ height: '170px' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              LINKED ACCOUNT INFO
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
              連携中のアカウント情報を表示しています。
            </Typography>
            {!linkedWallet.isConnected && (
              <Box>未設定</Box>
            )}
            {/** Address */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">Address:</Typography>
              <Typography variant="body1">
                {linkedWallet.address || '-'}
              </Typography>
            </Box>
          </CardContent>
          
            <CardActions sx={{ justifyContent: 'flex-end' }}>
            {!linkedWallet.isConnected && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                disableElevation
                onClick={handleConnectEvm}
              >
                LINK ACCOUNT
              </Button>
            )}
            {linkedWallet.isConnected && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                disableElevation
                onClick={disconnectEvm}
              >
                DISCONNECT
              </Button>
            )}
            </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
