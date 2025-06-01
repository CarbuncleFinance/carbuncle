'use client'

import Typography from '@mui/material/Typography'
import { useWallet } from '@/hooks/useWallet'
import { ChainProtocol } from '@/domains/blockchain/types'

export default function TopBarChainModeText() {
  const { chain } = useWallet()

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
      {chain?.protocol === ChainProtocol.EVM ? 'EVM Mode' : 'XRPL Mode'}
    </Typography>
  )
}
