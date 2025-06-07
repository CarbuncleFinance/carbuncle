'use client'

import { useConnect, useAccount, useDisconnect } from 'wagmi'
import Button from '@mui/material/Button'
import { useCallback } from 'react'
import { useTranslations } from 'next-intl'

export default function WalletConnectEvnButton() {
  const { connect, connectors } = useConnect()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const t = useTranslations('WalletDialog')

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
          {t('disconnect')}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleWalletConnect}
          disableElevation
        >
          {t('connect')}
        </Button>
      )}
    </>
  )
}
