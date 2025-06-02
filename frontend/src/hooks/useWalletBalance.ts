import { useQuery } from '@tanstack/react-query'
import { WalletFactory } from '@/libs/adapters/walletFactory'
import { useWallet } from '@/hooks/useWallet'

type WalletBalanceRequest = {
  address: string
}

export function useWalletBalance({ address }: WalletBalanceRequest) {
  const { chain } = useWallet()

  return useQuery({
    queryKey: ['walletBalance', address, chain?.name],
    queryFn: async () => {
      if (!chain) {
        throw new Error('No chain available')
      }
      const adapter = WalletFactory.createAdapterForChain(chain)
      return await adapter.getNativeBalance(address)
    },
    enabled: !!address && !!chain,
    staleTime: 30000,
    refetchInterval: 60000
  })
}
