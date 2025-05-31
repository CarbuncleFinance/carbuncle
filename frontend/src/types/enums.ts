/** XRPL Wallet Types */
export enum XrplWalletTypes {
  GEM_WALLET = 'gem-wallet'
}

export type XrplWalletType =
  (typeof XrplWalletTypes)[keyof typeof XrplWalletTypes]

/** App Error Codes */
export enum AppErrorCode {
  // Wallet Errors
  WALLET_NOT_INSTALLED = 'walletNotInstalled',
  WALLET_CONNECTION_FAILED = 'walletConnectionFailed',

  // Unknown Error
  UNKNOWN_ERROR = 'unknownError'
}
