import { WalletType, WalletAdapter } from '@/types/wallet'
import { WalletFactory } from '@/adapters/walletFactory'
import { AppErrorCode } from '@/types/enums'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useWalletStore } from '@/stores/wallet'
import type { Wallet } from '@/stores/wallet'

export function useMultiWalletConnect() {
  const { createError } = useErrorHandler()
  const { setWallet, clearWallet } = useWalletStore()

  const connect = async (walletType: WalletType) => {
    try {
      const adapter = WalletFactory.createAdapter(walletType)
      
      const installed = await adapter.isInstalled()
      if (!installed) {
        throw createError(AppErrorCode.WALLET_NOT_INSTALLED)
      }

      const address = await adapter.connect()
      if (!address) {
        throw createError(AppErrorCode.WALLET_CONNECTION_FAILED)
      }

      const wallet: Wallet = {
        address
      }

      setWallet(wallet)
      return { address, adapter }
    } catch (error) {
      clearWallet()
      throw error
    }
  }

  const disconnect = async (adapter?: WalletAdapter) => {
    if (adapter) {
      await adapter.disconnect()
    }
    clearWallet()
  }

  const getSupportedWallets = () => {
    return WalletFactory.getSupportedWallets()
  }

  return {
    connect,
    disconnect,
    getSupportedWallets
  }
}
