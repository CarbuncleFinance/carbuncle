import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChainType, chainTypeToChain, chainToChainType } from '@/types/enums'
import { Chain } from '@/domains/blockchain/types'

export type Wallet = {
  chainType: ChainType | null
  address: string
  chain?: Chain
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

export function getWalletChain(wallet: Wallet): Chain | null {
  if (wallet.chain) {
    return wallet.chain
  }
  if (wallet.chainType && wallet.address) {
    return chainTypeToChain(wallet.chainType, wallet.address)
  }
  return null
}

export function setWalletWithChain(chain: Chain, address: string): Wallet {
  return {
    chainType: chainToChainType(chain),
    address,
    chain
  }
}
