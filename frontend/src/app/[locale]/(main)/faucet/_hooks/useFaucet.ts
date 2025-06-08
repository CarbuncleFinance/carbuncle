import { WalletFactory } from '@/libs/wallet/walletFactory'
import { type WalletType } from '@/types'

export function useFaucet() {
  const handleTrustline = async (
    walletType: WalletType,
    token: { currency: string; issuer: string; value: string }
  ) => {
    try {
      const adapter = WalletFactory.createAdapter(walletType)

      const result = await adapter.sendTrustlineTransaction({
        limitAmount: {
          currency: token.currency,
          issuer: token.issuer,
          value: token.value
        }
      })

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    handleTrustline
  }
}
