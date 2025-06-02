import { useWalletStore, getWalletChainProtocol } from '@/stores/wallet'
import { ChainProtocol } from '@/domains/blockchain/types'

export function useWallet() {
  const { wallet } = useWalletStore()
  const chainProtocol = getWalletChainProtocol(wallet)

  return {
    isConnected: wallet.address !== '',
    address: wallet.address,
    shortAddress: wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4),
    chainProtocol,
    isXRPL: chainProtocol === ChainProtocol.XRPL,
    isEVM: chainProtocol === ChainProtocol.EVM
  }
}
