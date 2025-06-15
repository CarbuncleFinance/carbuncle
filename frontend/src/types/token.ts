export type TokenAsset = {
  name: string
  symbol: string
  icon: string
  address: string
}

export type TokenBalance = {
  symbol: string
  issuer: string
  balance: number
}

export type Token = TokenAsset & {
  apy: number
  collateral: boolean
  healthFactor: number
  balance: number
}
