import { Client } from 'xrpl'
import { AppErrorCode } from '@/types/enums'

export class XrplClient {
  private client: Client
  private isConnected: boolean = false

  constructor(serverUrl: string = 'wss://s.altnet.rippletest.net:51233') {
    this.client = new Client(serverUrl)
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect()
      this.isConnected = true
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect()
      this.isConnected = false
    }
  }

  async getNativeBalance(address: string): Promise<number> {
    try {
      await this.connect()
      const balance = await this.client.getXrpBalance(address)
      return balance
    } catch (error) {
      throw new Error(AppErrorCode.WALLET_BALANCE_FETCH_FAILED)
    }
  }

  async ensureDisconnected(): Promise<void> {
    await this.disconnect()
  }
}

let xrplClientInstance: XrplClient | null = null

export function getXrplClient(): XrplClient {
  if (!xrplClientInstance) {
    xrplClientInstance = new XrplClient()
  }
  return xrplClientInstance
}
