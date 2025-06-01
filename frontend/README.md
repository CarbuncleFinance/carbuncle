This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 開発ナレッジ（Devin向け）

### ディレクトリ構成（主要ディレクトリの役割）
- `src/app/[locale]/`：Next.js App Router＋国際化対応。各ページは`page.tsx`、レイアウトは`layout.tsx`。
- `src/components/`：再利用可能なUI・機能コンポーネント群。
  - `ui/`：汎用UI（ボタン、ダイアログ等）
  - `features/`：機能単位のコンポーネント
  - `views/`：ページ単位のViewコンポーネント
- `src/domains/`：ドメイン固有の型定義・ロジック
  - `blockchain/`：ブロックチェーン関連の型定義（Chain型システム）
- `src/hooks/`：カスタムフック
- `src/stores/`：Zustand等の状態管理
- `src/utils/`：ユーティリティ関数
- `src/constants/`：定数（ブロックチェーンID等）
- `src/types/`：汎用型定義（Wallet、Language等）
- `src/styles/`：Vanilla ExtractによるCSS-in-JS設計
- `src/libs/`：外部ライブラリのアダプター・ラッパー
- `public/`：静的ファイル

### 技術スタック
- Next.js (App Router, TypeScript)
- MUI（@mui/material）
- Vanilla Extract（CSS-in-JS）
- Zustand（状態管理）
- next-intl（i18n）
- @tanstack/react-query（データ取得）
- Biome（Lint/Format）
- Bun（推奨ランタイム）

### Web3/ブロックチェーン対応
- **型安全なChain型システム**: discriminated unionによる厳密な型チェック
- **対応プロトコル**: XRPL、EVM（Ethereum、Polygon）
- **ウォレット統合**: GemWallet（XRPL）、MetaMask（EVM）
- **ネットワーク対応**: Mainnet、Testnet、開発環境
- **Bridge機能**: クロスチェーン資産転送

### コーディングスタイル
- TypeScript：strictモード、型安全重視
- Biome：シングルクォート、セミコロン省略、2スペースインデント
- MUI：テーマカスタマイズ、`sx` props活用
- Vanilla Extract：グローバル・ユーティリティスタイル
- i18n：`useTranslations`でラベル管理、`[locale]`動的ルーティング
- パスエイリアス：`@/`で`src/`直下参照

### ブロックチェーン型定義パターン
- **Chain型**: `src/domains/blockchain/types.ts`で定義されたdiscriminated union
- **プロトコル判定**: `isXRPLChain(chain)`, `isEVMChain(chain)`関数を使用
- **ネットワーク定数**: `src/constants/blockchain.ts`でチェーンID管理
- **ウォレット統合**: `WalletFactory`パターンでプロトコル別アダプター

### ページ・コンポーネント設計方針
- ページは`src/app/[locale]/[page]/page.tsx`で管理
- Viewコンポーネント（`views/`）でUIロジックを集約
- UIは`ui/`配下でAtomic Design的に分割
- 機能単位は`features/`配下
- 状態管理はZustand＋React Query
- レイアウトは`layout.tsx`で共通化

### 命名規則・設計粒度
- PascalCase（コンポーネント/型）
- camelCase（関数/変数）
- ディレクトリ名は小文字
- ファイル粒度は「1機能1ファイル」推奨
- i18nキーは`ComponentName.label`形式

### ブロックチェーン関連の設計指針
- **型定義**: `Chain`型を基本とし、プロトコル固有の拡張は継承で実現
- **ネットワーク管理**: 定数は`ETHEREUM_MAINNET`等の具体的な名前で定義
- **ウォレット状態**: `wallet.chain`フィールドで現在接続中のチェーン情報を管理
- **コンポーネント設計**: `chain.protocol`による条件分岐でプロトコル固有UI制御

### その他Devin向けTips
- Bun推奨（`bun dev`等）
- MUIの`Button`等はラップして`BaseButton`等で拡張
- グローバルな状態やテーマはProviderでラップ
- 追加実装時は`views/`や`features/`配下を優先
- Storybookやテストは未導入（必要に応じて追加可）

### ブロックチェーン開発時の注意点
- **型安全性**: 必ず`Chain`型を使用し、文字列での直接比較は避ける
- **プロトコル判定**: `chain.protocol === ChainProtocol.EVM`等で厳密に判定
- **ウォレット接続**: `connectWithChain(chain, walletType)`で型安全な接続
- **新チェーン追加**: `src/domains/blockchain/types.ts`と`src/constants/blockchain.ts`を更新
- **バリデーション**: Zodスキーマで`Chain`オブジェクトの包括的検証を実装
