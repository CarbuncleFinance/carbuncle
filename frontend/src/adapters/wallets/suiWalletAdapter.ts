import { WalletAdapter } from '@/types/wallet'
import { AppErrorCode } from '@/types/enums'

export class SuiWalletAdapter implements WalletAdapter {
  async connect(): Promise<string> {
    throw new Error('Sui wallet not yet implemented')
  }

  async disconnect(): Promise<void> {
    return Promise.resolve()
  }

  async isInstalled(): Promise<boolean> {
    return false
  }

  async getAddress(): Promise<string | null> {
    return null
  }
}
