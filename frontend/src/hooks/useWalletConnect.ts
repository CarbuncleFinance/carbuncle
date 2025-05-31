import { XrplWalletTypes, XrplWalletType } from '@/types/enums'
import { isInstalled, getAddress } from '@gemwallet/api'

export function useWalletConnect() {
  const connect = async (walletType: XrplWalletType) => {
    try {
      switch (walletType) {
        case XrplWalletTypes.GEM_WALLET:
          if (!isInstalled()) {
            throw new Error('GemWallet is not installed')
          }

          const address = await getAddress()

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
