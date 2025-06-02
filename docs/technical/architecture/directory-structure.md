# ディレクトリ構成ガイドライン

## 1. コア原則

- **ルーティングの整合性**  
  App Routerのファイルシステムベースのルーティングを最大限に活用し、`app`ディレクトリの構造がURLパスに直接反映されるようにします。

- **コ・ロケーション（Co-location）**  
  関連するファイル（コンポーネント、ロジック、型定義など）を物理的に近くに配置し、見つけやすさ・理解しやすさ・変更のしやすさを向上させます。

- **関心の分離（Separation of Concerns）**  
  各ファイルやディレクトリが単一の明確な責任を持つよう設計し、凝集度を高め、依存関係を減らします。

- **スケーラビリティと拡張性**  
  アプリケーションの規模が拡大しても破綻しにくい構造とし、特にマルチチェーン対応で新しいチェーンや機能の追加が容易であることを重視します。

- **再利用性**  
  汎用的なコンポーネントやロジックは一箇所にまとめ、複数の場所で活用できるように設計します。

---

## 2. 全体ディレクトリ構成

下記はサンプルとなるプロジェクト構成です。

```
project/
├── public/                 # 静的ファイル (画像、フォントなど)
│   ├── favicon.ico
│   ├── images/
│   ├── icons/
│   └── vercel.svg
├── src/
│   ├── app/                # App Routerのルーティングルート
│   │   ├── (auth)/         # ルートグループ: 認証関連ページ (URLパスには含まれない)
│   │   │   ├── login/
│   │   │   │   ├── page.tsx          # ログインページUI
│   │   │   │   ├── LoginForm.tsx     # ログインページ固有のクライアントコンポーネント
│   │   │   │   └── actions.ts        # ログイン処理に関連するサーバーアクション (Optional)
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (main)/         # ルートグループ: メインアプリケーションページ
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx          # ダッシュボードページUI
│   │   │   │   ├── _components/      # ダッシュボードページ固有のコンポーネント (プライベートフォルダ)
│   │   │   │   │   └── DashboardOverview.tsx
│   │   │   │   ├── _lib/             # ダッシュボードページ固有のデータフェッチング/ロジック (プライベートフォルダ)
│   │   │   │   │   └── getDashboardData.ts
│   │   │   │   └── _hooks/           # ダッシュボードページ固有のフック (プライベートフォルダ)
│   │   │   │       └── useDashboardFilter.ts
│   │   │   ├── settings/
│   │   │   │   └── profile/
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx              # メインページのインデックス (例: `/` が `(main)/page.tsx` にルーティングされる場合)
│   │   ├── layout.tsx      # グローバルなレイアウト
│   │   ├── loading.tsx     # グローバルなローディングUI
│   │   ├── error.tsx       # グローバルなエラーUI
│   │   ├── not-found.tsx   # 404ページ
│   │   └── page.tsx        # トップページ
│   ├── features/           # ドメイン/ビジネスロジックを持つ主要な機能群
│   │   ├── swap/           # スワップ機能
│   │   │   ├── components/       # スワップ機能内で再利用されるコンポーネント (例: SwapForm, ChainSelector)
│   │   │   │   ├── SwapForm.tsx
│   │   │   │   └── ChainSelector.tsx
│   │   │   ├── services/         # スワップ関連のAPI呼び出し、ビジネスロジック (チェーン固有のサービスを含む)
│   │   │   │   ├── evmSwapService.ts   # EVMチェーン向けのスワップロジック
│   │   │   │   ├── xrplSwapService.ts  # XRPLedger向けのスワップロジック
│   │   │   │   └── index.ts            # チェーン選択に応じたサービスのエクスポート
│   │   │   ├── hooks/            # スワップ機能固有のカスタムフック
│   │   │   │   └── useSwap.ts
│   │   │   ├── types/            # スワップ機能固有の型定義
│   │   │   │   └── swap.d.ts
│   │   │   └── utils/            # スワップ機能固有のユーティリティ関数 (例: price calculation)
│   │   │       └── priceCalculation.ts
│   │   ├── liquidity/      # 流動性提供機能
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   ├── staking/        # ステーキング機能
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   └── bridge/         # ブリッジ機能
│   │       ├── components/
│   │       ├── services/
│   │       ├── hooks/
│   │       └── types/
│   ├── common/             # アプリケーション全体で共有される汎用的な要素
│   │   ├── components/     # 汎用UIコンポーネント (例: Button, Input, Modal, Table)
│   │   │   ├── ui/             # 原子的なUIコンポーネント (デザインシステムの一部)
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Input.tsx
│   │   │   └── layout/         # グローバルなレイアウトパーツ (Header, Footerなど、app/layout.tsxで直接使用されない場合)
│   │   │       └── Header.tsx
│   │   ├── hooks/          # 汎用カスタムフック (例: useMediaQuery, useLocalStorage, useWeb3)
│   │   │   ├── useDebounce.ts
│   │   │   └── useWeb3.ts          # アクティブなチェーン情報、ウォレット接続状態を管理するフック
│   │   ├── lib/            # グローバルなユーティリティ、ヘルパー、外部サービス連携
│   │   │   ├── web3/           # ブロックチェーン関連のコアロジック (チェーン抽象化レイヤー)
│   │   │   │   ├── evm/            # EVM系チェーン共通のロジック
│   │   │   │   │   ├── chains.ts       # EVMチェーン設定データ (ETHEREUM_MAINNETなど)
│   │   │   │   │   ├── client.ts       # Wagmi/Ethersクライアント初期化
│   │   │   │   │   └── contracts.ts    # 汎用的なEVMコントラクトインタラクション
│   │   │   │   ├── xrpl/           # XRPLedger固有のロジック
│   │   │   │   │   ├── chains.ts       # XRPLチェーン設定データ (XRPL_MAINNETなど)
│   │   │   │   │   ├── client.ts       # xrpl.Clientの初期化、接続管理
│   │   │   │   │   ├── transactions.ts # トランザクションの構築、署名、送信
│   │   │   │   │   ├── account.ts      # アカウント情報取得 (残高、NFTs, Issued Tokensなど)
│   │   │   │   │   └── utils.ts        # XRPLedger固有の汎用ユーティリティ
│   │   │   │   ├── utils/          # チェーン横断的なWeb3ユーティリティ (アドレス変換、フォーマットなど)
│   │   │   │   │   ├── address.ts
│   │   │   │   │   └── chain.ts      # チェーンユーティリティ関数 (getDefaultChainForProtocolなど)
│   │   │   │   └── wallet/         # ウォレット連携ロジック
│   │   │   │       └── index.ts      # WalletFactoryの実装 (xrpl.jsウォレットアダプターも含む)
│   │   │   ├── api.ts          # アプリケーションバックエンドAPI連携
│   │   │   ├── constants.ts    # グローバルな定数
│   │   │   └── utils.ts        # グローバルに利用される純粋なユーティリティ関数
│   │   ├── styles/         # グローバルなスタイル定義、Tailwind CSSの設定
│   │   │   ├── globals.css
│   │   │   └── tailwind.css
│   │   ├── types/          # グローバルな型定義
│   │   │   ├── index.d.ts      # アプリケーション全体で利用される汎用型
│   │   │   ├── blockchain.d.ts # ChainProtocol, BaseChain, Chain など、プロトコル共通の型
│   │   │   ├── evm.d.ts        # EVM固有のネットワーク型、チェーン型
│   │   │   └── xrpl.d.ts       # XRPL固有のネットワーク型、チェーン型
│   │   └── config/         # アプリケーション全体の設定ファイル
│   │       └── site.ts
└── .env                    # 環境変数
└── next.config.js          # Next.js設定ファイル
└── tsconfig.json           # TypeScript設定ファイル
└── package.json            # プロジェクトの依存関係とスクリプト
```

