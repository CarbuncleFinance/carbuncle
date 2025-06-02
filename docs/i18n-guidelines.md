# 多言語対応（i18n）実装ガイドライン

## 概要
本プロジェクトのi18n（多言語対応）実装方針・運用ルールをまとめます。

## 採用技術
- next-intl（Next.js公式推奨）

## サポート言語
- 英語（en）／日本語（ja）／韓国語（ko）
- デフォルト：英語

## ルーティング
- URLパスにロケールを含める（例：/en/home, /ja/home）
- middlewareで自動判定・リダイレクト

## メッセージ管理
- 各言語ごとにJSONファイルで管理（messages/{locale}.json）
- セクションごとにネスト構造

## 利用方法
- `useTranslations`フックで取得
- 例：`const t = useTranslations('HomePage')`

## 言語切替
- LangSwitchButtonでUI切替
- localStorageに保存、routerで遷移

## 型安全
- enum/辞書でロケール管理

## 注意点・ベストプラクティス
- 新規文言追加時は全言語ファイルを更新
- セクション単位で管理し、重複を避ける
- コード例・運用フローも記載

## コード例・運用フロー

### 1. サポート言語・ルーティング定義
```ts
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'ja', 'ko'],
  defaultLocale: 'en'
})
```

### 2. メッセージファイル例
```json
// messages/en.json
{
  "HomePage": {
    "title1": "Legendary carbanker leads the way to"
  }
}
```

### 3. 翻訳取得例
```tsx
const t = useTranslations('HomePage')
return <h1>{t('title1')}</h1>
```

### 4. 言語切替UI例
```tsx
// LangSwitchButton.tsx
<MenuItem onClick={() => handleLanguageChange('ja')}>日本語</MenuItem>
```

## 運用フロー
1. 新規文言追加時は全言語ファイルを同時に更新
2. セクション単位で管理し、重複や未翻訳を防止
3. コードレビュー時にi18n対応漏れをチェック
