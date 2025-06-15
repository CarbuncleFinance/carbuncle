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
  WALLET_ACCOUNT_LINES_FETCH_FAILED = 'walletAccountLinesFetchFailed',

  // Transaction Errors
  TRANSACTION_FAILED = 'transactionFailed',

  // Bridge Errors
  BRIDGE_TRANSACTION_FAILED = 'bridgeTransactionFailed',

  // Database Errors
  DATABASE_ERROR = 'databaseError',

  // Unknown Error
  UNKNOWN_ERROR = 'unknownError'
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

/** Axelar Bridge Message Types */
export enum MessageTypes {
  INTERCHAIN_TRANSFER = 0,
  DEPLOY_INTERCHAIN_TOKEN = 1,
  LINK_TOKEN = 5
}
export type MessageType = (typeof MessageTypes)[keyof typeof MessageTypes]
