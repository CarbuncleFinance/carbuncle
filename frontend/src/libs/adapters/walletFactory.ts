import { WalletType, WalletTypes } from '@/types/enums'
import { GemWalletAdapter } from '@/libs/adapters/wallets/xrpl/gemWalletAdapter'
import { InjectedWalletAdapter } from '@/libs/adapters/wallets/evm/InjectedWalletAdapter'

export interface WalletAdapter {
  connect(): Promise<string>
  disconnect(): Promise<void>
  isInstalled(): Promise<boolean>
  getAddress(): Promise<string | null>
}

export class WalletFactory {
  // Create a wallet adapter instance based on the given wallet type
  static createAdapter(walletType: WalletType): WalletAdapter {
    switch (walletType) {
      case WalletTypes.GEM_WALLET:
        return new GemWalletAdapter()
      case WalletTypes.METAMASK:
        return new InjectedWalletAdapter()
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`)
    }
  }

  // Get the supported wallet types
  static getSupportedWallets(): WalletType[] {
    return [WalletTypes.GEM_WALLET, WalletTypes.METAMASK]
  }
}
