import { isInstalled, getAddress } from '@gemwallet/api'
import { AppErrorCode, XrplWalletTypes, XrplWalletType } from '@/types/enums'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useWalletStore } from '@/stores/wallet'
import type { Wallet } from '@/stores/wallet'

export function useWalletConnect() {
  const { createError } = useErrorHandler()
  const { setWallet, clearWallet } = useWalletStore()

  const connect = async (walletType: XrplWalletType) => {
    try {
      const wallet: Wallet = {
        address: ''
      }

      switch (walletType) {
        case XrplWalletTypes.GEM_WALLET:
          const { result: gemWalletInstallStatus } = await isInstalled()

          if (!gemWalletInstallStatus.isInstalled) {
            throw createError(AppErrorCode.WALLET_NOT_INSTALLED)
          }

          const { result: gemWalletAddress } = await getAddress()

          if (!gemWalletAddress) {
            throw createError(AppErrorCode.WALLET_CONNECTION_FAILED)
          }

          wallet.address = gemWalletAddress.address

          break
        default:
          throw new Error('Invalid wallet type')
      }

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
