import { isInstalled, getAddress } from '@gemwallet/api'
import { AppErrorCode } from '@/types/enums'
import { WalletAdapter } from '@/libs/adapters/walletFactory'
import { getXrplClient } from '@/libs/xrplClient'

export class GemWalletAdapter implements WalletAdapter {
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

  async getNativeBalance(address: string): Promise<number> {
    const xrplClient = getXrplClient()
    return await xrplClient.getNativeBalance(address)
  }
}
