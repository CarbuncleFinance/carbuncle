import { useWalletStore } from '@/stores/wallet'

export function useWallet() {
  const { wallet } = useWalletStore()

  return {
    isConnected: wallet.address !== '',
    chainType: wallet.chainType,
    address: wallet.address,
    shortAddress: wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4)
  }
}
