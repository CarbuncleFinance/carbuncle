export enum ChainProtocol {
  XRPL = 'XRPL',
  EVM  = 'EVM',
}

export type XRPLNetwork = 'mainnet' | 'testnet' | 'devnet'
export type EthereumNetwork = 'mainnet' | 'sepolia'
export type PolygonNetwork = 'mainnet' | 'amoy'

export type XRPLChainName = 'XRPL' | 'Xahau'

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

export type EthereumChain = BaseChain<
  ChainProtocol.EVM,
  EthereumNetwork,
  'Ethereum'
> & {
  address: `0x${string}`
  chainId: number
}

export type PolygonChain = BaseChain<
  ChainProtocol.EVM,
  PolygonNetwork,
  'Polygon'
> & {
  address: `0x${string}`
  chainId: number
}

export type EVMChain = EthereumChain | PolygonChain
export type Chain = XRPLChain | EVMChain

export const ETHEREUM_MAINNET: EthereumChain = {
  protocol: ChainProtocol.EVM,
  name: 'Ethereum',
  network: 'mainnet',
  chainId: 1,
  address: '0x' as `0x${string}`
}

export const ETHEREUM_SEPOLIA: EthereumChain = {
  protocol: ChainProtocol.EVM,
  name: 'Ethereum',
  network: 'sepolia',
  chainId: 11155111,
  address: '0x' as `0x${string}`
}

export const POLYGON_MAINNET: PolygonChain = {
  protocol: ChainProtocol.EVM,
  name: 'Polygon',
  network: 'mainnet',
  chainId: 137,
  address: '0x' as `0x${string}`
}

export const POLYGON_AMOY: PolygonChain = {
  protocol: ChainProtocol.EVM,
  name: 'Polygon',
  network: 'amoy',
  chainId: 80002,
  address: '0x' as `0x${string}`
}
