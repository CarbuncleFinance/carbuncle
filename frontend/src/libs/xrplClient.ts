import { Client, type Payment, type TxResponse } from 'xrpl'
import { AppErrorCode } from '@/types/enums'

export class XrplClient {
  private client: Client

  constructor(serverUrl: string = 'wss://s.altnet.rippletest.net:51233') {
    this.client = new Client(serverUrl)
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

  async sendPaymentTransaction(transaction: Payment): Promise<TxResponse<Payment>> {
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
}
