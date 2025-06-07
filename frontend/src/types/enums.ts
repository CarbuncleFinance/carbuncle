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
  WALLET_BALANCE_FETCH_FAILED = 'walletBalanceFetchFailed',
  WALLET_TRANSACTION_FAILED = 'walletTransactionFailed',
  WALLET_ACCOUNT_INFO_FETCH_FAILED = 'walletAccountInfoFetchFailed',

  // Bridge Errors
  BRIDGE_TRANSACTION_FAILED = 'bridgeTransactionFailed',

  // Database Errors
  DATABASE_ERROR = 'databaseError',

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

/** Environment Types */
export enum EnvironmentTypes {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEVNET = 'devnet'
}
export type EnvironmentType =
  (typeof EnvironmentTypes)[keyof typeof EnvironmentTypes]

/** Protocol Types */
export enum ChainTypes {
  XRPL = 'XRPL',
  EVM = 'EVM'
}
export type ChainType = (typeof ChainTypes)[keyof typeof ChainTypes]

/** Chain Name Types */
export enum ChainNameTypes {
  XRPL = 'XRP Ledger',
  XRPL_EVM = 'XRPL EVM'
}
export type ChainNameType = (typeof ChainNameTypes)[keyof typeof ChainNameTypes]

/** Wallet Types */
export enum WalletTypes {
  GEM_WALLET = 'gem-wallet',
  XUMM = 'xumm',
  CROSSMARK = 'crossmark',
  METAMASK = 'metamask'
}

export type WalletType = (typeof WalletTypes)[keyof typeof WalletTypes]

export const WalletTypeNames: Record<WalletType, string> = {
  [WalletTypes.GEM_WALLET]: 'GemWallet',
  [WalletTypes.XUMM]: 'Xaman',
  [WalletTypes.CROSSMARK]: 'CROSSMARK',
  [WalletTypes.METAMASK]: 'MetaMask'
}
