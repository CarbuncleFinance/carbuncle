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
- `src/hooks/`：カスタムフック
- `src/stores/`：Zustand等の状態管理
- `src/utils/`：ユーティリティ関数
- `src/constants/`：定数
- `src/types/`：型定義
- `src/styles/`：Vanilla ExtractによるCSS-in-JS設計
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

### コーディングスタイル
- TypeScript：strictモード、型安全重視
- Biome：シングルクォート、セミコロン省略、2スペースインデント
- MUI：テーマカスタマイズ、`sx` props活用
- Vanilla Extract：グローバル・ユーティリティスタイル
- i18n：`useTranslations`でラベル管理、`[locale]`動的ルーティング
- パスエイリアス：`@/`で`src/`直下参照

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

### その他Devin向けTips
- Bun推奨（`bun dev`等）
- MUIの`Button`等はラップして`BaseButton`等で拡張
- グローバルな状態やテーマはProviderでラップ
- 追加実装時は`views/`や`features/`配下を優先
- Storybookやテストは未導入（必要に応じて追加可）
