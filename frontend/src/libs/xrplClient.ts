import { Client, type Request } from 'xrpl'

export class XrplClient {
  private client: Client

  constructor() {
    this.client = new Client('wss://s1.ripple.com/')
  }

  async getNativeBalance(address: string) {
    try {
      await this.client.connect()
      return await this.client.getXrpBalance(address)
    } catch (error) {
      throw error
    } finally {
      await this.client.disconnect()
    }
  }
}
