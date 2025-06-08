import {
  isInstalled,
  getAddress,
  setTrustline,
  type SetTrustlineRequest
} from '@gemwallet/api'
import { WalletAdapter } from '@/libs/wallet/walletFactory'
import { AppErrorCode } from '@/types'

export class GemWalletAdapter implements WalletAdapter {
  async connect(): Promise<string> {
    try {
      // Check if GemWallet is installed
      const installed = await isInstalled()

      if (!installed) {
        throw new Error(AppErrorCode.WALLET_NOT_INSTALLED)
      }

      // Get the address
      const { result } = await getAddress()

      if (!result) {
        throw new Error(AppErrorCode.WALLET_CONNECTION_FAILED)
      }

      return result.address
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async sendTrustlineTransaction(
    transaction: SetTrustlineRequest
  ): Promise<{ hash: string }> {
    try {
      const installed = await isInstalled()
      if (!installed) {
        throw new Error(AppErrorCode.WALLET_NOT_INSTALLED)
      }

      const { result } = await setTrustline(transaction)

      if (!result) {
        throw new Error(AppErrorCode.TRANSACTION_FAILED)
      }

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
