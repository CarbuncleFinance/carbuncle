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
