import { useCallback, useEffect, useRef, useState } from 'react'
import { useWalletStore } from '@/stores/wallet'
import { XrplClient } from '@/libs/xrplClient'

type AccountInfo = {
  account: string
  balance: number
  domain: string
}

export function useWallet() {
  const xrplClient = useRef<XrplClient>(new XrplClient())

  const { wallet } = useWalletStore()

  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null)

  const handleRequestAccountInfo = useCallback(async () => {
    try {
      const accountInfo = await xrplClient.current.getAccountInfo(
        wallet.address
      )

      setAccountInfo(accountInfo)
    } catch (error) {
      console.error(error)
      throw error
    }
  }, [wallet.address])

  useEffect(() => {
    if (wallet.address) {
      handleRequestAccountInfo()
    }
  }, [wallet.address])

  return {
    isConnected: wallet.address !== '',
    address: wallet.address,
    shortAddress: wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4),
    chainType: wallet.chainType,
    accountInfo,
    walletType: wallet.walletType,
    handleRequestAccountInfo
  }
}
