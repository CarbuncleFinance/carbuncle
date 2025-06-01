import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Chain } from '@/domains/blockchain/types'

export type Wallet = {
  address: string
  chain: Chain | null
}

type WalletState = {
  wallet: Wallet
  isConnected: boolean
  setWallet: (wallet: Wallet) => void
  clearWallet: () => void
}

export const initialWallet: Wallet = {
  address: '',
  chain: null
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      wallet: initialWallet,
      isConnected: false,
      setWallet: (wallet: Wallet) =>
        set({
          wallet,
          isConnected: true
        }),
      clearWallet: () => set({ wallet: initialWallet, isConnected: false })
    }),
    {
      name: 'wallet-store'
    }
  )
)

export function getWalletChain(wallet: Wallet): Chain | null {
  return wallet.chain
}

export function setWalletWithChain(chain: Chain, address: string): Wallet {
  return {
    address,
    chain
  }
}
