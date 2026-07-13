# 03. 課題B：検索結果の価格ソート／絞り込みを追加する（Coding Agent 向き）

`src/lib/search.ts` に価格の並べ替え（昇順・降順）や価格帯フィルタを追加します。
`src/lib/search.test.ts` に受け入れ条件をテストとして書き、CI で検証します。

## なぜ Coding Agent（Issue→PR）か

受け入れ条件を **テストで表現でき、テストが通れば正しい** と言えるためです。
画面目視が不要なので、Issue を投げて非同期に任せられます。

> **使い分けの判断ルール**
> **受け入れ条件をテストで表現できる → Coding Agent（Issue→PR）**

## 前提

- [01. セットアップ](./01-setup.md) の「クラウド実行（課題B用）」を参照。
- **参加者PCに Node / 依存は不要**。Pull Request の CI（[`../.github/workflows/ci.yml`](../.github/workflows/ci.yml)）が
  テストとビルドを自動検証します。

## 進め方（例）

1. GitHub Copilot App から、価格ソート／絞り込みの追加を **Issue としてクラウドに投げます**。
2. Coding Agent が自律的に実装し、Pull Request を作成します。
3. PR の CI がテスト（`src/lib/search.test.ts`）とビルドを自動で検証します。
4. 作成された PR は、[04. Coding Agent の PR をローカルで検証する](./04-review-and-verify-pr.md) で動作確認・承認します。

## 実装の目安

- 価格の並べ替え（昇順・降順）。
- 価格帯フィルタ（絞り込み）。
- 受け入れ条件を `src/lib/search.test.ts` にテストとして記述する。

---

← [02. 課題A：商品詳細ページ](./02-challenge-a-product-detail.md) ・ 次へ → [04. PR をローカルで検証する](./04-review-and-verify-pr.md)
