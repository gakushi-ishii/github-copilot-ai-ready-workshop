# Outdoor eShop

登山・キャンプ向けアウトドア用品店の EC サンプルアプリです。
GitHub Copilot ハンズオンの教材として作られています。現状の機能は **商品一覧** と **全文検索** のみ。

GitHub Copilot App で **AI Ready な開発ライフサイクル**を体験するハンズオンです。
リポジトリには、前提・ルールを伝える Instructions、実行手順を再利用する Skill、
編集直後と Pull Request で検証する Hook・CI が仕込まれています。
手順は [`lab/`](./lab/README.md) にまとめています。

---

## 🚀 はじめに

本ワークショップは **GitHub Copilot App** で操作することを前提にしています。
まずは [ラボ目次](./lab/README.md) を開き、上から順番に進めてください（本編の目安は 90 分）。

| # | タイトル | 体験すること |
| :-: | --- | --- |
| 00 | [GitHub Copilot App の基本的な使い方を学ぶ](./lab/00-setup-and-preflight.md) | Project・Chats・Worktree・Setup・Run・Canvas |
| 01 | [機能実装でガードレールを体験する](./lab/01-implement-with-guardrails.md) | ルーティング実装・依存 Skill・Hook・ADR |
| 02 | [Feature PR で main へ反映する](./lab/02-feature-pr.md) | コミット承認・Draft PR 確認・CI・マージ |
| 03 | [運用バグを Cloud Agent へ委託する](./lab/03-delegate-bug-to-cloud-agent.md) | バグ再現・Issue 起票・委託 |
| 04 | [Cloud Agent の PR をレビューする](./lab/04-review-cloud-agent-pr.md) | Issue↔差分↔テスト↔CI の対応付け |

---

## ✅ 前提

| 項目 | 内容 |
| --- | --- |
| 操作環境 | GitHub Copilot App |
| ローカル実装・検証（Lab 00〜02） | Node.js 20 と npm |
| Cloud Agent 委託（Lab 03, 04） | GitHub ホスト環境（参加者の PC に Node.js は不要） |

> バックエンドや Azure などの外部サービスへの依存はありません。
> 通常は Copilot App が npm で起動します。Docker / Dev Container の予備手順は
> [講師ガイド](./lab/instructor-guide.md#lab-00-復旧) を参照してください。

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
| 実行環境 | Node.js 20（Dev Container / Codespaces で固定） |

| 層 | 実体 | 役割 |
| --- | --- | --- |
| プロジェクトの前提 | [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) | 実行環境・技術スタック・依存ルールを常時提示 |
| SDLC ルール | [`AGENTS.md`](./AGENTS.md) | ブランチ、Human-in-the-loop、Skill の起動条件を提示 |
| 実行手順 | [`.github/skills/`](./.github/skills/) | 依存追加と Git workflow の再利用可能な手順を実行 |
| 即時検証 | [`.github/hooks/`](./.github/hooks/hooks.json) | 依存・環境ファイル編集後に自動チェック |
| Pull Request 検証 | [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | `npm ci`、test、build をサーバー側で再確認 |

### Lab 教材のコンテキスト注入ガード（`LAB_GUARD_MODE`）

`lab/**` は受講者向け教材であり、実装・調査・レビューの情報源として使うと
答えが漏れてしまいます。これを防ぐため、既定では preToolUse Hook
（`lab-access-guard`）がエージェントによる `lab/**` の参照をブロックし、教材が
実装コンテキストへ注入されないようにしています。

Lab 教材そのものを編集したい場合や、意図的に教材をコンテキストへ追加したい場合に
限り、環境変数 `LAB_GUARD_MODE=edit` を設定して Copilot CLI を起動すると、この
ガードを切り替えられます。

- `LAB_GUARD_MODE=edit` … 教材編集モード。`lab/**` の参照を許可します。
- 未設定 または `LAB_GUARD_MODE=practice` … 通常の実習モード。従来どおり参照をブロックします。

この切替は **CLI を起動する人間** が設定する運用を前提とします。Hook は CLI
プロセスが起動するため、エージェントがセッション内のシェルで環境変数を変更しても
切り替わらず、ガードを自己迂回できません。教材から得た情報を本番実装へ流用しない
ポリシーは、モードに関わらず維持してください。

---

## 📝 ライセンス

MIT License. 学習・ワークショップ用途で自由にご利用ください。
商品画像は [mslearn-dotnet-cloudnative](https://github.com/MicrosoftDocs/mslearn-dotnet-cloudnative) のサンプル素材を利用しています。
