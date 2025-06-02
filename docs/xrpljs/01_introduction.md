# xrpl.js イントロダクション

JavaScript/TypeScript で XRP Ledger とやり取りするためのライブラリ

---

## 概要

xrpl.js は、XRP Ledger（分散型台帳）と連携するための推奨 JavaScript/TypeScript ライブラリです。IOU、ペイメントパス、分散型取引所（DEX）、アカウント設定、ペイメントチャネル、エスクロー、マルチ署名など、高度な機能を利用したい場合に特に適しています。

---

## 主な特徴

- キー管理 & テスト用ウォレット作成（Wallet / Client.fundWallet()）
- トランザクション送信（Client.submit(...) & 各種トランザクションタイプ）
- 台帳の監視リクエスト送信（Client.request(...) で公開APIメソッド利用）
- 台帳の変化を購読（例: ledger, transactions など）
- 台帳データの便利な変換（xrpToDrops, rippleTimeToISOTime など）
- Node.js（v18+推奨）・Webブラウザ（Chrome等）で動作

---

## クイックスタート

### 必要条件
- Node.js v18推奨（v20, v22もサポート）

### インストール
```bash
npm install --save xrpl
# または
yarn add xrpl
```

### サンプルコード
```typescript
const xrpl = require("xrpl");
async function main() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const response = await client.request({
    command: "account_info",
    account: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
    ledger_index: "validated",
  });
  console.log(response);

  await client.disconnect();
}
main();
```

より詳しい例は [CodeSandbox テンプレート](https://codesandbox.io/s/xrpl-intro-pxgdjr?file=/src/App.js) をご覧ください。

---

## ケース別セットアップ
- CDNでの利用
- create-react-app での利用
- React Native での利用
- Vite React での利用
- Deno での利用

---

## ドキュメント

開発時は以下2つのサイトが参考になります：
- [xrpl.org](https://xrpl.org/)（台帳の仕組み、トランザクションタイプ、APIリクエスト、チュートリアル等）
- [js.xrpl.org](https://js.xrpl.org/index.html)（このライブラリのリファレンス）

---

## サポート・コミュニティ
- XRPL Developer Discord の #javascript チャンネルで質問可能
- Issue作成も歓迎（3日以内に対応）
- 新バージョン通知は [xrpl-announce メーリングリスト](https://xrpl-announce) へ登録
- 本番利用時は rippled サーバー運用 & ripple-server メーリングリスト購読推奨

---

## 主要リンク
- [xrpl.js リファレンス](https://js.xrpl.org/index.html)
- [xrpl.org](https://xrpl.org/)（XRP Ledgerの詳細ドキュメント）
- [XRPL コードサンプル](https://xrpl.org/code-samples.html)
- [XRPL Developer Discord](https://discord.com/invite/xrp) #javascript
- [xrpl-announce メーリングリスト](https://xrpl-announce)
- [xrpl.js を使ったアプリ一覧](https://github.com/XRPLF/xrpl.js#applications-that-use-xrpljs)

---

本ドキュメントは公式リファレンス（[js.xrpl.org](https://js.xrpl.org/index.html)）を参考に作成しています。