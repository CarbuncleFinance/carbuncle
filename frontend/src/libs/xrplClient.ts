import { Client, type Payment, type TxResponse, dropsToXrp, Wallet } from 'xrpl'
import { hexToString } from '@/utils/string'
import { AppErrorCode } from '@/types/enums'

export class XrplClient {
  private client: Client

  constructor(endpoint: string = 'wss://testnet.xrpl-labs.com') {
    this.client = new Client(endpoint, {
      timeout: 10000
    })
  }

  async connect() {}

  async getAccountInfo(address: string): Promise<{
    account: string
    balance: number
    domain: string
  }> {
    try {
      await this.client.connect()
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
    } finally {
      await this.client.disconnect()
    }
  }

  async getAccountLines(address: string): Promise<any> {
    console.log('[START]getAccountLines')
    try {
      await this.client.connect()
      const { result } = await this.client.request({
        command: 'account_lines',
        account: address
      })

      return result
    } catch (error) {
      console.error(error)
      throw new Error(AppErrorCode.WALLET_ACCOUNT_LINES_FETCH_FAILED)
    } finally {
      await this.client.disconnect()
      console.log('[END]getAccountLines')
    }
  }

  async getNativeBalance(address: string): Promise<number> {
    try {
      await this.client.connect()
      const balance = await this.client.getXrpBalance(address)
      return balance
    } catch (error) {
      throw new Error(AppErrorCode.WALLET_BALANCE_FETCH_FAILED)
    } finally {
      await this.client.disconnect()
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
      await this.client.connect()

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
    } finally {
      await this.client.disconnect()
    }
  }

  async sendPaymentTransaction(
    transaction: Payment
  ): Promise<TxResponse<Payment>> {
    try {
      await this.client.connect()
      const result = await this.client.submitAndWait(transaction)
      return result
    } catch (error) {
      console.error(error)
      throw new Error(AppErrorCode.WALLET_TRANSACTION_FAILED)
    } finally {
      await this.client.disconnect()
    }
  }

  async sendFaucetTransaction(address: string): Promise<any> {
    try {
      await this.client.connect()
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
      await this.client.disconnect()
    }
  }
}
