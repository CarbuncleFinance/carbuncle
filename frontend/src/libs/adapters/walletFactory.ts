import { WalletType, WalletTypes, isXRPLChain, isEVMChain } from '@/types/enums'
import { Chain } from '@/domains/blockchain/types'
import { GemWalletAdapter } from '@/libs/adapters/wallets/xrpl/gemWalletAdapter'
import { InjectedWalletAdapter } from '@/libs/adapters/wallets/evm/InjectedWalletAdapter'

export interface WalletAdapter {
  connect(): Promise<string>
  disconnect(): Promise<void>
  isInstalled(): Promise<boolean>
  getAddress(): Promise<string | null>
  getNativeBalance(address: string): Promise<number>
  getTokenBalance(): Promise<number>
  sendBridgeTransaction(transaction: any): Promise<any>
  sendTrustlineTransaction(transaction: any): Promise<any>
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

  // Create a wallet adapter instance based on the given chain
  static createAdapterForWalletType(walletType: WalletType): WalletAdapter {
    if (walletType === WalletTypes.GEM_WALLET) {
      return new GemWalletAdapter()
    }
    if (walletType === WalletTypes.METAMASK) {
      return new InjectedWalletAdapter()
    }
    throw new Error(`Unsupported wallet type: ${walletType}`)
  }

  // Get the supported wallet types
  static getSupportedWallets(): WalletType[] {
    return [WalletTypes.GEM_WALLET, WalletTypes.METAMASK]
  }

  static getSupportedWalletsForChain(chain: Chain): WalletType[] {
    if (isXRPLChain(chain)) {
      return [WalletTypes.GEM_WALLET]
    }
    if (isEVMChain(chain)) {
      return [WalletTypes.METAMASK]
    }
    return []
  }
}
