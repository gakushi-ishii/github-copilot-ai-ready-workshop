# Outdoor eShop ハンズオン ラボ

登山・キャンプ向けアウトドア用品店の EC サンプルアプリ「Outdoor eShop」を題材に、
GitHub Copilot App で **AI Ready な開発ライフサイクル**を体験するハンズオンです。

前提・ルールを伝える Instructions、実行手順を再利用する Skill、編集直後と
Pull Request で検証する Hook・CI がリポジトリに仕込まれています。

上から順番に進めてください。

## 📚 目次

| # | タイトル | 体験すること | 成果物 |
| :-: | --- | --- | --- |
| 00 | [GitHub Copilot App の基本的な使い方を学ぶ](./00-setup-and-preflight.md) | Project・Chats・Worktree・Setup・Run・Canvas | リポジトリプロジェクト・Copilot App の設定 |
| 01 | [機能実装でガードレールを体験する](./01-implement-with-guardrails.md) | 計画・依存追加・実装・インストラクション/Skill/Hook | ワークツリー・ファイル/依存変更・ADR/コミット証跡 |
| 02 | [PR 作成、レビューを加速する](./02-feature-pr.md) | Draft PR・CI・Copilot Review | PR・レビュー証跡 |
| 03 | [運用バグを Cloud Agent へ委託する](./03-delegate-bug-to-cloud-agent.md) | Canvas・Issue から Agent 委託 | Bug Issue・Cloud Agent PR |
| 04 | [Cloud Agent の PR をレビューする](./04-review-cloud-agent-pr.md) | Issue↔差分↔テスト↔CI の対応付け | Fix PR レビュー |

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
