import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Wallet = {
  address: string
}

type WalletState = {
  wallet: Wallet
  isConnected: boolean
  setWallet: (wallet: Wallet) => void
  clearWallet: () => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      wallet: {
        address: ''
      },
      isConnected: false,
      setWallet: (wallet: Wallet) => set({ wallet, isConnected: true }),
      clearWallet: () => set({ wallet: { address: '' }, isConnected: false })
    }),
    {
      name: 'wallet-store'
    }
  )
)
