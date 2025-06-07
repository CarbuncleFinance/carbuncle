'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useWallet } from '@/hooks/useWallet'

type AccountInfoCardProps = {
  size: number
}

export default function AccountInfoCard({ size }: AccountInfoCardProps) {
  const { address } = useWallet()

  return (
    <Grid size={size}>
      <Card variant="outlined">
        <CardContent>
          <Box mb={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              アカウント情報
            </Typography>
            <Typography variant="body2" color="text.secondary">
              接続中のアカウント情報です。
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="チェーン"
              variant="outlined"
              value={'XRP Ledger'}
              disabled
              fullWidth
            />
            <TextField
              label="アドレス"
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
