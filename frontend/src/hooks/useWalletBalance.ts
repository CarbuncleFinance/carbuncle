import { useQuery } from '@tanstack/react-query'
import { WalletFactory } from '@/libs/adapters/walletFactory'
import { useWalletStore } from '@/stores/wallet'
import { WalletTypes } from '@/types/enums'

type WalletBalanceRequest = {
  address: string
}

export function useWalletBalance({ address }: WalletBalanceRequest) {
  const { wallet } = useWalletStore()

  return useQuery({
    queryKey: ['walletBalance', address, wallet.chainProtocol],
    queryFn: async () => {
      if (!wallet.chainProtocol) {
        throw new Error('No chain protocol available')
      }
      const adapter = WalletFactory.createAdapter(WalletTypes.GEM_WALLET)
      return await adapter.getNativeBalance(address)
    },
    enabled: !!address && !!wallet.chainProtocol,
    staleTime: 30000,
    refetchInterval: 60000
  })
}
