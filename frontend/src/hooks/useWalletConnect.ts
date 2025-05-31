import { isInstalled, getAddress } from '@gemwallet/api'
import { AppErrorCode, XrplWalletTypes, XrplWalletType } from '@/types/enums'
import { useErrorHandler } from '@/hooks/useErrorHandler'

export function useWalletConnect() {
  const { createError } = useErrorHandler()

  const connect = async (walletType: XrplWalletType) => {
    try {
      switch (walletType) {
        case XrplWalletTypes.GEM_WALLET:
          if (!isInstalled()) {
            throw createError(AppErrorCode.WALLET_NOT_INSTALLED)
          }

          const { result } = await getAddress()

          if (!result) {
            throw createError(AppErrorCode.WALLET_CONNECTION_FAILED)
          }

          const address = result.address
          console.log(address)

          break
        default:
          throw new Error('Invalid wallet type')
      }
    } catch (error) {
      throw error
    }
  }

  const disconnect = () => {}

  return {
    connect,
    disconnect
  }
}
