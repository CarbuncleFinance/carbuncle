import { WalletType, WalletAdapter } from '@/types/wallet'
import { XrplGemWalletAdapter } from './wallets/xrplGemWalletAdapter'
import { EvmWalletAdapter } from './wallets/evmWalletAdapter'

/**
 * Factory class for creating wallet adapter instances.
 * Implements the factory pattern to provide a centralized way to instantiate
 * different wallet adapters based on wallet type.
 */
export class WalletFactory {
  /**
   * Creates a wallet adapter instance based on the specified wallet type.
   * @param walletType - The type of wallet to create an adapter for
   * @returns A wallet adapter instance
   * @throws Error if the wallet type is not supported
   */
  static createAdapter(walletType: WalletType): WalletAdapter {
    switch (walletType) {
      case WalletType.XRPL_GEM:
        return new XrplGemWalletAdapter()
      case WalletType.EVM_INJECTED:
        return new EvmWalletAdapter()
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`)
    }
  }

  /**
   * Returns an array of all supported wallet types.
   * @returns Array of supported wallet types
   */
  static getSupportedWallets(): WalletType[] {
    return [WalletType.XRPL_GEM, WalletType.EVM_INJECTED]
  }
}
