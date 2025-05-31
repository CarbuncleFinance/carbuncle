import { WalletType, WalletAdapter } from '@/types/wallet'
import { XrplGemWalletAdapter } from './wallets/xrplGemWalletAdapter'
import { EvmWalletAdapter } from './wallets/evmWalletAdapter'

export class WalletFactory {
  static createAdapter(walletType: WalletType): WalletAdapter {
    switch (walletType) {
      case WalletType.XRPL_GEM:
        return new XrplGemWalletAdapter()
      case WalletType.EVM_INJECTED:
        return new EvmWalletAdapter()
      case WalletType.SUI_WALLET:
        throw new Error('Sui wallet support is not yet implemented')
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`)
    }
  }

  static getSupportedWallets(): WalletType[] {
    return [WalletType.XRPL_GEM, WalletType.EVM_INJECTED, WalletType.SUI_WALLET]
  }
}
