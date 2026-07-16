# Lab 02: PR 作成、レビューを加速する

**テーマ:** Main へのマージに機械的な品質ゲートと人の確認フローを組みこむ。

## シナリオ

- GitHub Copilot App では PR の自動作成や Auto マージが可能だが、認識負債・齟齬を考慮して、本ラボではこれらは実施しない。
- エージェントにはドラフト案だけを作成させ、PR タイトル・本文をを人が確認する手順を踏む。
- 依存ガードレールやテスト、型チェック・ビルド検証といったゲートを、サーバー側の CI に組み込むことで、機械的に品質を担保する。

## 前提条件

- Lab 01 の実装・検証とコミットが完了していること。
- GitHub Actions が利用できる。
  1. フォークしたリポジトリから、**[Actions]** タブを開く。
  2. **I understand my workflows, go ahead and enable them** を押す。
  ![フォークリポジトリで Actions を有効化する](./images/02-enable-workflows-in-fork-epository.png)

## 手順

### 1. Create draft PR でタイトルと本文を確認する

コミット完了後、GitHub Copilot App UI の **Create draft PR** を選ぶ。

![Create draft PR を選択する](./images/02-create-draft-pr.png)

> [!Tip]
> - **Agent merge**：PR 作成からマージまで全自動でエージェントが代行。
> - **Create PR**：レビュー可能な PR を作成。
> - **Create draft PR**：PR ドラフトで作成。本ラボではこれを扱う。

参考：[GitHub Copilot アプリを使用した問題と pull request の管理](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)

Draft PR が作成されたら、Web からフォークしたリポジトリを開き、**[Pull Requests]** の内容を確認する。

- 自身のフォークリポジトリであることを確認する。
- base ブランチが `main` であることを確認する。
- タイトルが本実装とマッチしているか、本文に背景や変更内容、検証内容等が含まれているか確認する。
- CI が自動で走り、ワークフローが正常に完了しているかを確認する。
- コンフリクトが発生していないか確認する。

![CI の発火](./images/02-ci-buil-test.png)

### 2. Cloud Agent にレビューを依頼する

PR 内容を確認したら、**Ready for review** から
PR の **Reviewers** から Copilot にレビューを **Request** する。

![Copilot Review](./images/02-reviewers-request.png)

Copilot がコードレビューを開始すると、**View session** が表示される。**View session** では Cloud Agent が実際にレビューをしているセッションを確認できる。

レビュー結果には PR の概要と変更箇所、レビューしたファイル一覧が含まれる。変更提案を確認し、採用を検討する。

> [!Note]
> **Commit Suggestion** で変更提案を承認すると、再度 CI が発火し、品質チェックを行う。

※ レビューの提案は以降のラボに影響がないため、一旦全て Apply して先に進めてよい。

### 3. main へマージする

CI と Draft Pull Request の内容を確認したら Ready for review に変更する。
その後、**Copilot App の UI** 上の「Merge pull request」ボタンを押して自分のフォークリポジトリの `main` へマージする。

## 期待する結果

- 人が確認したタイトルと本文を持つ PR を作成する。
- `main` に商品詳細ルーティングと AI Ready なルール・手順・検証が反映される。
- サーバー側の CI が走り、品質チェックを行う。

---

← [Lab 01](./01-implement-with-guardrails.md) ・ 次へ → [Lab 03: 運用バグを Cloud Agent へ委託する](./03-delegate-bug-to-cloud-agent.md)
