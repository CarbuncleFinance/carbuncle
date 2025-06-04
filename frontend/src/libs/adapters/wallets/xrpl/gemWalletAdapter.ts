import { isInstalled, getAddress, sendPayment, type SendPaymentRequest } from '@gemwallet/api'
import { AppErrorCode } from '@/types/enums'
import { WalletAdapter } from '@/libs/adapters/walletFactory'
import { XrplClient } from '@/libs/xrplClient'

export class GemWalletAdapter implements WalletAdapter {
  private xrplClient: XrplClient

  constructor() {
    this.xrplClient = new XrplClient()
  }

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
    const nativeBalance = await this.xrplClient.getNativeBalance(address)
    return nativeBalance
  }

  async getTokenBalance(): Promise<number> {
    return 0
  }

  async sendBridgeTransaction(transaction: SendPaymentRequest): Promise<any> {
    const installed = await this.isInstalled()
    if (!installed) {
      throw new Error(AppErrorCode.WALLET_NOT_INSTALLED)
    }

    const result = await sendPayment(transaction)
    return result
  }
}
