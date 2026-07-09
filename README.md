# Outdoor eShop — GitHub Copilot ワークショップ用サンプル

登山・キャンプ向けアウトドア用品店の EC サンプルアプリです。
**「既存の SDLC から Agentic DevOps へ」** を体験する GitHub Copilot ハンズオンの教材として作られています。

現状の機能は **商品一覧** と **全文検索** のみ。
ワークショップでは、ここに機能を「エージェントに実装させて」いきます（後述の [ワークショップ課題](#-ワークショップ課題) を参照）。

---

## 🧱 技術スタック

| 項目 | 採用技術 |
| --- | --- |
| フロントエンド | React 18 + TypeScript |
| ビルド/開発サーバー | Vite 6 |
| テスト | Vitest + Testing Library |
| 実行環境 | Node.js 20（Dev Container / Codespaces で固定） |

> バックエンドや外部クラウド（Azure 等）への依存はありません。**手元だけで完結**します。

---

## 🚀 セットアップ

本ワークショップは **GitHub Copilot App** で操作することを前提にしています。
シナリオによって実行場所が異なります。

| シナリオ | 実行場所 | 依存関係 |
| --- | --- | --- |
| 課題A（詳細ページ・**画面を見ながら**実装） | ローカル（キャンバスで可視化） | 下記のローカル実行を参照 |
| 課題B（**Issue / PR をクラウドに投げる**） | GitHub ホスト環境 | 参加者PCに Node 等は不要（CI が検証） |

---

### ローカル実行（課題A用）— 2つの方式から選択

キャンバス / ブラウザで `http://localhost:5173/` を開いて確認します。
どちらの方式でも、GitHub Copilot App の Agent は**ホスト側のソースを編集**します。

#### 方式1: ネイティブ実行（Node.js をそのまま使う）

Node.js 20 系がインストールされていることが前提です（`.node-version` に固定）。

```bash
npm install
npm run dev
```

- 👍 セットアップが最小・HMR が最速（App と同じホスト側で動くため境界がない）
- 👀 Node のバージョン差が心配な場合は方式2へ

#### 方式2: ランタイム分離（Docker Desktop でコンテナ実行）

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

### クラウド実行（課題B用）

課題B（検索の価格ソート等）は、GitHub Copilot App から **Issue や PR をクラウドに投げて**
GitHub ホスト環境で自律的に実装させます。
**参加者PCに Node / 依存は不要**で、Pull Request の CI（`.github/workflows/ci.yml`）が
テストとビルドを自動検証します。

---

### （任意）VS Code Dev Container / Codespaces

VS Code や Codespaces を使う場合は、同梱の `.devcontainer/` により
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

## 📁 ディレクトリ構成

```
src/
├── components/
│   ├── Header.tsx        # ヘッダー（店名・商品数）
│   ├── SearchBar.tsx     # 検索ボックス
│   ├── ProductGrid.tsx   # 商品グリッド
│   └── ProductCard.tsx   # 商品カード
├── data/
│   └── products.ts       # サンプル商品データ（9商品）
├── lib/
│   ├── search.ts         # 全文検索ロジック（純粋関数）
│   └── search.test.ts    # 検索ロジックのテスト
├── types.ts              # Product 型
├── App.tsx               # 画面全体の組み立て
└── main.tsx              # エントリポイント
public/
└── images/               # 商品画像（product1〜9.png）
```

---

## 🎓 ワークショップ課題

このアプリには **あえて実装していない機能** が2つあります。
GitHub Copilot の異なる使い方で、それぞれを実装してみましょう。

### 課題A：商品詳細ページを作る（ローカル Agent Mode 向き）

商品カードをクリックすると詳細ページ（`/product/:id`）に遷移し、
大きな画像・商品名・説明・価格を表示する機能を追加します。

- **なぜローカル Agent Mode か**：レイアウトや画面遷移は
  **ブラウザで見ないと正解が分からない**ため。
  `npm run dev` で表示を見ながら、その場で修正する同期的なループが向いています。

### 課題B：検索結果の価格ソート／絞り込みを追加する（Coding Agent 向き）

`src/lib/search.ts` に価格の並べ替え（昇順・降順）や価格帯フィルタを追加します。
`search.test.ts` に受け入れ条件をテストとして書き、CI で検証します。

- **なぜ Coding Agent（Issue→PR）か**：受け入れ条件を
  **テストで表現でき、テストが通れば正しい**と言えるため。
  画面目視が不要なので、Issue を投げて非同期に任せられます。

### 🧭 使い分けの判断ルール

> **受け入れ条件をテストで表現できる → Coding Agent（Issue→PR）**
> **目で見て確かめたい → ローカル Agent Mode → Push**

---

## 🔍 Coding Agent が作った PR をローカルで検証する

課題Bで Coding Agent が作成した PR は、マージ前に手元で動作確認できます。

```bash
# PR ブランチを取得
gh pr checkout <PR番号>

# 依存インストール & 起動して確認
npm install
npm run dev

# テストを実行
npm test

# 問題なければ承認（直したい場合は PR にコメントで追加指示）
gh pr review <PR番号> --approve
```

---

## 📝 ライセンス

MIT License. 学習・ワークショップ用途で自由にご利用ください。
商品画像は [mslearn-dotnet-cloudnative](https://github.com/MicrosoftDocs/mslearn-dotnet-cloudnative) のサンプル素材を利用しています。
