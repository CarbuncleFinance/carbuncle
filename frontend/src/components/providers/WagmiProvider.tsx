'use client'

import { WagmiProvider as WagmiProviderBase } from 'wagmi'
import { config } from '@/wagmi.config'

export default function WagmiProvider({
  children
}: { children: React.ReactNode }) {
  return <WagmiProviderBase config={config}>{children}</WagmiProviderBase>
}
