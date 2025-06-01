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
export type EVMNetwork  = 'mainnet' | 'testnet' | 'devnet'

export type BaseChain<P extends ChainProtocol, N extends string> = {
  protocol: P
  name: string
  network: N
}

// --- XRPL 系 ---
export type XRPLChain = BaseChain<
  ChainProtocol.XRPL,
  XRPLNetwork
> & {
  address: `r${string}`          // XRPL アドレス
}

// --- EVM 系 ---
export type EVMChain = BaseChain<
  ChainProtocol.EVM,
  EVMNetwork
> & {
  address: `0x${string}`         // 0x アドレス
  chainId: number                // EVM ChainID
}

export type Chain = XRPLChain | EVMChain   // Discriminated Union
