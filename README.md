![Image](https://github.com/user-attachments/assets/1a0d0f2c-4f75-4248-b17c-9de8dc5d1807)

# SkrrtVault

## Abstract

**SkrrtVault** は、決済レイヤー XRPL と資産運用レイヤー XRPL EVM を Axelar GMP で接続し、  
XRP・RLUSD・XRPL発行トークンを担保に、安全かつシームレスな貸付・借入を可能にするレンディングプロトコルです。  
ユーザーは XRPL アドレスで署名するだけで、EVM ウォレットやガスを意識せず DeFi 機能を利用できます。

## Mission

> **「決済と資産運用をシームレスに。」**
> - **Simple**：単一ウォレットで完結するUX
> - **Secure**：クロスチェーンセキュリティと監査済コントラクト
> - **Scalable**：マルチアセット・マルチ担保への対応

## はじめに

現実世界においても、“**財布**” と “**預金口座**” は役割が異なります。  
財布は即時の支払いに特化し、利回りは求められません。  
一方で預金口座は、利便性や利息といった資産管理機能が期待されます。

ブロックチェーンでも同様です。XRPLは高速な送金と署名に優れた“デジタル財布”、  
XRPL EVMは資産を自動で運用できる“デジタル預金口座”です。

SkrrtVaultは、この分業構造を最大限に活用し、**ウォレットレスかつ安全なDeFi体験**を提供します。

## 概要

SkrrtVault は、**XRPLアドレスだけで資産を預けて運用できるウォレットレスなレンディングプロトコル**です。  
Axelar GMPにより、ユーザー署名のXRPLトランザクションが自動的にXRPL EVMのスマートコントラクトへ中継されます。

## 特徴

1. **EVMウォレットレスなDeFi体験**  
   XRPL上の署名のみで、ガス・鍵管理なしにLendingが可能です。

2. **単一アドレスによる資産管理**  
   アドレス変換により、XRPLアカウントでEVMの資産も一元管理できます。

3. **クロスチェーン対応と拡張性**  
   XRP・RLUSD・XRPL発行トークン（CFT）を担保資産として利用できます。

## システムアーキテクチャ

![Image](https://github.com/user-attachments/assets/71abffc1-94ca-41e4-82ab-e4ad83745fa4)

### レイヤー構成

| レイヤー       | コンポーネント        | 役割                       |
|----------------|-----------------------|----------------------------|
| Payment Layer   | XRPL                  | 即時送金・署名処理を担当         |
| Bridge Layer | Axelar GMP            | クロスチェーン中継とガス管理 |
| Vault Layer | XRPL EVM (SkrrtVault) | 資産管理およびレンディング処理  |

### 要素

#### XRPL

- User Wallet：ユーザーが保有するXRPLウォレット。署名や送金の起点となる
- Gateway Wallet：Axelarが連携するための中継ウォレット。XRPL EVM への接続口となる

#### XRPL EVM

- ITS Contract：Axelarが提供する Interchain Token Service コントラクト。資産転送を管理
- SkrrtRouter Contract：Axelar経由のリクエストを受け取り、LendingPoolへの処理をルーティング
- LendingPool Contract：レンディング処理の中核を担うコントラクト。デポジットや借入を管理


## ウォレットレスなEVM操作

SkrrtVaultでは、**EVMウォレットを用意することなく**Lending操作を実行できます。  
XRPLアドレスで署名されたPaymentトランザクションは、Memoフィールドにコントラクト操作情報を含み、  
Axelar GMPがそれを中継し、EVM上で `supply()` 関数などを自動実行します。

### アドレス変換ロジック（XRPL → EVM）

```ts
import { decodeAccountID } from 'xrpl'

export const xrplAddressToEvmAddress = (addr: `r${string}`): string => {
  const bytes = decodeAccountID(addr)
  return '0x' + [...bytes].map(b => b.toString(16).padStart(2, '0')).join('')
}
```

## 開発スコープ（XRPL Japan Hackathon 2025）

本ホワイトペーパーはプロトコル全体像を示していますが、  
今回のハッカソンでは以下の機能を実装しました：

- **SkrrtRouter.sol**：Axelar GMP 経由のメッセージを受信し、LendingPoolを呼び出すルーター
- **LendingPool.sol**：supply処理とデポジット残高の記録を担うメインコントラクト
- **機能範囲**：ウォレット接続→アドレス変換→Memo生成→コントラクト呼び出し→残高取得まで一連完了
