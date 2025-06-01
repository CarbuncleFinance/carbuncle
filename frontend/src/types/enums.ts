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

/** App Error Codes */
export enum AppErrorCode {
  // Wallet Errors
  WALLET_NOT_INSTALLED = 'walletNotInstalled',
  WALLET_CONNECTION_FAILED = 'walletConnectionFailed',

  // Unknown Error
  UNKNOWN_ERROR = 'unknownError'
}