---

## 3. 各トップレベルディレクトリの方針

### 3.1. `src/app/`

**目的**  
Next.js App Routerのルーティング定義と、各ページに直接関連するUIコンポーネントを配置します。

**主な内容**  
- `page.tsx`：各URLパスに対応するルートページコンポーネント
- `layout.tsx`：ページグループやアプリ全体のレイアウト
- `loading.tsx`, `error.tsx`, `not-found.tsx`：Next.jsの特殊ファイル
- `(group)/`：ルートグループ（例: `(auth)`, `(main)`）はURLパスに影響せず、論理的なグループ化や共通レイアウトの適用に利用
- `_components/`：特定ページやルートグループ専用のコンポーネント（コ・ロケーション実現、グローバル汚染防止）
- `actions.ts`：ページ固有のサーバーアクション

**方針**  
- ルーティングとUI表示に特化し、複雑なビジネスロジックや汎用ユーティリティは配置しない
- 再利用されないコンポーネントは、直接使用されるページの`_components`に配置

---

### 3.2. `src/features/`

**目的**  
アプリの主要なビジネス機能（ドメイン）ごとにコードをカプセル化します。  
例：swap、liquidity、staking、bridge など

**主な内容**  
- `[feature名]/`：各機能のルートディレクトリ
  - `components/`：機能内で再利用されるコンポーネント
  - `services/`：機能固有のビジネスロジック・API呼び出し・データ処理  
    - マルチチェーン対応例：`evmSwapService.ts`, `xrplSwapService.ts`と抽象化レイヤー`index.ts`
  - `hooks/`：機能固有のカスタムReactフック
  - `types/`：機能固有の型定義
  - `utils/`：機能固有のユーティリティ関数

