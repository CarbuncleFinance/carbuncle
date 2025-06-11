'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useWallet } from '@/hooks/useWallet'

interface GridDisconnectCardProps {
  size: number
}

export default function GridDisconnectCard({ size }: GridDisconnectCardProps) {
  const { isConnected } = useWallet()

  if (isConnected) {
    return null
  }

  return (
    <Grid size={6}>
      <Typography variant="h6">Please, connect your wallet</Typography>
    </Grid>
  )
}
