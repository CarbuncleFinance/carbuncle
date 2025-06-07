'use client'

import { useConnect, useAccount, useDisconnect } from 'wagmi'
import Button from '@mui/material/Button'
import { useCallback } from 'react'

export default function WalletConnectEvnButton() {
  const { connect, connectors } = useConnect()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleWalletConnect = useCallback(async () => {
    if (!connectors[0]) return

    try {
      await connect({ connector: connectors[0] })
    } catch (error) {
      console.error(error)
    }
  }, [connect, connectors])

  const handleDisconnect = useCallback(async () => {
    await disconnect()
  }, [disconnect])

  return (
    <>
      {isConnected ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleDisconnect}
          disableElevation
        >
          切断
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleWalletConnect}
          disableElevation
        >
          ウォレット接続
        </Button>
      )}
    </>
  )
}
