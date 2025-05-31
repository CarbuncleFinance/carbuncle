'use client'

import { useConnect } from 'wagmi'
import Button from '@mui/material/Button'
import { useCallback } from 'react'

export default function WalletConnectEvnButton() {
  const { connect, connectors } = useConnect()

  const handleWalletConnect = useCallback(async () => {
    if (!connectors[0]) return

    try {
      await connect({ connector: connectors[0] })
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }, [connect, connectors])

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleWalletConnect}
      disableElevation
    >
      ウォレット接続
    </Button>
  )
}
