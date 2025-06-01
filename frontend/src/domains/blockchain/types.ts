export enum ChainProtocol {
  XRPL = 'XRPL',
  EVM = 'EVM'
}

// XRPL Network
export type XRPLNetwork = 'mainnet' | 'testnet' | 'devnet'
// EVM Network
export type XRPLEVMNetwork = 'mainnet' | 'testnet' | 'devnet'
export type EthereumNetwork = 'mainnet' | 'sepolia'
export type PolygonNetwork = 'mainnet' | 'amoy'

export type XRPLChainName = 'XRPL' | 'Xahau'

export type BaseChain<
  P extends ChainProtocol,
  N extends string,
  C extends string
> = {
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

export type XRPLEVMChain = BaseChain<
  ChainProtocol.EVM,
  XRPLEVMNetwork,
  'XRPL EVM'
> & {
  address: `0x${string}`
  chainId: number
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

export type EVMChain = XRPLEVMChain | EthereumChain | PolygonChain
export type Chain = XRPLChain | EVMChain

export const XRPLEVM_MAINNET: XRPLEVMChain = {
  protocol: ChainProtocol.EVM,
  name: 'XRPL EVM',
  network: 'mainnet',
  chainId: 9999999999999,
  address: '0x' as `0x${string}`
}

export const XRPLEVM_TESTNET: XRPLEVMChain = {
  protocol: ChainProtocol.EVM,
  name: 'XRPL EVM',
  network: 'testnet',
  chainId: 1449000,
  address: '0x' as `0x${string}`
}

export const XRPLEVM_DEVNET: XRPLEVMChain = {
  protocol: ChainProtocol.EVM,
  name: 'XRPL EVM',
  network: 'devnet',
  chainId: 1440002,
  address: '0x' as `0x${string}`
}

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

export const XRPL_MAINNET: XRPLChain = {
  protocol: ChainProtocol.XRPL,
  name: 'XRPL',
  network: 'mainnet',
  address: 'r' as `r${string}`
}

export const XRPL_TESTNET: XRPLChain = {
  protocol: ChainProtocol.XRPL,
  name: 'XRPL',
  network: 'testnet',
  address: 'r' as `r${string}`
}

export function getDefaultChainForProtocol(protocol: ChainProtocol): Chain {
  switch (protocol) {
    case ChainProtocol.XRPL:
      return XRPL_MAINNET
    case ChainProtocol.EVM:
      return ETHEREUM_MAINNET
    default:
      throw new Error(`Unsupported protocol: ${protocol}`)
  }
}

export function getSupportedWalletsForProtocol(protocol: ChainProtocol) {
  const defaultChain = getDefaultChainForProtocol(protocol)
  const { WalletFactory } = require('@/libs/adapters/walletFactory')
  return WalletFactory.getSupportedWalletsForChain(defaultChain)
}
