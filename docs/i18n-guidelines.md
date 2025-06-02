# 多言語対応実装ガイドライン

## 概要

Carbuncle Financeフロントエンドにおける多言語対応（国際化）の実装方針とベストプラクティスを定義します。

## 技術スタック

- **フレームワーク**: next-intl
- **対応言語**: 日本語（ja）、英語（en）、韓国語（ko）
- **翻訳ファイル**: `frontend/messages/[locale].json`

## 実装パターン

### 1. 基本的な翻訳パターン

```typescript
import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('ComponentNamespace')
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

### 2. 名前空間の構造

翻訳キーは機能別に名前空間で整理します：

```json
{
  "Navigation": {
    "transfer": "振り込み",
    "bridge": "ブリッジ",
    "dev": "開発"
  },
  "Pages": {
    "transfer": "振り込み",
    "bridge": "ブリッジ"
  },
  "BridgeSteps": {
    "transferMethodSelection": "振込方法の選択",
    "networkSelection": "振込先ネットワークの選択"
  },
  "BridgeContent": {
    "selectNetwork": "ネットワークを選択してください。",
    "destinationNetwork": "送金先ネットワーク"
  }
}
```

### 3. コンポーネント設計パターン

#### 翻訳対応コンポーネントの基本形

```typescript
interface ComponentProps {
  // 翻訳キーを優先、後方互換性のためtextも保持
  textKey?: string
  text?: string
}

export default function Component({ textKey, text }: ComponentProps) {
  const t = useTranslations('Namespace')
  const displayText = textKey ? t(textKey) : text
  
  return <span>{displayText}</span>
}
```

#### StepContainerの拡張例

```typescript
interface StepContainerProps {
  children: React.ReactNode
  titleKey?: string  // 翻訳キー（推奨）
  title?: string     // 直接テキスト（後方互換性）
}

export default function StepContainer({ children, titleKey, title }: StepContainerProps) {
  const t = useTranslations()
  const displayTitle = titleKey ? t(titleKey) : title
  
  return (
    <div>
      {displayTitle && <h2>{displayTitle}</h2>}
      {children}
    </div>
  )
}
```

## 命名規則

### 翻訳キー命名

- **camelCase**を使用
- **機能別**に名前空間を分割
- **階層構造**で論理的に整理

```json
{
  "ComponentName": {
    "actionButton": "実行",
    "cancelButton": "キャンセル",
    "validation": {
      "required": "必須項目です",
      "invalid": "無効な値です"
    }
  }
}
```

### ファイル構造

```
frontend/
├── messages/
│   ├── ja.json    # 日本語翻訳
│   ├── en.json    # 英語翻訳
│   └── ko.json    # 韓国語翻訳
└── src/
    └── components/
        └── ui/
            └── buttons/
                └── BaseButton.tsx  # 翻訳対応コンポーネント例
```

## ベストプラクティス

### 1. 翻訳キーの一貫性

- 同じ意味のテキストには同じ翻訳キーを使用
- 名前空間を適切に分割して管理しやすくする
- バリデーションメッセージなど共通要素は統一する

### 2. 後方互換性の維持

```typescript
// ❌ 既存のpropsを削除しない
interface OldProps {
  title: string
}

// ✅ 新しいpropsを追加し、既存のpropsも保持
interface NewProps {
  titleKey?: string
  title?: string
}
```

### 3. エラーハンドリング

```typescript
const t = useTranslations('Errors')

// フォールバック機能を実装
const getErrorMessage = (errorKey: string, fallback: string) => {
  try {
    return t(errorKey)
  } catch {
    return fallback
  }
}
```

### 4. 型安全性

```typescript
// 翻訳キーの型定義
type TranslationKeys = 'title' | 'description' | 'button.submit'

interface Props {
  titleKey: TranslationKeys
}
```

## 実装チェックリスト

### コンポーネント作成時

- [ ] ハードコードされたテキストがないか確認
- [ ] 適切な名前空間を使用しているか
- [ ] 全対応言語の翻訳を追加したか
- [ ] 後方互換性を維持しているか

### 翻訳ファイル更新時

- [ ] 全言語ファイル（ja.json, en.json, ko.json）を更新
- [ ] キー名の一貫性を確認
- [ ] 文脈に適した翻訳になっているか確認

### テスト項目

- [ ] 日本語表示の確認
- [ ] 英語表示の確認
- [ ] 韓国語表示の確認
- [ ] 言語切り替え動作の確認
- [ ] 既存機能の動作確認

## トラブルシューティング

### よくある問題

1. **翻訳キーが見つからない**
   - 翻訳ファイルにキーが存在するか確認
   - 名前空間が正しく指定されているか確認

2. **言語切り替えが反映されない**
   - useTranslationsフックが正しく使用されているか確認
   - ハードコードされたテキストが残っていないか確認

3. **型エラーが発生する**
   - インターフェースの定義が正しいか確認
   - オプショナルプロパティの設定を確認

## 参考リンク

- [next-intl公式ドキュメント](https://next-intl-docs.vercel.app/)
- [React国際化ベストプラクティス](https://react.dev/learn/react-i18n-best-practices)

## 更新履歴

- 2025-06-02: 初版作成
- Phase 1-5の実装完了に伴う包括的ガイドライン策定
