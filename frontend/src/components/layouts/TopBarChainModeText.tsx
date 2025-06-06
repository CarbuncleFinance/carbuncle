'use client'

import Typography from '@mui/material/Typography'
import { useWallet } from '@/hooks/useWallet'
import { ChainProtocol } from '@/domains/blockchain/types'

export default function TopBarChainModeText() {
  const { chainProtocol } = useWallet()

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
      {chainProtocol === ChainProtocol.EVM ? 'EVM Mode' : 'XRPL Mode'}
    </Typography>
  )
}
