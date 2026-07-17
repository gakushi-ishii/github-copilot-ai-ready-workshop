# 講師ガイド

受講者向けのラボ本文には載せない、進行・復旧・fallback の情報をまとめる。

## タイムライン（本編 90 分）

| 時間 | ラボ | 合流ポイントで確認すること |
| --- | --- | --- |
| 0〜8分 | Lab 00 | 全員が New worktree セッションを作成し、Run/Canvas を確認できたか |
| 8〜40分 | Lab 01 | 依存関係が同期され、実装後のコミット案が承認待ちになっているか |
| 40〜52分 | Lab 02 | PR の CI が成功し、Copilot Review が完了したか |
| 52〜64分 | Lab 03 | Bug Issue が作成され Cloud Agent に委託されたか |
| 64〜90分 | Lab 04 | Cloud Agent PR を受け入れ条件と実際の動作が確認できたか |

合流ポイント: 8, 40, 52, 64 分。

## AI Ready な役割分担（仕込み済み）

- `.github/copilot-instructions.md` — プロジェクトの前提（実行環境・技術スタック・依存ルール）
- `AGENTS.md` — SDLC ルール（GitHub Flow・Human-in-the-loop・Issue 対応・Skill 起動条件）
- `.github/skills/` — 実行手順（依存追加・ローカル Git workflow）
- `.github/hooks/hooks.json` + `scripts/dependency-guard.mjs` — 即時検証（lockfile 同期・環境互換・型チェック）
- `.github/workflows/ci.yml` — Pull Request 検証（`npm ci`・test・build）

Hook は `package.json` / `package-lock.json` / `tsconfig*.json` が dirty のときだけ発火する。
Windows では `powershell` エントリから `node` で実行される。追加の npm 依存はない。

## Lab 00 復旧

- Setup スクリプトが失敗する場合は、セッションの Terminal で手動 `npm ci` を実行する。
- Run でポート 5173 が開かない場合は、既存の dev サーバーを停止してから再度 Run する。

## Lab 01 復旧

- 実装が時間内に終わらない場合は、講師が用意した**商品詳細ルーティング完成 recovery ブランチ**を pull して Lab 02 へ進める。
- コミット確認が表示されない場合だけ、「git-workflow スキルに従って、現在の変更をコミットする準備をしてください」と指示する。
- Hook の発火を明示的に見せたい場合は、Terminal で次を実行する。

  ```text
  !node .github/hooks/scripts/dependency-guard.mjs
  ```

  監視対象ファイルが dirty のときだけ結果が出る。

## Lab 02 復旧

- Create draft PR が表示されない場合は、コミットが作成済みであることと、現在のセッションが GitHub リポジトリへ接続されていることを確認する。
- App UI が生成した Draft PR のタイトル・本文が差分に合わない場合は、人が修正する。
- PR 作成時に CI が発火しない場合は Lab 02 の前提条件を確認する。
- CI が `npm ci` で失敗する場合、lockfile 未同期の可能性が高いので、再度ローカルセッションで確認を依頼する。
- Feature PR が進まない場合は、recovery ブランチから PR を作る。

## Lab 03: 復旧

- Issue が表示されない場合は Lab 03 の前提条件を確認する。
- バグが確認できなかった場合は recovery ブランチを使用する。

## Lab 04: 復旧

- Cloud Agent が作成した PR で CI が発火しない場合は、Web UI (github.com) から CI の実行を承認する。