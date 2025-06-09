import { GemWalletAdapter } from '@/libs/wallet/adapters/gemWalletAdapter'
import { type WalletType, WalletTypes } from '@/types'

export interface WalletAdapter {
  connect(): Promise<string>
  sendTrustlineTransaction(transaction: any): Promise<any>
  requestAccountLines(request: any): Promise<any>
  getBalances(address: string): Promise<any[]>
}

export class WalletFactory {
  static createAdapter(walletType: WalletType): WalletAdapter {
    switch (walletType) {
      case WalletTypes.GEM_WALLET:
        return new GemWalletAdapter()
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`)
    }
  }
}
