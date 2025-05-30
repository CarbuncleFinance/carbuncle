import { isInstalled, getAddress } from '@gemwallet/api'
import { AppErrorCode } from '@/types/enums'
import { WalletAdapter } from '@/types/wallet'

export class XrplGemWalletAdapter implements WalletAdapter {
  async connect(): Promise<string> {
    const installed = await this.isInstalled()
    if (!installed) {
      throw new Error(AppErrorCode.WALLET_NOT_INSTALLED)
    }

    const address = await this.getAddress()
    if (!address) {
      throw new Error(AppErrorCode.WALLET_CONNECTION_FAILED)
    }

    return address
  }

  async disconnect(): Promise<void> {
    return Promise.resolve()
  }

  async isInstalled(): Promise<boolean> {
    const { result } = await isInstalled()
    return result.isInstalled
  }

  async getAddress(): Promise<string | null> {
    const { result } = await getAddress()
    return result?.address || null
  }
}
