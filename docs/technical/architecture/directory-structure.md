# ディレクトリ構造

## 1. プロジェクト全体の構造

```
carbuncle/
├── docs/                # プロジェクトドキュメント
├── frontend/           # フロントエンドアプリケーション
│   ├── src/           # ソースコード
│   │   ├── app/       # Next.js App Router
│   │   ├── components/# コンポーネント
│   │   ├── domains/   # ドメインロジック
│   │   ├── hooks/     # カスタムフック
│   │   ├── i18n/      # 国際化
│   │   ├── libs/      # 外部ライブラリ統合
│   │   ├── stores/    # 状態管理
│   │   ├── styles/    # グローバルスタイル
│   │   ├── types/     # 型定義
│   │   └── utils/     # ユーティリティ関数
│   ├── public/        # 静的ファイル
│   └── messages/      # 翻訳ファイル
└── package.json        # プロジェクト設定
```

## 2. 主要ディレクトリの説明

### 2.1 `src/app/`
- Next.jsのApp Router構造に従う
- ページコンポーネントとルーティング
- 国際化対応（`[locale]`ディレクトリ）
- 各ページ固有のコンポーネントは`_components/`に配置

### 2.2 `src/components/`
- `common/`: 汎用UIコンポーネント
- `features/`: 機能単位のコンポーネント
- `layouts/`: レイアウトコンポーネント
- `providers/`: コンテキストプロバイダー

### 2.3 `src/domains/`
- ドメインロジックの集約
- ビジネスルールの実装
- 型定義とインターフェース

### 2.4 `src/hooks/`
- カスタムフック
- ロジックの再利用
- 状態管理の抽象化

### 2.5 `src/stores/`
- グローバル状態管理
- 状態の型定義
- アクションとリデューサー

## 3. 命名規則

### 3.1 ファイル名
- コンポーネント: パスカルケース（`Button.tsx`）
- フック: camelCase（`useWallet.ts`）
- ユーティリティ: camelCase（`formatDate.ts`）
- 型定義: パスカルケース（`UserTypes.ts`）

### 3.2 ディレクトリ名
- 小文字のケバブケース（`user-profile/`）
- 機能単位のディレクトリは複数形（`components/`）

## 4. インポート規則

### 4.1 絶対パス
- `@/` をプレフィックスとして使用
- 例：`import { Button } from '@/components/common/Button'`

### 4.2 相対パス
- 同じディレクトリ内のファイルは相対パスを使用
- 例：`import { styles } from './styles'`

## 5. ファイル構成の原則

### 5.1 コンポーネントファイル
```typescript
// 1. インポート
import { FC } from 'react'
import { styles } from './styles'

// 2. 型定義
type Props = {
  // ...
}

// 3. コンポーネント
export const Component: FC<Props> = () => {
  // ...
}

// 4. エクスポート
export default Component
```

### 5.2 フックファイル
```typescript
// 1. インポート
import { useState } from 'react'

// 2. 型定義
type ReturnType = {
  // ...
}

// 3. フック
export const useHook = (): ReturnType => {
  // ...
}
```

## 6. ベストプラクティス

### 6.1 ファイルの配置
- 関連するファイルは同じディレクトリに配置
- コンポーネントとそのスタイルは同じディレクトリに
- テストファイルは`__tests__`ディレクトリに

### 6.2 モジュールの分割
- 単一責任の原則に従う
- 適切な粒度での分割
- 循環依存を避ける

### 6.3 コードの整理
- 関連するコードはグループ化
- インポートの順序を統一
- 未使用のコードは削除

## 7. 移行ガイドライン

### 7.1 新規ファイル作成時
1. 適切なディレクトリを選択
2. 命名規則に従う
3. 必要なインポートを追加
4. 型定義を記述
5. 実装を追加

### 7.2 既存ファイルの移動時
1. 依存関係の確認
2. インポートパスの更新
3. テストの更新
4. ドキュメントの更新

## 8. 注意事項

### 8.1 避けるべき構造
- 深すぎるディレクトリ階層
- 不適切なファイル名
- 循環依存
- 重複したコード

### 8.2 推奨される構造
- フラットな構造
- 明確な命名
- 適切な分割
- 再利用可能なコード 

## 9. domainsとtypesの関係

### 9.1 役割の違い

- `domains/xxx/types.ts`：ドメイン固有の型・定数・関数（例：ブロックチェーンの型、チェーン情報、ユーティリティ関数など）。ビジネスロジックに密接。
- `types/`：アプリ全体で使う汎用的な型やenum、インターフェース（例：Walletの型、エラー型、言語enumなど）。ドメインに依存しない設計が理想。

### 9.2 現状の依存・重複

- `types/enums.ts` では `domains/blockchain/types.ts` の型や定数をimportして利用している（例: Chain, ChainProtocol など）。
- `types/wallet.ts` ではウォレットの型やenumを定義しているが、ブロックチェーンの型とは分離されている。
- `domains/blockchain/types.ts` には、型定義だけでなく、チェーン情報の定数やユーティリティ関数も含まれている。

### 9.3 問題点・課題

1. 型の重複は現状ほぼないが、依存関係が逆転している部分がある（typesがdomainsに依存している）。
2. domains配下の型定義が肥大化しやすい（型・定数・関数が混在しやすい）。
3. typesディレクトリの役割が曖昧になりやすい（ドメイン横断的な型のみを置くのが理想）。

### 9.4 推奨方針

- `types/`には「アプリ全体で使う汎用型・enum・インターフェース」のみを置く。
  - 例: 汎用的なエラー型、言語enum、Walletのインターフェースなど
- `domains/xxx/types.ts`には「そのドメイン固有の型・定数・関数」のみを置く。
  - 例: ブロックチェーン固有の型、チェーン情報、チェーン関連のユーティリティ関数
- types→domainsの依存は避ける。
  - どうしても共通化したい型はtypesに置き、domainsからimportする。

### 9.5 まとめ

- 現状、型の重複はほぼありませんが、依存関係や責務の明確化が今後の課題です。
- typesは「横断的・汎用的」、domainsは「ドメイン固有」として整理・運用するのがベストです。

## 10. ドメイン化候補一覧

現状の実装を分析した結果、今後ドメインとして切り出すべき業務領域は以下の通りです。

### 10.1 ウォレット（wallet）
- ウォレットの接続・切断・状態管理・アダプタ実装
- 例: `stores/wallet.ts`, `hooks/useWallet.ts`, `libs/adapters/walletFactory.ts` など

### 10.2 送金・トランザクション（transfer/transaction）
- 送金処理、残高取得、トランザクション管理
- 例: `components/views/transfer/`, `hooks/useWalletBalance.ts` など

### 10.3 ブリッジ（bridge）
- チェーン間資産移動、ブリッジ処理のステップ管理
- 例: `components/views/bridge/`配下（types, components, validation など）

### 10.4 認証・ユーザー（auth/user）
- 今後の拡張を見据え、ユーザー管理や認証もドメイン化候補

### 10.5 エラー・例外管理（error）
- アプリ共通のエラー型・ハンドリング
- 例: `types/errors.ts`, `hooks/useErrorHandler.ts` など

### 10.6 ナビゲーション（navigation）
- アプリのルーティングやナビゲーションUI
- 例: `components/features/navigation/`配下

### 10.7 レイアウト（layout）
- ページレイアウトや共通UI
- 例: `components/features/layout/`配下

---

blockchainは既にドメイン化済みです。
これらの領域をdomains配下に集約することで、責務の明確化・保守性向上・拡張性の確保が期待できます。