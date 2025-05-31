export interface WalletAdapter {
  connect(): Promise<string>
  disconnect(): Promise<void>
  isInstalled(): Promise<boolean>
  getAddress(): Promise<string | null>
}

export enum WalletType {
  XRPL_GEM = 'xrpl-gem',
  EVM_INJECTED = 'evm-injected',
  SUI_WALLET = 'sui-wallet'
}

export interface WalletConfig {
  type: WalletType
  name: string
  icon?: string
}

export interface ConnectedWallet {
  address: string
  type: WalletType
  adapter: WalletAdapter
}
