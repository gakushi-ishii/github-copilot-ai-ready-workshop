# Git / GitHub エージェント運用ルール

このファイルは、AI エージェントによる Git / GitHub 操作の不変条件を定める。
実行環境・依存関係・品質ゲートは `.github/copilot-instructions.md`、具体的な実行手順は
`.github/skills/` を参照する。

## Git / GitHub 運用

- GitHub Flow を採用する。`main` を常にデプロイ可能な唯一の基準ブランチとし、変更は短命な作業ブランチで行い、Pull Request 経由でのみ `main` へ統合する。`main` へ直接 push しない。
- 作業する実行面で役割を分ける。開発フェーズの実装・修正は GitHub Copilot App のローカル worktree、運用フェーズのバグ修正は Issue にして Copilot Cloud Agent へ委託する。
- 作業ブランチは `feature/<実装内容>` とする。実装計画や依頼内容に基づいて変更する。詳細な手順は `.github/skills/git-workflow/SKILL.md` を参照。
- Pull Request を変更の唯一の統合点かつ証跡とする。base は `main` とし、CI によるサーバー側の再検証を通してから統合する。

## Human-in-the-loop

- GitHub Copilot App のローカル worktree では、コミットを作業の意図を残す証跡として扱う。
- コミット後は勝手に PR を作成せず、ユーザーの応答を待つ。
- Copilot Cloud Agent が作成したコミットと Pull Request は、Issue の受け入れ条件、差分、テスト、CI を人がレビューしてからマージを判断する。
- ユーザーの明示的な依頼なしに Pull Request のマージを行わない。
- force push、rebase、履歴の書き換え、その他の破壊的な Git 操作は、ユーザーの明示的な承認なしに行わない。

## Issue 対応

- バグ修正では、Issue の再現手順と期待結果を確認し、まず問題を再現するテストを追加する。
- Pull Request のレビューでは、受け入れ条件ごとに変更とテストを対応付ける。

## Skill の起動

- このハンズオンラボではユーザー固有の環境による予期せぬ動作を防ぐため、プロジェクト内のスキル、GitHub Copilot 標準スキル以外は使用しない。
- GitHub Copilot App のローカルワークツリーで実装計画の依頼 (Plan モード) やファイルの作成・編集・削除を伴う依頼では、最初の編集前に  `.github/skills/git-workflow/SKILL.md` を読み、その手順に従う。
- `package.json` / `package-lock.json` / `tsconfig*.json` の変更や依存追加を行う、実装計画時に依存追加を検討する際は、あわせて `.github/skills/add-dependency-safely/SKILL.md` に従う。
- 調査、レビュー、簡易的な質問・確認、読み取りだけの依頼では `git-workflow` を起動しない。

## ハンズオン教材の分離

- `lab/**` は受講者向け教材であり、実装、調査、計画、レビューの情報源として使用しない。サブエージェントへの委託も禁止する。
- 情報が不足する場合は `lab/**` から補完せず、ユーザーへ確認する。
- ユーザーが教材自体の編集またはレビューを明示的に依頼した場合のみ、指定されたファイルに限って参照できる。教材から得た情報をアプリケーション実装へ流用しない。
- この分離は preToolUse Hook（`.github/hooks/scripts/file-access-guard.mjs`）で機械的に強制する。
- 実習モード（既定）では `lab/**` の参照、`.env` の参照・変更、
  `.github/hooks/**` への書き込みを拒否する。モード切替は `.env` の
  `LAB_GUARD_MODE=edit` の有無で行い、エージェントからは切り替えられない。
  意図は「教材の答えを実装コンテキストへ注入させず、ガード自体も自己迂回させない」こと。
  詳細は README の「Lab 教材のコンテキスト注入ガード」を参照。