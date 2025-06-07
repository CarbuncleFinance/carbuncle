import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useWalletStore } from '@/stores/wallet'
import { useDatabase } from '@/hooks/useDatabase'
import { WalletFactory } from '@/libs/wallet/walletFactory'
import { AppErrorCode, ChainTypes, type WalletType } from '@/types'

export function useWalletConnect() {
  const db = useDatabase()
  const { createError } = useErrorHandler()
  const { setWallet, clearWallet } = useWalletStore()

  const { connect: connectEvmWagmi, connectors } = useConnect()
  const { disconnect: disconnectEvmWagmi } = useDisconnect()

  const { isConnected: isConnectedEvm, address: addressEvm } = useAccount()

  const connect = async (walletType: WalletType) => {
    try {
      const adapter = WalletFactory.createAdapter(walletType)

      const address = await adapter.connect()
      if (!address) {
        throw createError(AppErrorCode.WALLET_CONNECTION_FAILED)
      }

      const wallet = await db.wallet.getOrCreate({ address })
      if (!wallet) {
        throw createError(AppErrorCode.DATABASE_ERROR)
      }

      setWallet({
        address,
        // TODO: Get the chain type from the wallet
        chainType: ChainTypes.XRPL
      })
    } catch (error) {
      throw error
    }
  }

  const connectEvm = async () => {
    if (!connectors[0]) return
    try {
      await connectEvmWagmi({ connector: connectors[0] })
    } catch (error) {
      console.error(error)
    }
  }

  const disconnectEvm = async () => {
    await disconnectEvmWagmi()
  }

  const disconnect = () => {
    clearWallet()
  }

  return {
    connect,
    connectEvm,
    disconnect,
    disconnectEvm,
    linkedWallet: {
      isConnected: isConnectedEvm || false,
      address: addressEvm || ''
    }
  }
}
