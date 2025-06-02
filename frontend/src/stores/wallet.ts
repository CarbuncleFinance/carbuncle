import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Chain, ChainProtocol } from '@/domains/blockchain/types'

export type Wallet = {
  address: string
  chainProtocol: ChainProtocol | null
}

type WalletState = {
  wallet: Wallet
  isConnected: boolean
  setWallet: (wallet: Wallet) => void
  clearWallet: () => void
}

export const initialWallet: Wallet = {
  address: '',
  chainProtocol: null
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

export function getWalletChainProtocol(wallet: Wallet): ChainProtocol | null {
  return wallet.chainProtocol
}

export function setWalletWithChainProtocol(
  chainProtocol: ChainProtocol,
  address: string
): Wallet {
  return {
    address,
    chainProtocol
  }
}
