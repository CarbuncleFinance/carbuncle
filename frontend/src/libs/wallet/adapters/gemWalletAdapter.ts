import {
  isInstalled,
  getAddress,
  setTrustline,
  type SetTrustlineRequest
} from '@gemwallet/api'
import { XrplClient } from '@/libs/xrplClient'
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

  async requestAccountLines(
    address: string
  ): Promise<{ currency: string; balance: string }[]> {
    try {
      const xrplClient = new XrplClient()
      const { lines } = await xrplClient.getAccountLines(address)
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
      const xrplClient = new XrplClient()
      const { lines } = await xrplClient.getAccountLines(address)

      console.log('lines', lines)

      const balance = lines.map((line: any) => {
        return {
          symbol: line.currency,
          issuer: line.account,
          balance: Number(line.balance)
        }
      })

      const nativeBalance = await xrplClient.getNativeBalance(address)

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
