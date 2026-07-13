# 01. セットアップ

本ワークショップは **GitHub Copilot App** で操作することを前提にしています。
シナリオによって実行場所が異なります。

| シナリオ | 実行場所 | 依存関係 |
| --- | --- | --- |
| 課題A（詳細ページ・**画面を見ながら**実装） | ローカル（キャンバスで可視化） | 下記のローカル実行を参照 |
| 課題B（**Issue / PR をクラウドに投げる**） | GitHub ホスト環境 | 参加者PCに Node 等は不要（CI が検証） |

---

## ローカル実行（課題A用）— 2つの方式から選択

キャンバス / ブラウザで `http://localhost:5173/` を開いて確認します。
どちらの方式でも、GitHub Copilot App の Agent は**ホスト側のソースを編集**します。

### 方式1: ネイティブ実行（Node.js をそのまま使う）

Node.js 20 系がインストールされていることが前提です（`.node-version` に固定）。

```bash
npm install
npm run dev
```

- 👍 セットアップが最小・HMR が最速（App と同じホスト側で動くため境界がない）
- 👀 Node のバージョン差が心配な場合は方式2へ

### 方式2: ランタイム分離（Docker Desktop でコンテナ実行）

Node.js を各自の PC に入れずに、**実行環境だけをコンテナに隔離**します。
必要なのは **Docker Desktop** だけです。

```bash
docker compose up
```

- 👍 Node のバージョンや社内 npm プロキシに左右されない（環境を完全統一）
- 👍 コードはホスト側にあるので Agent の編集はそのまま反映（HMR はポーリングで担保）
- 📦 必要要件: Docker Desktop（Windows は WSL2 バックエンド）

> **どちらを選ぶ？** 手元の Node が新しめ（20系）なら **方式1**。
> バージョンや社内プロキシに不安があるなら **方式2** が確実です。

---

## クラウド実行（課題B用）

課題B（検索の価格ソート等）は、GitHub Copilot App から **Issue や PR をクラウドに投げて**
GitHub ホスト環境で自律的に実装させます。
**参加者PCに Node / 依存は不要**で、Pull Request の CI（`../.github/workflows/ci.yml`）が
テストとビルドを自動検証します。

---

## （任意）VS Code Dev Container / Codespaces

VS Code や Codespaces を使う場合は、同梱の `../.devcontainer/` により
コンテナを開くだけで `npm install` まで自動実行されます。

---

## 📜 コマンド

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動（ホットリロード） |
| `npm run build` | 型チェック + 本番ビルド |
| `npm test` | Vitest でテストを一度だけ実行 |
| `npm run test:watch` | テストをウォッチモードで実行 |
| `npm run preview` | ビルド成果物をプレビュー |

---

← [00. 概要](./00-overview.md) ・ 次へ → [02. 課題A：商品詳細ページ](./02-challenge-a-product-detail.md)
