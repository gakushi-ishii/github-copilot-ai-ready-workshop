# ADR 0001: react-router-dom の採用

## ステータス

採用済み

## 背景

商品詳細ページへの遷移を実装するにあたり、URL ベースのルーティングが必要になった。
`/product/:id` を実 URL として扱うことで、ブラウザの戻る操作・ブックマーク・共有と
自然に整合させることが目標である。

## 決定

**react-router-dom v7.18.1** を採用する。

- Node 20+ / React 18 と互換（`engines: >=20.0.0`、`peerDeps: react>=18`）
- `<BrowserRouter>` + `<Routes>` + `<Link>` の宣言的 API で簡潔に実装できる
- テストでは `<MemoryRouter>` を使い、実ブラウザ URL に依存しない

## 却下した代替案

| 案 | 却下理由 |
|---|---|
| 独自 hash ルーティング | 実装コストが高く、ブックマーク URL が不自然 |
| TanStack Router | ファイルベースルーティングはサンプル規模に過剰 |

## 影響

- バンドルサイズが約 +25 kB（gzip）増加する（許容範囲）
- `main.tsx` に `<BrowserRouter>` が必要。デプロイ時はサーバー側の SPA フォールバック設定が必要になる
