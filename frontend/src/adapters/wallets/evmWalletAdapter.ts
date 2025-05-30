import { connect, disconnect, getAccount } from 'wagmi/actions'
import { config } from '@/wagmi.config'
import { AppErrorCode } from '@/types/enums'
import { WalletAdapter } from '@/types/wallet'

declare global {
  interface Window {
    ethereum?: any
  }
}

export class EvmWalletAdapter implements WalletAdapter {
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
}
