# ドキュメント構成

このディレクトリには、Carbuncle Financeプロジェクトの全ドキュメントが日本語で整理されています。

## 構成

### business/ - ビジネス要件
プロダクトの要件定義とコンセプトに関するドキュメント

- **requirements/** - 要件定義
  - `01_introduction.md` - プロジェクト概要とWeb2/Web3の比較
- **concepts/** - ビジネスコンセプト
  - `02_about.md` - Carbuncle DeFiの概要とミッション
  - `03_core_features.md` - コア機能とアーキテクチャ概要

### technical/ - 技術仕様
システムの技術的な設計と仕様に関するドキュメント

- **architecture/** - アーキテクチャ設計
  - `blockchain_types.md` - ブロックチェーン型定義とドメインモデル
  - `wallet_connect_design.md` - ウォレット接続機能の設計書
- **api/** - API仕様
  - **xrpljs/** - XRPL.js ライブラリ関連
    - `01_introduction.md` - xrpl.js の概要と使用方法
    - `02_client.md` - Client クラスのAPIリファレンス

### development/ - 開発ガイドライン
開発者向けの規約とガイドライン

- **guidelines/** - 開発ガイドライン
  - `component_design.md` - コンポーネント設計指針とベストプラクティス

## 変更履歴

- 2025-06-02: ドキュメント構成をリファクタリング
  - ビジネス要件、技術仕様、開発ガイドラインを明確に分離
  - ja/ ディレクトリを削除し、全て日本語で統一
  - 機能別・目的別の階層構造に再編成
