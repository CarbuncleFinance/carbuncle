# チェーンの型定義

## ドメインごとの最小コンセプト

| 概念 | 例 | 説明 |
|------|----|------|
| **ChainProtocol** | `'XRPL' \| 'EVM'` | プロトコル種別（スタックの共通化軸） |
| **ChainName** | `'XRPL' \| 'Xahau' \| 'Ethereum' \| 'Polygon'` | 個別チェーン識別子 |
| **Network** | `'mainnet' \| 'testnet' \| 'devnet' …` | 同一チェーン内の環境 |
| **ChainId** | `1`, `137`, `0x15` … | EVM系公式 ChainID、XRPL系は自前番号可 |

> **ChainProtocol → ChainName → Network** の3層ツリーを意識！

---

## ドメインモデル (Value Object)

```ts
// src/domains/blockchain/types.ts
export enum ChainProtocol {
  XRPL = 'XRPL',
  EVM  = 'EVM',
}

export type XRPLNetwork = 'mainnet' | 'testnet' | 'devnet'
export type EthereumNetwork = 'mainnet' | 'sepolia'
export type PolygonNetwork = 'mainnet' | 'amoy'

export type XRPLChainName = 'XRPL' | 'Xahau'

export type BaseChain<P extends ChainProtocol, N extends string, C extends string> = {
  protocol: P
  name: C
  network: N
}

// --- XRPL 系 ---
export type XRPLChain = BaseChain<
  ChainProtocol.XRPL,
  XRPLNetwork,
  XRPLChainName
> & {
  address: `r${string}`          // XRPL アドレス
}

// --- EVM 系 ---
export type EthereumChain = BaseChain<
  ChainProtocol.EVM,
  EthereumNetwork,
  'Ethereum'
> & {
  address: `0x${string}`
  chainId: number
}

export type PolygonChain = BaseChain<
  ChainProtocol.EVM,
  PolygonNetwork,
  'Polygon'
> & {
  address: `0x${string}`
  chainId: number
}

export type EVMChain = EthereumChain | PolygonChain
export type Chain = XRPLChain | EVMChain

// --- 定義済みチェーン定数 ---
export const ETHEREUM_MAINNET: EthereumChain = {
  protocol: ChainProtocol.EVM,
  name: 'Ethereum',
  network: 'mainnet',
  chainId: 1,
  address: '0x' as `0x${string}`
}

export const ETHEREUM_SEPOLIA: EthereumChain = {
  protocol: ChainProtocol.EVM,
  name: 'Ethereum',
  network: 'sepolia',
  chainId: 11155111,
  address: '0x' as `0x${string}`
}

export const POLYGON_MAINNET: PolygonChain = {
  protocol: ChainProtocol.EVM,
  name: 'Polygon',
  network: 'mainnet',
  chainId: 137,
  address: '0x' as `0x${string}`
}

export const POLYGON_AMOY: PolygonChain = {
  protocol: ChainProtocol.EVM,
  name: 'Polygon',
  network: 'amoy',
  chainId: 80002,
  address: '0x' as `0x${string}`
}
```
