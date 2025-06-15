import { GemWalletAdapter } from '@/libs/wallet/adapters/gemWalletAdapter'
import { InjectedWalletAdapter } from '@/libs/wallet/adapters/evm/InjectedWalletAdapter'
import { type WalletType, WalletTypes, isXRPLChain, isEVMChain } from '@/types'
import { Chain } from '@/domains/blockchain/types'

export interface WalletAdapter {
  connect(): Promise<string>
  disconnect(): Promise<void>
  isInstalled(): Promise<boolean>
  getAddress(): Promise<string | null>
  getNativeBalance(address: string): Promise<number>
  getTokenBalance(): Promise<number>
  sendBridgeTransaction(transaction: any): Promise<any>
  sendTrustlineTransaction(transaction: any): Promise<any>
  requestAccountLines(request: any): Promise<any>
  getBalances(address: string): Promise<any[]>
}

export class WalletFactory {
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

  static createAdapterForWalletType(walletType: WalletType): WalletAdapter {
    if (walletType === WalletTypes.GEM_WALLET) {
      return new GemWalletAdapter()
    }
    if (walletType === WalletTypes.METAMASK) {
      return new InjectedWalletAdapter()
    }
    throw new Error(`Unsupported wallet type: ${walletType}`)
  }

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
