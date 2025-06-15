import {
  Client,
  type Payment,
  type TxResponse,
  dropsToXrp,
  Wallet,
  xrpToDrops
} from 'xrpl'
import { hexToString } from '@/utils/string'
import { AppErrorCode } from '@/types/enums'

export class XrplClient {
  private client: Client
  private isConnected: boolean = false

  constructor(endpoint: string = 'wss://testnet.xrpl-labs.com') {
    this.client = new Client(endpoint, {
      timeout: 10000
    })
  }

  private async ensureConnection() {
    if (!this.isConnected) {
      try {
        await this.client.connect()
        this.isConnected = true
      } catch (error) {
        console.error('Failed to connect:', error)
        throw new Error(AppErrorCode.WALLET_CONNECTION_FAILED)
      }
    }
  }

  private async disconnect() {
    if (this.isConnected) {
      try {
        await this.client.disconnect()
        this.isConnected = false
      } catch (error) {
        console.error('Failed to disconnect:', error)
      }
    }
  }

  async getAccountInfo(address: string): Promise<{
    account: string
    balance: number
    domain: string
  }> {
    console.log('[START]getAccountInfo')
    try {
      await this.ensureConnection()
      const { result } = await this.client.request({
        command: 'account_info',
        account: address
      })

      const accountData = result.account_data

      return {
        account: accountData.Account,
        balance: dropsToXrp(accountData.Balance),
        domain: accountData.Domain
          ? `https://${hexToString(accountData.Domain)}`
          : ''
      }
    } catch (error) {
      console.error(error)
      throw new Error(AppErrorCode.WALLET_ACCOUNT_INFO_FETCH_FAILED)
    }
  }

  async getAccountLines(address: string): Promise<any> {
    console.log('[START]getAccountLines')
    try {
      await this.ensureConnection()
      const { result } = await this.client.request({
        command: 'account_lines',
        account: address
      })

      return result
    } catch (error) {
      console.error(error)
      throw new Error(AppErrorCode.WALLET_ACCOUNT_LINES_FETCH_FAILED)
    } finally {
      console.log('[END]getAccountLines')
    }
  }

  async getNativeBalance(address: string): Promise<number> {
    console.log('[START]getNativeBalance')
    try {
      await this.ensureConnection()
      const balance = await this.client.getXrpBalance(address)
      return balance
    } catch (error) {
      throw new Error(AppErrorCode.WALLET_BALANCE_FETCH_FAILED)
    } finally {
      console.log('[END]getNativeBalance')
    }
  }

  async getAllBalances(address: string): Promise<
    {
      symbol: string
      issuer: string
      balance: number
    }[]
  > {
    try {
      await this.ensureConnection()

      const balance = await this.client.getXrpBalance(address)
      const { result } = await this.client.request({
        command: 'account_lines',
        account: address
      })

      const tokens = result.lines.map((line: any) => ({
        symbol: line.currency,
        issuer: line.account,
        balance: line.balance
      }))

      tokens.push({
        symbol: 'XRP',
        issuer: '',
        balance
      })

      return tokens
    } catch (error) {
      throw new Error(AppErrorCode.WALLET_BALANCE_FETCH_FAILED)
    }
  }

  async sendPaymentTransaction(
    transaction: Payment
  ): Promise<TxResponse<Payment>> {
    console.log('[START]sendPaymentTransaction')
    try {
      await this.ensureConnection()
      const result = await this.client.submitAndWait(transaction)
      return result
    } catch (error) {
      console.error(error)
      throw new Error(AppErrorCode.WALLET_TRANSACTION_FAILED)
    } finally {
      console.log('[END]sendPaymentTransaction')
    }
  }

  async sendFaucetTransaction(address: string): Promise<any> {
    console.log('[START]sendFaucetTransaction')
    try {
      await this.ensureConnection()
      const seed = 'sEdTcuxx2UmKtshP1DxmgqLf1XRBEsc'
      const wallet = Wallet.fromSeed(seed)

      const transaction: Payment = {
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: {
          value: '10',
          currency: 'XCB',
          issuer: 'rN72avu22PqxSCRSzP4BRRHUCNodoeCnD5'
        },
        Destination: address
      }

      const result = await this.client.submitAndWait(transaction, {
        wallet: wallet
      })

      return result
    } catch (error) {
      console.error(error)
      throw new Error(AppErrorCode.WALLET_TRANSACTION_FAILED)
    } finally {
      console.log('[END]sendFaucetTransaction')
    }
  }

  async fundWallet(address: string, wallet: Wallet): Promise<any> {
    console.log('[START]fundWallet')
    try {
      await this.ensureConnection()
      const fundedWallet = await this.client.fundWallet(wallet)

      const transaction: Payment = {
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: xrpToDrops(9),
        Destination: address
      }

      await this.client.submitAndWait(transaction, {
        wallet
      })

      return fundedWallet
    } catch (error) {
      console.error(error)
      throw new Error(AppErrorCode.WALLET_TRANSACTION_FAILED)
    } finally {
      console.log('[END]fundWallet')
    }
  }
}
