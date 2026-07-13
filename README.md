# Outdoor eShop

登山・キャンプ向けアウトドア用品店の EC サンプルアプリです。
GitHub Copilot ハンズオンの教材として作られています。現状の機能は **商品一覧** と **全文検索** のみ。

追加機能実装や修正をエージェントに依頼させるハンズオンです。手順はコンテンツごとに分割し、
[`lab/`](./lab/README.md) にまとめています。

---

## 🚀 はじめに

本ワークショップは **GitHub Copilot App** で操作することを前提にしています。
まずは [ラボ目次](./lab/README.md) を開き、上から順番に進めてください。

| # | タイトル | 内容 |
| :-: | --- | --- |
| 00 | [概要とアプリの全体像](./lab/00-overview.md) | アプリ概要・技術スタック・構成・課題の使い分け |
| 01 | [セットアップ](./lab/01-setup.md) | ローカル（native / Docker）/ クラウド / Devcontainer |
| 02 | [課題A：商品詳細ページを作る](./lab/02-challenge-a-product-detail.md) | ローカル Agent Mode（画面を見ながら） |
| 03 | [課題B：検索の価格ソート／絞り込み](./lab/03-challenge-b-search-sort.md) | Coding Agent（Issue→PR・CI 検証） |
| 04 | [PR をローカルで検証する](./lab/04-review-and-verify-pr.md) | Coding Agent が作った PR の動作確認・承認 |

---

## ✅ 前提

| 項目 | 内容 |
| --- | --- |
| 操作環境 | GitHub Copilot App |
| 課題A（画面を見ながら実装） | ローカル実行（Node.js 20 または Docker Desktop） |
| 課題B（Issue / PR をクラウドに投げる） | GitHub ホスト環境（参加者PCに Node 等は不要・CI が検証） |

> バックエンドや外部クラウド（Azure 等）への依存はなし。**手元だけで完結**します。
> 詳しいセットアップ手順は [01. セットアップ](./lab/01-setup.md) を参照してください。

---

## 🧱 技術スタック

| 項目 | 採用技術 |
| --- | --- |
| フロントエンド | React 18 + TypeScript |
| ビルド/開発サーバー | Vite 6 |
| テスト | Vitest + Testing Library |
| 実行環境 | Node.js 20（Dev Container / Codespaces で固定） |

---

## 📝 ライセンス

MIT License. 学習・ワークショップ用途で自由にご利用ください。
商品画像は [mslearn-dotnet-cloudnative](https://github.com/MicrosoftDocs/mslearn-dotnet-cloudnative) のサンプル素材を利用しています。
