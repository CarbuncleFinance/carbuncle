import { connect, disconnect, getAccount } from 'wagmi/actions'
import { config } from '@/wagmi.config'
import { AppErrorCode } from '@/types/enums'
import { WalletAdapter } from '@/libs/adapters/walletFactory'

declare global {
  interface Window {
    ethereum?: any
  }
}

export class InjectedWalletAdapter implements WalletAdapter {
  async connect(): Promise<string> {
    const installed = await this.isInstalled()
    if (!installed) {
      throw new Error(AppErrorCode.WALLET_NOT_INSTALLED)
    }

    try {
      const result = await connect(config, {
        connector: config.connectors[0]
      })
      return result.accounts[0]
    } catch (error) {
      throw new Error(AppErrorCode.WALLET_CONNECTION_FAILED)
    }
  }

  async disconnect(): Promise<void> {
    await disconnect(config)
  }

  async isInstalled(): Promise<boolean> {
    return typeof window !== 'undefined' && !!window.ethereum
  }

  async getAddress(): Promise<string | null> {
    const account = getAccount(config)
    return account.address || null
  }

  async getNativeBalance(address: string): Promise<number> {
    throw new Error('Native balance not supported for EVM wallets')
  }

  async getTokenBalance(): Promise<number> {
    return 0
  }

  async sendBridgeTransaction(transaction: any): Promise<void> {
    console.log('sendBridgeTransaction', transaction)
  }

  async sendTrustlineTransaction(transaction: any): Promise<void> {
    console.log('sendTrustlineTransaction', transaction)
  }
}
