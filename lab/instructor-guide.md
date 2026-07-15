# 講師ガイド

受講者向けのラボ本文には載せない、進行・復旧・fallback の情報をまとめる。

## タイムライン（本編 90 分）

| 時間 | ラボ | 合流ポイントで確認すること |
| --- | --- | --- |
| 0〜8分 | Lab 00 | 全員が New worktree セッションを作成し、Run/Canvas を確認できたか |
| 8〜40分 | Lab 01 | 依存関係が同期され、実装後のコミット案が承認待ちになっているか |
| 40〜52分 | Lab 02 | コミットと Draft PR を人が確認し、Feature PR の CI が成功したか |
| 52〜64分 | Lab 03 | Bug Issue が作成され Cloud Agent に委託されたか |
| 64〜90分 | Lab 04 | Cloud Agent PR を受け入れ条件と対応付けてレビューできたか |

合流ポイント: 8, 40, 52, 64 分。

## AI Ready な役割分担（仕込み済み）

- `.github/copilot-instructions.md` — プロジェクトの前提（実行環境・技術スタック・依存ルール）
- `AGENTS.md` — SDLC ルール（作業ブランチ・Human-in-the-loop・Skill 起動条件）
- `.github/skills/` — 実行手順（依存追加・ローカル Git workflow）
- `.github/hooks/hooks.json` + `scripts/dependency-guard.mjs` — 即時検証（lockfile 同期・環境互換・型チェック）
- `.github/workflows/ci.yml` — Pull Request 検証（`npm ci`・test・build）

Hook は `package.json` / `package-lock.json` / `tsconfig*.json` が dirty のときだけ発火する。
Windows では `powershell` エントリから `node` で実行される。追加の npm 依存はない。

## Lab 00 復旧

- Setup スクリプトが失敗する場合は、セッションの Terminal で手動 `npm ci` を実行する。
- Run でポート 5173 が開かない場合は、既存の dev サーバーを停止してから再度 Run する。
- Node.js が使えない参加者は、Dev Container / Codespaces、または `docker compose up` を案内する。

## Lab 01 復旧

- 実装が時間内に終わらない場合は、講師が用意した**商品詳細ルーティング完成 recovery ブランチ**を
  pull して Lab 02 へ進める。
- スキルが自動起動しない場合は、`/agent` や明示的な指示（「add-dependency-safely スキルに従って」）で促す。
- Hook の発火を明示的に見せたい場合は、Terminal で次を実行する。

  ```text
  !node .github/hooks/scripts/dependency-guard.mjs
  ```

  監視対象ファイルが dirty のときだけ結果が出る。

## Lab 02 復旧

- Lab 01 完了時にコミット確認が表示されない場合だけ、
  「git-workflow スキルに従って、現在の変更をコミットする準備をしてください」と指示する。
- Create draft PR が表示されない場合は、コミットが作成済みであることと、
  現在のセッションが GitHub リポジトリへ接続されていることを確認する。
- App UI が生成した Draft PR のタイトル・本文が差分に合わない場合は、人が修正する。
- CI が `npm ci` で失敗する場合、lockfile 未同期の可能性が高い。`npm install` で同期させて再 Push。
- Feature PR が進まない場合は、guardrail 入りの recovery ブランチから PR を作る。

## Lab 03〜04: Cloud Agent の変動対策

- Cloud Agent は完了までに時間がかかる。PR が作成されるまで待ってから Lab 04 に進む。
- <a id="lab-04-fallback"></a>**Lab 04 fallback:** Cloud Agent が時間内に完了しない、または利用できない場合は、
  同じ Issue と受け入れ条件から作成した**共有 fallback PR**をレビュー対象にする。
  fallback PR には、あえて 1 点だけ受け入れ条件を満たさない箇所（例: 全角スペース未対応）を残しておくと、
  レビューで修正依頼を出す練習になる。

## 事前に用意しておくもの

- 商品詳細ルーティング完成 recovery ブランチ（Lab 01 fallback）
- guardrail 入り recovery ブランチ（Lab 02 fallback）
- 共有 fallback Cloud Agent PR（Lab 04 fallback）
