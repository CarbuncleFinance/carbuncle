/** XRPL Wallet Types */
export enum XrplWalletTypes {
  GEM_WALLET = 'gem-wallet'
}

export type XrplWalletType =
  (typeof XrplWalletTypes)[keyof typeof XrplWalletTypes]
