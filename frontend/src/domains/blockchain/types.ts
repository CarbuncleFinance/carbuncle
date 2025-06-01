export enum ChainProtocol {
  XRPL = 'XRPL',
  EVM  = 'EVM',
}

export type XRPLNetwork = 'mainnet' | 'testnet' | 'devnet'
export type EVMNetwork  = 'mainnet' | 'sepolia' | 'mumbai'

export type BaseChain<P extends ChainProtocol, N extends string> = {
  protocol: P
  name: string
  network: N
  chainId: number
}

export type XRPLChain = BaseChain<
  ChainProtocol.XRPL,
  XRPLNetwork
> & {
  address: `r${string}`
}

export type EVMChain = BaseChain<
  ChainProtocol.EVM,
  EVMNetwork
> & {
  address: `0x${string}`
}

export type Chain = XRPLChain | EVMChain
