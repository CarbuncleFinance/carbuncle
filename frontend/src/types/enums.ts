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

import {
  Chain,
  XRPLChain,
  EVMChain,
  ChainProtocol,
  ETHEREUM_MAINNET,
  POLYGON_MAINNET
} from '@/domains/blockchain/types'
import { ETHEREUM_CHAIN_ID, POLYGON_CHAIN_ID } from '@/constants/blockchain'

export function isXRPLChain(chain: Chain): chain is XRPLChain {
  return chain.protocol === ChainProtocol.XRPL
}

export function isEVMChain(chain: Chain): chain is EVMChain {
  return chain.protocol === ChainProtocol.EVM
}

export function getChainById(chainId: number): EVMChain | null {
  switch (chainId) {
    case ETHEREUM_CHAIN_ID:
      return ETHEREUM_MAINNET
    case POLYGON_CHAIN_ID:
      return POLYGON_MAINNET
    default:
      return null
  }
}
