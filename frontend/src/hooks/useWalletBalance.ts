import { useQuery } from '@tanstack/react-query'
import { useWalletStore } from '@/stores/wallet'
import { WalletTypes } from '@/types/enums'
import { WalletFactory } from '@/libs/wallet/walletFactory'

type WalletBalanceRequest = {
  address: string
}

export function useWalletBalance({ address }: WalletBalanceRequest) {
  const { wallet } = useWalletStore()

  return useQuery({
    queryKey: ['walletBalance', address, wallet.chainType],
    queryFn: async () => {
      if (!wallet.chainType) {
        throw new Error('No chain protocol available')
      }
      const adapter = WalletFactory.createAdapter(WalletTypes.GEM_WALLET)
      const balance = await adapter.getBalances(address)

      return balance
    },
    enabled: !!address && !!wallet.chainType,
    staleTime: 30000,
    refetchInterval: 60000
  })
}
