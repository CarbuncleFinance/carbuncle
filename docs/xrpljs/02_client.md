# クラス: Client

XRPL（rippledサーバー）とやり取りするためのクライアント。

## 継承階層

- EventEmitter<EventTypes>
  - Client

---

## コンストラクタ

### new Client(server: string, options?: ClientOptions): Client

rippledサーバーへのWebSocket接続を持つ新しいClientを作成します。

- **server**: 接続先サーバーのURL（例: `'wss://s.altnet.rippletest.net:51233'`）
- **options**: クライアント設定用オプション（省略可）

**例:**
```typescript
import { Client } from "xrpl"
const client = new Client('wss://s.altnet.rippletest.net:51233')
```

---

## 主なメソッド

### getBalances

#### 概要
指定したアカウントのXRP/非XRP残高を取得します。

#### シグネチャ
```typescript
getBalances(
  address: string,
  options?: {
    ledger_hash?: string;
    ledger_index?: LedgerIndex;
    limit?: number;
    peer?: string;
  }
): Promise<{ currency: string; issuer?: string; value: string }[]>
```

#### パラメータ
- **address**: 残高を取得するアカウントアドレス
- **options**: 取得条件（台帳ハッシュ、台帳インデックス、件数制限、peerでのフィルタ等）

#### 戻り値
- 指定アカウントのXRP/非XRP残高配列

#### 例
```typescript
const client = new Client('wss://s.altnet.rippletest.net:51233')
await client.connect()
const balances = await client.getBalances(address, { ledger_index: 'validated', limit: 10 })
console.log(balances)
await client.disconnect()
```

---

### getLedgerIndex

#### 概要
最新の検証済み台帳のインデックスを返します。

#### シグネチャ
```typescript
getLedgerIndex(): Promise<number>
```

#### 戻り値
- 最新の検証済み台帳インデックス

---

### getOrderbook

#### 概要
2つの通貨ペア間のオーダーブック（買い/売り注文）を取得します。

#### シグネチャ
```typescript
getOrderbook(
  currency1: BookOfferCurrency,
  currency2: BookOfferCurrency,
  options?: {
    ledger_hash?: string | null;
    ledger_index?: LedgerIndex;
    limit?: number;
    taker?: string | null;
  }
): Promise<{ buy: BookOffer[]; sell: BookOffer[] }>
```

#### 戻り値
- 買い注文・売り注文のオブジェクト

---

### getXrpBalance

#### 概要
指定アドレスのXRP残高を取得します。

#### シグネチャ
```typescript
getXrpBalance(
  address: string,
  options?: { ledger_hash?: string; ledger_index?: LedgerIndex }
): Promise<number>
```

#### 戻り値
- XRP残高（数値）

---

### autofill

#### 概要
トランザクションのフィールド（Sequence, Fee, lastLedgerSequence等）を自動補完します。

#### シグネチャ
```typescript
autofill<T extends SubmittableTransaction>(
  transaction: T,
  signersCount?: number
): Promise<T>
```

#### 戻り値
- 補完済みのトランザクション

---

### simulate

#### 概要
未署名トランザクションをシミュレートします（自動補完・署名・エンコード・送信）。

#### シグネチャ
```typescript
simulate<Binary extends boolean = false>(
  transaction: string | SubmittableTransaction,
  opts?: { binary?: Binary }
): Promise<SimulateResponse>
```

---

### submit

#### 概要
署名済み/未署名トランザクションを送信します（自動補完・署名・エンコード・送信）。

#### シグネチャ
```typescript
submit(
  transaction: string | SubmittableTransaction,
  opts?: { autofill?: boolean; failHard?: boolean; wallet?: Wallet }
): Promise<SubmitResponse>
```

---

### submitAndWait

#### 概要
トランザクションを送信し、検証済み台帳に含まれるまで待機します。

#### シグネチャ
```typescript
submitAndWait<T extends SubmittableTransaction = SubmittableTransaction>(
  transaction: string | T,
  opts?: { autofill?: boolean; failHard?: boolean; wallet?: Wallet }
): Promise<TxResponse<T>>
```

---

### fundWallet

#### 概要
新規または既存のXRPLウォレットにXRP（通常1000XRP）を送金します。

#### シグネチャ
```typescript
fundWallet(
  this: Client,
  wallet?: Wallet | null,
  options?: FundingOptions
): Promise<{ balance: number; wallet: Wallet }>
```

#### 例
```typescript
const { wallet, balance } = await client.fundWallet()
```

---

## プロパティ

- **feeCushion**: number  
  送信時の手数料に掛けるクッション係数（デフォルト: 1.2）

- **maxFeeXRP**: string  
  許容する最大トランザクションコスト（デフォルト: '2'）

- **url**: string  
  接続中のサーバーURL

- **apiVersion**: APIVersion  
  サーバーが使用しているAPIバージョン

- **buildVersion**: string | undefined  
  サーバーのrippledバージョン

- **connection**: Connection  
  内部接続オブジェクト

- **networkID**: number | undefined  
  サーバーのネットワークID

---

## その他のメソッド

- **connect()**: サーバーへ接続
- **disconnect()**: サーバーから切断
- **isConnected()**: 接続状態を返す
- **on(eventName, listener)**: イベントハンドラ登録
- **request(req)**: 任意のコマンドを送信
- **requestAll(request, collect?)**: ページングを伴うリソース取得
- **requestNextPage(req, resp)**: 次ページのデータ取得
- **getServerInfo()**: サーバー情報（networkID, buildVersion）取得
- **prepareTransaction()**: （非推奨）autofillの旧バージョン

---

### 備考

- 例外やエラー時の挙動、詳細なパラメータ仕様は各メソッドの説明を参照してください。
- `autofill`は`submit`や`submitAndWait`で自動的に呼ばれます。
- `prepareTransaction`はv1互換のため非推奨です。`autofill`を推奨します。

---

本ドキュメントは、公式APIリファレンス（[xrpl.js Client class](https://js.xrpl.org/classes/Client.html#getxrpbalance)）を参考に作成しています。
