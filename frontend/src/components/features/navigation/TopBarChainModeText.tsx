'use client'

import Typography from '@mui/material/Typography'
import { useWallet } from '@/hooks/useWallet'
import { ChainTypes } from '@/types/enums'

export default function TopBarChainModeText() {
  const { chainType } = useWallet()

  return (
    <Typography
      variant="body1"
      color="inherit"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mr: 1
      }}
    >
      {chainType === ChainTypes.EVM ? 'EVM Mode' : 'XRPL Mode'}
    </Typography>
  )
}
