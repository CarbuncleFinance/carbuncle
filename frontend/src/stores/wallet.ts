import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChainType } from '@/types/enums'

export type Wallet = {
  chainType: ChainType | null
  address: string
}

type WalletState = {
  wallet: Wallet
  isConnected: boolean
  setWallet: (wallet: Wallet) => void
  clearWallet: () => void
}

export const initialWallet: Wallet = {
  chainType: null,
  address: ''
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
