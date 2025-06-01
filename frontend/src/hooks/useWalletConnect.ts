import { AppErrorCode, ChainType, WalletType } from '@/types/enums'
import { Chain } from '@/domains/blockchain/types'
import { WalletFactory } from '@/libs/adapters/walletFactory'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useWalletStore, setWalletWithChain } from '@/stores/wallet'

export function useWalletConnect() {
  const { createError } = useErrorHandler()
  const { setWallet, clearWallet } = useWalletStore()

  const connect = async (chainType: ChainType, walletType: WalletType) => {
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

      setWallet({
        chainType,
        address
      })
    } catch (error) {
      clearWallet()
      throw error
    }
  }

  const connectWithChain = async (chain: Chain, walletType: WalletType) => {
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

      const walletWithChain = setWalletWithChain(chain, address)
      setWallet(walletWithChain)
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
    connectWithChain,
    disconnect
  }
}
