import {
  isInstalled,
  getAddress,
  sendPayment,
  setTrustline,
  type SendPaymentRequest,
  type SetTrustlineRequest
} from '@gemwallet/api'
import { XrplClient } from '@/libs/xrplClient'
import { WalletAdapter } from '@/libs/wallet/walletFactory'
import { AppErrorCode } from '@/types'

export class GemWalletAdapter implements WalletAdapter {
  private xrplClient: XrplClient

  constructor() {
    this.xrplClient = new XrplClient()
  }

  async connect(): Promise<string> {
    try {
      const installed = await this.isInstalled()
      if (!installed) {
        throw new Error(AppErrorCode.WALLET_NOT_INSTALLED)
      }

      const address = await this.getAddress()
      if (!address) {
        throw new Error(AppErrorCode.WALLET_CONNECTION_FAILED)
      }

      return address
    } catch (error) {
      console.error(error)
      throw error
    }
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

  async sendTrustlineTransaction(
    transaction: SetTrustlineRequest
  ): Promise<{ hash: string }> {
    try {
      const installed = await this.isInstalled()
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

  async requestAccountLines(
    address: string
  ): Promise<{ currency: string; balance: string }[]> {
    try {
      const { lines } = await this.xrplClient.getAccountLines(address)
      return lines.map((line: any) => {
        return {
          currency: line.currency,
          balance: line.balance.value
        }
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getBalances(
    address: string
  ): Promise<{ symbol: string; issuer: string; balance: number }[]> {
    try {
      const { lines } = await this.xrplClient.getAccountLines(address)

      console.log('lines', lines)

      const balance = lines.map((line: any) => {
        return {
          symbol: line.currency,
          issuer: line.account,
          balance: Number(line.balance)
        }
      })

      const nativeBalance = await this.xrplClient.getNativeBalance(address)

      const balances = [
        ...balance,
        {
          symbol: 'XRP',
          issuer: '',
          balance: nativeBalance
        }
      ]

      return balances
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
