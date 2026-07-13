# 00. 概要とアプリの全体像

Outdoor eShop は、登山・キャンプ向けアウトドア用品店の EC サンプルアプリです。
GitHub Copilot ハンズオンの教材として作られており、現状の機能は **商品一覧** と **全文検索** のみです。

このハンズオンでは、**あえて実装していない機能**をエージェントに実装させ、
GitHub Copilot の異なる使い方（ローカル Agent Mode と Coding Agent）を体験します。

> バックエンドや外部クラウド（Azure 等）への依存はなし。**手元だけで完結**します。

---

## 🧱 技術スタック

| 項目 | 採用技術 |
| --- | --- |
| フロントエンド | React 18 + TypeScript |
| ビルド/開発サーバー | Vite 6 |
| テスト | Vitest + Testing Library |
| 実行環境 | Node.js 20（Dev Container / Codespaces で固定） |

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

## 🎓 ワークショップ課題の全体像

このアプリには **あえて実装していない機能** が 2 つあります。
GitHub Copilot の異なる使い方で、それぞれを実装します。

| 課題 | 内容 | 向いている使い方 | ドキュメント |
| --- | --- | --- | --- |
| 課題A | 商品詳細ページを作る | ローカル Agent Mode（画面を見ながら） | [02-challenge-a-product-detail.md](./02-challenge-a-product-detail.md) |
| 課題B | 検索結果の価格ソート／絞り込みを追加 | Coding Agent（Issue→PR） | [03-challenge-b-search-sort.md](./03-challenge-b-search-sort.md) |

### 🧭 使い分けの判断ルール

> **受け入れ条件をテストで表現できる → Coding Agent（Issue→PR）**
> **目で見て確かめたい → ローカル Agent Mode → Push**

- **課題A（商品詳細ページ）**：レイアウトや画面遷移は**ブラウザで見ないと正解が分からない**ため、
  `npm run dev` で表示を見ながらその場で修正する同期的なループが向いています。
- **課題B（価格ソート）**：受け入れ条件を**テストで表現でき、テストが通れば正しい**と言えるため、
  画面目視が不要で、Issue を投げて非同期に任せられます。

---

← [ラボ目次](./README.md) ・ 次へ → [01. セットアップ](./01-setup.md)
