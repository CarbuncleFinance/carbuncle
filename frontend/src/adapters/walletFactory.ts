import { WalletType, WalletAdapter } from '@/types/wallet'
import { XrplGemWalletAdapter } from './wallets/xrplGemWalletAdapter'
import { EvmWalletAdapter } from './wallets/evmWalletAdapter'

/**
 * ウォレットアダプターインスタンスを作成するためのファクトリークラス。
 * ファクトリーパターンを実装し、ウォレットタイプに基づいて
 * 異なるウォレットアダプターをインスタンス化する一元的な方法を提供します。
 */
export class WalletFactory {
  /**
   * 指定されたウォレットタイプに基づいてウォレットアダプターインスタンスを作成します。
   * @param walletType - アダプターを作成するウォレットのタイプ
   * @returns ウォレットアダプターインスタンス
   * @throws サポートされていないウォレットタイプの場合はエラーをスローします
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
   * サポートされているすべてのウォレットタイプの配列を返します。
   * @returns サポートされているウォレットタイプの配列
   */
  static getSupportedWallets(): WalletType[] {
    return [WalletType.XRPL_GEM, WalletType.EVM_INJECTED]
  }
}
