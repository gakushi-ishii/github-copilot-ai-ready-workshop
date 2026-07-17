# Outdoor eShop ハンズオン ラボ

登山・キャンプ向けアウトドア用品店の EC サンプルアプリ「Outdoor eShop」を題材に、GitHub Copilot App で **AI Ready な開発ライフサイクル**を体験するハンズオン。

## コンテンツ作成の背景
コーディングエージェントの進化により、開発チームは人の数十倍もの速さでコードが生成できるようになった。

しかし、生成のスピード感が高まったことで、レビュー負荷が爆発的に増えたり、人の認識・理解が間に合わず、メンバー間のミスコミュニケーションが発生する、といったことが起りえる。

本ハンズオンラボでは、このような背景を踏まえて大きく以下 3 点を目的として作成した。

- プロジェクトの前提や開発プロセスにおけるチーム規約、再現性のある手順をドキュメントとして残こすことで、AI エージェントをチームメンバーの一員として向かい入れるための**一種の方法**を学ぶ。
- 既存 SDLC のプロセスを加速させる、様々な手法を知ることで、組織としてエージェントを導入したことによる効果が測定できるような、**新しいライフサイクル構築を検討するきっかけ**となる。
- AI の爆発的な生成力によって発生する認識負債を返済する (ADR、コミットメッセージ、Issue、PR という証跡) **一種の方法**を学ぶ。

※ 本ラボで紹介した手法は一例であり、ハンズオンラボの性質上、過剰設計な個所もあるため、そのまま採用しないことを勧める。

各人の AI スキルに依存せず、開発に携わるメンバーが同様にエージェントの効果を最大限発揮できるよう、リポジトリ自体がコンテキストとガードレールを持つ状態を「AI Ready」と呼ぶ。

## 📚 目次

| # | タイトル | 体験すること | 成果物 |
| :-: | --- | --- | --- |
| 00 | [GitHub Copilot App の基本的な使い方を学ぶ](./00-setup-and-preflight.md) | Project・Chats・Worktree・Setup・Run・Canvas | リポジトリプロジェクト・Copilot App の設定 |
| 01 | [機能実装でガードレールを体験する](./01-implement-with-guardrails.md) | 計画・依存追加・実装・インストラクション/Skill/Hook | ワークツリー・ファイル/依存変更・ADR/コミット証跡 |
| 02 | [PR 作成、レビューを加速する](./02-feature-pr.md) | Draft PR・CI・Copilot Review | PR・レビュー証跡 |
| 03 | [運用バグを Cloud Agent へ委託する](./03-delegate-bug-to-cloud-agent.md) | Issue から Agent 委託・Cloud Agent・PR 管理 | Bug Issue・Cloud Agent PR |
| 04 | [Cloud Agent の実装内容を確認する](./04-review-cloud-agent-pr.md) | PR 管理、ローカル動作検証・受入テスト | main マージ |

講師向けの進行・復旧・fallback は [講師ガイド](./instructor-guide.md) を参照してください。

## 🧱 AI Ready な役割分担

| 層 | 実体 | 役割 |
| --- | --- | --- |
| プロジェクトの前提 | [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) | 実行環境・技術スタック・依存ルールを常時提示 |
| SDLC ルール | [`AGENTS.md`](../AGENTS.md) | GitHub Flow、Human-in-the-loop、Issue 対応、Skill の起動条件を提示 |
| 実行手順 | [`.github/skills/`](../.github/skills/) | 依存追加と Git workflow の手順を実行 |
| 即時検証 | [`.github/hooks/`](../.github/hooks/hooks.json) | 依存・環境ファイル編集後に自動チェック |
| Pull Request 検証 | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | `npm ci`、test、build をサーバー側で再確認 |

---

← [トップ README に戻る](../README.md)
