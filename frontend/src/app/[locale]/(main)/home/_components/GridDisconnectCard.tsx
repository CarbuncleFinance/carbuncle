'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import { useWallet } from '@/hooks/useWallet'

interface GridDisconnectCardProps {
  size: number
}

export default function GridDisconnectCard({ size }: GridDisconnectCardProps) {
  const { isConnected } = useWallet()
  const t = useTranslations('Market.messages')

  if (isConnected) {
    return null
  }

  return (
    <Grid size={6}>
      <Typography variant="h6">{t('connectWallet')}</Typography>
    </Grid>
  )
}
