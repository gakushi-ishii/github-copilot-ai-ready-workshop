# Outdoor eShop ハンズオン ラボ

登山・キャンプ向けアウトドア用品店の EC サンプルアプリ「Outdoor eShop」を題材に、
GitHub Copilot App で **AI Ready な開発ライフサイクル**を体験するハンズオンです。

依存関係・実行環境の事故を防ぐガードレール（Custom Instructions・Skill・Hook）が
リポジトリに仕込まれており、機能実装の中で実際に効く様子を確認します。

上から順番に進めてください。

## 📚 目次

| # | タイトル | 体験すること | 残る成果物 |
| :-: | --- | --- | --- |
| 00 | [プロジェクトを準備する](./00-setup-and-preflight.md) | Project・worktree・Setup・Run・Canvas | Copilot App セッション |
| 01 | [機能実装でガードレールを体験する](./01-implement-with-guardrails.md) | 調査・ルーティング実装・スキル発火・Hook 検証・発火デモ | ローカル変更・依存 ADR |
| 02 | [Release PR で main へ反映する](./02-release-pr.md) | 差分確認・テスト・PR・CI・マージ | Release PR |
| 03 | [運用バグを Cloud Agent へ委託する](./03-delegate-bug-to-cloud-agent.md) | バグ再現・Issue 起票・委託 | Bug Issue・稼働中の Cloud Agent |
| 04 | [新しいセッションへ引き継ぐ](./04-handoff-to-new-session.md) | 会話なしで前提を復元 | 引き継ぎ確認 |
| 05 | [Cloud Agent の PR をレビューする](./05-review-cloud-agent-pr.md) | Issue↔差分↔テスト↔CI の対応付け | Fix PR レビュー |

講師向けの進行・復旧・fallback は [講師ガイド](./instructor-guide.md) を参照してください。

## 🧱 仕込まれた 3 層ガードレール

| 層 | 実体 | 役割 |
| --- | --- | --- |
| 方針 | [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) | 実行環境・技術スタック・依存ルールを常時提示 |
| 手順 | [`.github/skills/add-dependency-safely/`](../.github/skills/add-dependency-safely/SKILL.md) | 依存追加の正しい手順を実行 |
| 機械検証 | [`.github/hooks/`](../.github/hooks/hooks.json) | 依存・環境ファイル編集後に自動チェック |

---

← [トップ README に戻る](../README.md)
