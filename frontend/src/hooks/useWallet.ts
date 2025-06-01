import { useWalletStore, getWalletChain } from '@/stores/wallet'
import { isXRPLChain, isEVMChain } from '@/types/enums'

export function useWallet() {
  const { wallet } = useWalletStore()
  const chain = getWalletChain(wallet)

  return {
    isConnected: wallet.address !== '',
    address: wallet.address,
    shortAddress: wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4),
    chain,
    isXRPL: chain ? isXRPLChain(chain) : false,
    isEVM: chain ? isEVMChain(chain) : false
  }
}
