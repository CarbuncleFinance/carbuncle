import { AppErrorCode, ChainType, WalletTypes, WalletType } from '@/types/enums'
// import { WalletType } from '@/types/wallet'
import { WalletFactory } from '@/libs/adapters/walletFactory'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useWalletStore } from '@/stores/wallet'
import type { Wallet } from '@/stores/wallet'

export function useWalletConnect() {
  const { createError } = useErrorHandler()
  const { setWallet, clearWallet } = useWalletStore()

  const connect = async (walletType: WalletType) => {
    try {
      const wallet: Wallet = {
        address: ''
      }

      const adapter = WalletFactory.createAdapter(walletType)

      const installed = await adapter.isInstalled()
      if (!installed) {
        throw createError(AppErrorCode.WALLET_NOT_INSTALLED)
      }

      const address = await adapter.connect()
      if (!address) {
        throw createError(AppErrorCode.WALLET_CONNECTION_FAILED)
      }

      wallet.address = address
      setWallet(wallet)
    } catch (error) {
      clearWallet()
      throw error
    }
  }

  const disconnect = () => {
    clearWallet()
  }

  return {
    connect,
    disconnect
  }
}
