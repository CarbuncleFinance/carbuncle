import { AppErrorCode, WalletType } from '@/types/enums'
import { ChainProtocol } from '@/domains/blockchain/types'
import { WalletFactory } from '@/libs/adapters/walletFactory'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useWalletStore, setWalletWithChainProtocol } from '@/stores/wallet'
import { useDatabase } from '@/hooks/useDatabase'

export function useWalletConnect() {
  const db = useDatabase()
  const { createError } = useErrorHandler()
  const { setWallet, clearWallet } = useWalletStore()

  const connectWithChainProtocol = async (
    chainProtocol: ChainProtocol,
    walletType: WalletType
  ) => {
    try {
      const adapter = WalletFactory.createAdapterForWalletType(walletType)

      const installed = await adapter.isInstalled()
      if (!installed) {
        throw createError(AppErrorCode.WALLET_NOT_INSTALLED)
      }

      const address = await adapter.connect()
      if (!address) {
        throw createError(AppErrorCode.WALLET_CONNECTION_FAILED)
      }

      const walletWithChain = setWalletWithChainProtocol(chainProtocol, address)
      setWallet(walletWithChain)

      const wallet = await db.wallet.getOrCreate({ address })
      if (!wallet) {
        throw createError(AppErrorCode.DATABASE_ERROR)
      }

      console.log(wallet)
    } catch (error) {
      clearWallet()
      throw error
    }
  }

  const disconnect = () => {
    clearWallet()
  }

  return {
    connectWithChainProtocol,
    disconnect
  }
}
