'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useWallet } from '@/hooks/useWallet'

export default function SectionHero() {
  const { isConnected } = useWallet()

  if (!isConnected) {
    return (
      <Typography
        variant="body1"
        sx={{ textAlign: 'center', mt: 28, color: 'text.secondary' }}
      >
        まずはウォレットを接続して、次世代の体験を始めましょう✨
      </Typography>
    )
  }

  return (
    <Box sx={{ textAlign: 'center', my: 26 }}>
      <Typography variant="h2" sx={{ fontWeight: 'semibold' }}>
        ほげ
      </Typography>
    </Box>
  )
}
