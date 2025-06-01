export enum ChainProtocol {
  XRPL = 'XRPL',
  EVM  = 'EVM',
}

export type XRPLNetwork = 'mainnet' | 'testnet' | 'devnet'
export type EVMNetwork  = 'mainnet' | 'testnet' | 'devnet'

export type XRPLChainName = 'XRPL' | 'Xahau'
export type EVMChainName = 'Ethereum' | 'Polygon'

export type BaseChain<P extends ChainProtocol, N extends string, C extends string> = {
  protocol: P
  name: C
  network: N
}

export type XRPLChain = BaseChain<
  ChainProtocol.XRPL,
  XRPLNetwork,
  XRPLChainName
> & {
  address: `r${string}`
}

export type EVMChain = BaseChain<
  ChainProtocol.EVM,
  EVMNetwork,
  EVMChainName
> & {
  address: `0x${string}`
  chainId: number
}

export type Chain = XRPLChain | EVMChain
