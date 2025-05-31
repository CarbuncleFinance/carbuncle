import { http, createConfig } from 'wagmi'
import { xrplevmTestnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [xrplevmTestnet],
  transports: {
    [xrplevmTestnet.id]: http()
  },
  connectors: [injected()],
  ssr: false
})
