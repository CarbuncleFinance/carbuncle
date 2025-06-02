# ウォレット接続設計書

## 1. 概要

### 1.1 目的
- ユーザーが安全かつ簡単にウォレットを接続できる機能を提供する
- 複数のウォレットタイプとチェーンに対応する

### 1.2 サポート対象
#### チェーンプロトコル
- XRPL (XRP Ledger)
  - **ウォレット**: GemWallet
- EVM (Ethereum Virtual Machine)
  - **ウォレット**: Metamask

## 2. アーキテクチャ

### 2.1 コンポーネント構成
```typescript
// 主要コンポーネント
- WalletSelectDialog    // ウォレット選択UI
- useWalletConnect      // ウォレット接続フック
- WalletFactory         // ウォレットアダプターファクトリー
```

### 2.2 データフロー
1. ユーザーがウォレット接続ボタンをクリック
2. WalletSelectDialogが表示される
3. ユーザーがチェーンプロトコルを選択
   - XRPL選択時: GemWalletボタンのみ表示
   - EVM選択時: Metamaskボタンのみ表示
4. ユーザーがウォレットボタンをクリック
5. 選択されたチェーンプロトコルに応じたウォレット接続処理を実行
6. 接続状態が更新される

## 3. 実装詳細

### 3.1 ウォレット接続フロー
```typescript
const handleConnect = async (walletType: WalletType) => {
  try {
    await connectWithChain(selectedChain, walletType);
    enqueueSnackbar('Connected to wallet', { variant: 'success' });
  } catch (error) {
    console.error(error);
    enqueueSnackbar('Failed to connect to wallet', { variant: 'error' });
  } finally {
    onClose();
  }
};
```

### 3.2 エラーハンドリング
- ウォレットがインストールされていない場合
- ユーザーが接続を拒否した場合
- ネットワークエラーが発生した場合
- チェーンがサポートされていない場合

## 4. 状態管理

### 4.1 接続状態
```typescript
interface WalletState {
  isConnected: boolean;
  protocol: ChainProtocol;  // 'XRPL' | 'EVM'
  chain: Chain;            // XRPLChain | EVMChain
  walletType: WalletType;  // 'GEM_WALLET' | 'METAMASK'
  address: string;         // XRPL: 'r...' | EVM: '0x...'
}
```
