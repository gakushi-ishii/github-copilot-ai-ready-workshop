# GitHub Copilot App ハンズオンラボ

GitHub Copilot App で **AI Ready な開発ライフサイクル**を体験するハンズオンです。

リポジトリには、プロジェクトの前提やコーディング規約、チームの開発運用ルールを伝えるインストラクション、再現性のある実行手順を提示する Skills、依存関係の破壊やファイル編集・読み取りを防ぐ Hook、品質保証の CI が仕込まれています。

サンプルアプリは登山・キャンプ向けアウトドア用品店の EC サイトで、現状の機能は **商品一覧** と **全文検索** のみ。

手順は [`lab/`](./lab/README.md) にまとめています。

---

## 🚀 はじめに

本ワークショップは **GitHub Copilot App** で操作することを前提にしています。
まずは [ラボ目次](./lab/README.md) を開き、上から順番に進めてください（本編の目安は 90 分）。

| # | タイトル | 体験すること |
| :-: | --- | --- |
| 00 | [GitHub Copilot App の基本的な使い方を学ぶ](./lab/00-setup-and-preflight.md) | Project・Chats・Worktree・Setup・Run・Canvas |
| 01 | [機能実装でガードレールを体験する](./lab/01-implement-with-guardrails.md) | 計画・依存追加・実装・インストラクション/Skill/Hook |
| 02 | [PR 作成、レビューを加速する](./lab/02-feature-pr.md) | Draft PR・CI・Copilot Review |
| 03 | [運用バグを Cloud Agent へ委託する](./lab/03-delegate-bug-to-cloud-agent.md) | Issue から Agent 委託・Cloud Agent・PR 管理 |
| 04 | [Cloud Agent の実装内容を確認する](./lab/04-review-cloud-agent-pr.md) | PR 管理、ローカル動作検証・受入テスト |

---

## ✅ 前提

| 項目 | 内容 |
| --- | --- |
| 操作環境 | GitHub Copilot App |
| ローカル実装・検証（Lab 00〜02） | Node.js 20 以上 と npm |
| Cloud Agent 委託（Lab 03, 04） | GitHub ホスト環境（参加者の PC に Node.js は不要） |

> バックエンドや Azure などの外部サービスへの依存はありません。

### npm レジストリの事前確認

このリポジトリでは、利用環境ごとのネットワーク要件に対応できるよう、プロジェクトの
`.npmrc` でレジストリを固定していません。

- 公開 npm レジストリへ直接アクセスできる環境では、npm の既定値を使用します。
- 直接アクセスが許可されない環境では、組織が指定するレジストリをユーザーまたは
  マシン単位で設定してください。
- 組織固有のレジストリ URL や認証情報は、リポジトリの `.npmrc` に追加しないでください。

---

## 🧱 技術スタックと AI Ready な役割分担

| 項目 | 採用技術 |
| --- | --- |
| フロントエンド | React 18 + TypeScript |
| ビルド/開発サーバー | Vite 6 |
| テスト | Vitest + Testing Library |
| 実行環境 | Node.js 20 以上 |

| 層 | 実体 | 役割 |
| --- | --- | --- |
| プロジェクトの前提 | [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) | 実行環境・技術スタック・依存ルールを常時提示 |
| SDLC ルール | [`AGENTS.md`](./AGENTS.md) | GitHub Flow、Human-in-the-loop、Issue 対応、Skill の起動条件を提示 |
| 実行手順 | [`.github/skills/`](./.github/skills/) | 依存追加と Git workflow の再利用可能な手順を実行 |
| 即時検証 | [`.github/hooks/`](./.github/hooks/hooks.json) | 依存・環境ファイル編集後に自動チェック |
| Pull Request 検証 | [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | `npm ci`、test、build をサーバー側で再確認 |

※本ハンズオンラボでは、実行環境によって予期せぬ動作となることを防ぐため、プロジェクト内のスキル、GitHub Copilot 標準スキル以外は使用しない方針としています。

### 特定ファイルのアクセスガード（`LAB_GUARD_MODE`）

一部のファイルは、エージェントに参照・変更されると不都合が生じます。これを防ぐため、
preToolUse Hook（`file-access-guard`）がエージェントのファイル操作を制御します。
既定（実習モード）では次を拒否します。

- `lab/**` の参照（受講者向け教材のため、実装コンテキストへの注入を防止）
- `.env` の参照・変更（エージェントによるモード切替ファイルそのものの保護）
- `.github/hooks/**` への書き込み（ガード定義の無効化を防止。読み取りは可能）

モードは `.env` の `LAB_GUARD_MODE` で切り替えます。
Hook スクリプトが実行時に `.env` を機械的に読み、決定論で以下を判断します。

- `LAB_GUARD_MODE=edit` … 編集モード。上記ガードを全解除します。
- それ以外 (未設定 / コメントアウト) … 通常の実習モード。従来どおりブロックします。

保護対象のファイルを編集したい場合は、`.env.sample` を `.env` にコピーして
`LAB_GUARD_MODE=edit` の行のコメントを外します。


---

## 📝 ライセンス

MIT License. 学習・ワークショップ用途で自由にご利用ください。
商品画像は [mslearn-dotnet-cloudnative](https://github.com/MicrosoftDocs/mslearn-dotnet-cloudnative) のサンプル素材を利用しています。
