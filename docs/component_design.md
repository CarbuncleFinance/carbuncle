# コンポーネント設計

## 前提条件

- 本プロジェクトでは、**運用コストを抑え、保守性・拡張性のバランスを重視**したコンポーネント設計を採用します。
- **アトミックデザイン（atoms/molecules/organisms等）**は、粒度の細分化による運用コスト増大・管理の煩雑化を避けるため、採用しません。
- **MUI**（Material UI）および**vanilla-extract**を活用し、型安全かつ柔軟なスタイリングを実現します。
- 汎用的なUI部品は`common/`に集約し、機能単位・ページ単位での整理を基本とします。

## 1. ディレクトリ構成

```
src/
  components/
    common/      # 汎用UI（Button, Modal, Inputなど。細分化しすぎない）
    features/    # 機能単位（Auth, Wallet, NFTなど）
    layouts/     # レイアウト
    providers/   # コンテキストプロバイダー
    views/       # ページ単位
```

## 2. コンポーネントの分類と責務

### 2.1 common/
- Button, Modal, Input, Card など、よく使うUI部品のみ
- MUIのラップやカスタムスタイルはここで管理
- 細かく分けすぎず、再利用性と運用コストのバランスを重視

### 2.2 features/
- 機能ごとにディレクトリを分ける
- 例：`features/auth/`, `features/wallet/`, `features/nft/` など
- ビジネスロジックや機能単位のUIをまとめる

### 2.3 layouts/
- アプリ全体やページごとのレイアウト
- 共通のヘッダー、フッター、サイドバーなど

### 2.4 providers/
- グローバルな状態管理やテーマ
- 例：`ThemeProvider`, `AuthProvider`, `WalletProvider`

### 2.5 views/
- ページ単位のコンポーネント
- 複数のfeaturesやcommonを組み合わせてページを構成

## 3. 命名規則

### 3.1 ファイル名
- パスカルケース（PascalCase）
- コンポーネント名と一致
- 例：`Button.tsx`, `UserProfile.tsx`

### 3.2 コンポーネント名
- パスカルケース（PascalCase）
- 機能を明確に示す名前
- 例：`PrimaryButton`, `UserProfileCard`

## 4. スタイリング方針

### 4.1 vanilla-extractの使用
- スコープ付きCSS
- 型安全なスタイリング
- テーマ変数の活用

### 4.2 MUIとの統合
- MUIの基本コンポーネントをラップ
- カスタムテーマの適用
- スタイルの上書きは最小限に

## 5. コンポーネント設計の原則

### 5.1 単一責任の原則
- 各コンポーネントは1つの責務のみを持つ
- 複雑なロジックはカスタムフックに分離

### 5.2 再利用性
- 汎用的なコンポーネントは`common/`に配置
- プロップスの設計は柔軟に

### 5.3 パフォーマンス
- メモ化の適切な使用
- 不要な再レンダリングの防止
- コード分割の活用

## 6. 実装例

### 6.1 commonコンポーネント

```typescript
// components/common/Button.tsx
import { Button as MuiButton } from '@mui/material';
import { style } from './Button.css';

export type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
}: ButtonProps) => {
  return (
    <MuiButton
      className={style[variant]}
      size={size}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
```

### 6.2 featuresコンポーネント

```typescript
// components/features/auth/LoginForm.tsx
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { style } from './LoginForm.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
};
```

### 6.3 viewsコンポーネント

```typescript
// components/views/Dashboard.tsx
import { useEffect } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { WalletConnect } from '@/components/features/wallet/WalletConnect';
import { NFTList } from '@/components/features/nft/NFTList';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { style } from './Dashboard.css';

export const Dashboard = () => {
  const { data, isLoading, error, fetchData } = useDashboard();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DashboardLayout>
      <div className={style.container}>
        <header className={style.header}>
          <h1>Dashboard</h1>
          <WalletConnect />
        </header>
        <main className={style.main}>
          <NFTList nfts={data.nfts} />
        </main>
      </div>
    </DashboardLayout>
  );
};
```

## 7. ベストプラクティス

### 7.1 コンポーネントの分割
- 適切な粒度での分割
- 責務の明確な分離
- 再利用性の考慮

### 7.2 状態管理
- ローカルステートの適切な使用
- グローバルステートの必要性の判断
- カスタムフックの活用

### 7.3 エラーハンドリング
- 適切なエラー境界の設定
- ユーザーフレンドリーなエラーメッセージ
- エラー状態の視覚的フィードバック

### 7.4 アクセシビリティ
- セマンティックなHTMLの使用
- キーボード操作のサポート
- スクリーンリーダー対応