**方針**  
- 機能ごとに高凝集・低結合を実現
- 新機能追加時は既存コードに影響せず新ディレクトリ追加
- チームごとに独立して作業しやすい構造

---

### 3.3. `src/common/`

**目的**  
アプリ全体で再利用される汎用的な要素を集中管理します。

**主な内容**  
- `components/`
  - `ui/`：全体で再利用されるUIコンポーネント（例：Button, Input, Modal）
  - `layout/`：グローバルなレイアウトパーツ（例：Header, Footer）
  - `hooks/`：汎用カスタムReactフック（例：useMediaQuery, useDebounce, useWeb3）
- `lib/`
  - `web3/`：マルチチェーンDeFiアプリの抽象化レイヤー
  - `evm/`：EVM系チェーン共通ロジック
  - `xrpl/`：XRPLedger固有ロジック
  - `utils/`：チェーン横断的なWeb3ユーティリティ
  - `wallet/`：汎用ウォレット接続ロジック・アダプター
  - `api.ts`：バックエンドとの汎用APIクライアント
  - `constants.ts`：グローバル定数
  - `utils.ts`：グローバルユーティリティ関数
- `styles/`：グローバルスタイル・Tailwind CSS設定
- `types/`
  - `index.d.ts`：全体で利用される汎用型
  - `blockchain.d.ts`：プロトコル共通型
  - `evm.d.ts`：EVM固有型
  - `xrpl.d.ts`：XRPL固有型
- `config/`：全体設定ファイル

**方針**  
- `common`のモジュールは`app`や`features`から参照されるが、逆依存はしない
- Web3関連ロジックを集約し、チェーン追加・変更を容易に
- マルチチェーン対応の効率化

---

### 3.4. `public/`

**目的**  
Next.jsが静的ファイル（画像・フォント等）を配信する場所

**方針**  
- Webpackビルドに含まれない、直接アクセス可能なアセットを配置

---

## 4. 保守性向上のための主要ポイント

- **明確な責務分離**  
  各ディレクトリ・ファイルが明確な役割を持つことで、理解・変更が容易

- **コ・ロケーションの最適化**  
  `_components`や`features`内サブディレクトリで、関連ファイルを近くに配置

- **スケーラビリティ・拡張性**  
  `features`ディレクトリで新機能追加が独立、`common/lib/web3`の抽象化で新ブロックチェーン追加も容易

- **型安全性**  
  TypeScriptを最大限活用し、`types/`で厳密な型定義

- **サーバー/クライアントコンポーネントの最適設計**  
  `use client`ディレクティブは最小限、ロジックは`lib`や`actions`に、UIは必要に応じてクライアント化

---

このディレクトリ構成は、小規模プロジェクトから大規模エンタープライズアプリケーションまで、幅広い規模のマルチチェーンDeFiアプリ開発に対応できる柔軟性と堅牢性を兼ね備えています。