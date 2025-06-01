/** Chain Protocol Types */
export enum ChainProtocolTypes {
  XRPL = 'xrpl',
  EVM = 'evm'
}

export type ChainProtocolType = (typeof ChainProtocolTypes)[keyof typeof ChainProtocolTypes]

export const ChainProtocolTypeNames: Record<ChainProtocolType, string> = {
  [ChainProtocolTypes.XRPL]: 'XRPL',
  [ChainProtocolTypes.EVM]: 'EVM'
}

/** Chain Types */
export enum ChainTypes {
  XRPL = 'xrpl',
  EVM = 'evm'
}

export type ChainType = (typeof ChainTypes)[keyof typeof ChainTypes]

export const ChainTypeNames: Record<ChainType, string> = {
  [ChainTypes.XRPL]: 'XRP Ledger',
  [ChainTypes.EVM]: 'EVM'
}

/** EVM Chain Types */
export enum EvmChainTypes {
  XRPL_EVM = 'xrpl-evm'
}

export type EvmChainType = (typeof EvmChainTypes)[keyof typeof EvmChainTypes]

export const EvmChainTypeNames: Record<EvmChainType, string> = {
  [EvmChainTypes.XRPL_EVM]: 'XRPL EVM'
}

/** Wallet Types */
export enum WalletTypes {
  GEM_WALLET = 'gem-wallet',
  METAMASK = 'metamask'
}

export type WalletType = (typeof WalletTypes)[keyof typeof WalletTypes]

export const WalletTypeNames: Record<WalletType, string> = {
  [WalletTypes.GEM_WALLET]: 'GemWallet',
  [WalletTypes.METAMASK]: 'MetaMask'
}

/** Languages */
export enum Languages {
  EN = 'en',
  JA = 'ja',
  KO = 'ko'
}

export type Language = (typeof Languages)[keyof typeof Languages]

export const LanguageNames: Record<Language, string> = {
  [Languages.EN]: 'English',
  [Languages.JA]: '日本語',
  [Languages.KO]: '한국어'
}

/** App Error Codes */
export enum AppErrorCode {
  // Wallet Errors
  WALLET_NOT_INSTALLED = 'walletNotInstalled',
  WALLET_CONNECTION_FAILED = 'walletConnectionFailed',

  // Unknown Error
  UNKNOWN_ERROR = 'unknownError'
}

import { Chain, XRPLChain, EVMChain, ChainProtocol, ETHEREUM_MAINNET, POLYGON_MAINNET } from '@/domains/blockchain/types'

export function isXRPLChain(chain: Chain): chain is XRPLChain {
  return chain.protocol === ChainProtocol.XRPL
}

export function isEVMChain(chain: Chain): chain is EVMChain {
  return chain.protocol === ChainProtocol.EVM
}

export function chainTypeToChain(chainType: ChainType, address: string = '0x'): Chain {
  switch (chainType) {
    case ChainTypes.XRPL:
      return {
        protocol: ChainProtocol.XRPL,
        name: 'XRPL',
        network: 'mainnet',
        address: address.startsWith('r') ? address as `r${string}` : 'rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' as `r${string}`
      }
    case ChainTypes.EVM:
      return {
        ...ETHEREUM_MAINNET,
        address: address.startsWith('0x') ? address as `0x${string}` : '0x' as `0x${string}`
      }
    default:
      throw new Error(`Unsupported chain type: ${chainType}`)
  }
}

export function chainToChainType(chain: Chain): ChainType {
  if (chain.protocol === ChainProtocol.XRPL) {
    return ChainTypes.XRPL
  }
  if (chain.protocol === ChainProtocol.EVM) {
    return ChainTypes.EVM
  }
  const _exhaustiveCheck: never = chain
  throw new Error(`Unsupported chain protocol`)
}

export function evmChainTypeToEVMChain(evmChainType: EvmChainType, address: string = '0x'): EVMChain {
  switch (evmChainType) {
    case EvmChainTypes.XRPL_EVM:
      return {
        ...POLYGON_MAINNET,
        address: address.startsWith('0x') ? address as `0x${string}` : '0x' as `0x${string}`
      }
    default:
      throw new Error(`Unsupported EVM chain type: ${evmChainType}`)
  }
}

export function evmChainToEvmChainType(evmChain: EVMChain): EvmChainType {
  return EvmChainTypes.XRPL_EVM
}

export function getChainById(chainId: number): EVMChain | null {
  switch (chainId) {
    case 1:
      return ETHEREUM_MAINNET
    case 137:
      return POLYGON_MAINNET
    default:
      return null
  }
}
