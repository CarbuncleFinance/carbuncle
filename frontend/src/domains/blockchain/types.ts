export enum ChainProtocol {
  XRPL = 'XRPL',
  EVM  = 'EVM',
}

export type XRPLNetwork = 'mainnet' | 'testnet' | 'devnet'
export type EVMNetwork  = 'mainnet' | 'testnet' | 'devnet'

export type BaseChain<P extends ChainProtocol, N extends string> = {
  protocol: P
  name: string
  network: N
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
  chainId: number
}

export type Chain = XRPLChain | EVMChain
