import { useWalletStore, getWalletChain } from '@/stores/wallet'
import { ChainTypes } from '@/types/enums'

export function useWallet() {
  const { wallet } = useWalletStore()

  return {
    isConnected: wallet.address !== '',
    chainType: wallet.chainType,
    address: wallet.address,
    shortAddress: wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4),
    chain: getWalletChain(wallet),
    isXRPL: wallet.chainType === ChainTypes.XRPL,
    isEVM: wallet.chainType === ChainTypes.EVM
  }
}
