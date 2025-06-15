import { Wallet } from 'xrpl'
import { WalletFactory } from '@/libs/adapters/walletFactory'
import { type WalletType } from '@/types'
import { XrplClient } from '@/libs/xrplClient'

export function useFaucet() {
  const handleTrustline = async (
    walletType: WalletType,
    token: { currency: string; issuer: string }
  ) => {
    try {
      const adapter = WalletFactory.createAdapter(walletType)

      const result = await adapter.sendTrustlineTransaction({
        limitAmount: {
          currency: token.currency,
          issuer: token.issuer,
          value: '10000'
        }
      })

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleFaucet = async (address: string) => {
    try {
      const client = new XrplClient()
      const result = await client.sendFaucetTransaction(address)
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    handleTrustline,
    handleFaucet
  }
}
