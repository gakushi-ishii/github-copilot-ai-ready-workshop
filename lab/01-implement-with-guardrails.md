# Lab 01: 機能実装でガードレールを体験する

**テーマ:** 依存追加を伴う機能実装で、ルール・手順・検証が連携する様子を見る

## シナリオ

Outdoor eShop に商品詳細ページへの**画面遷移（ルーティング）**を追加する。
React SPA でルーティングを実現するには新しいランタイム依存 `react-router-dom` が必要になる。
この「依存を追加する」場面で、リポジトリに仕込まれた役割分担が働く様子を確認する。

| 層 | 実体 | 役割 |
| --- | --- | --- |
| プロジェクトの前提 | `.github/copilot-instructions.md` | 実行環境・技術スタック・依存ルールを提示 |
| SDLC ルール | `AGENTS.md` | 作業ブランチ、Human-in-the-loop、Skill 起動条件を提示 |
| 実行手順 | `.github/skills/` | 依存追加と Git workflow の具体的な手順を実行 |
| 即時検証 | `.github/hooks/` | 依存・環境ファイル編集直後に自動チェック |
| Pull Request 時の検証 | `.github/workflows/ci.yml` | Lab 02 で `npm ci`、test、build を再確認 |

## 前提条件

- Lab 00 を完了していること。
- 開発サーバーが起動し、Browser Canvas で表示できること。

## 手順

### 1. 機能追加を依頼する
Agent の検証動作に衝突しないよう、一度 [Stop] ボタンから現在起動中の開発サーバーを停止する。
Plan モードに切り替えて、次を Copilot App に貼り付ける。

```text
商品カードから商品詳細ページ（/product/:id）へ遷移できるようにしたいです。
詳細ページへ遷移後は一覧へ戻れるようにする。
```

「ルーティングはどの方式で実装する計画にしますか？」という問いかけには「react-router-dom の追加」の回答を選択する。

「存在しない `/product/:id` にアクセスした場合は、どの挙動にしますか？」という問いかけには、「商品が見つからない旨と一覧へ戻るリンクを表示する」趣旨の回答を選択する。

> [!TIP]
>**Plan モードの活用**
>
> Plan モードではあいまいな要件を確認する動作になりやすい。
> そのため、ユーザーが要件や方針を認識し、理解をすり合わせ状態で実装に移ることが出来る。
> 仮に上記質問がなかった場合は、Plan Summary のフェーズで意図的に提案をする。

提案例
```text
ルーティングはreact-router-dom を使用する。
存在しない `/product/:id` にアクセスした場合は、商品が見つからない旨と一覧へ戻るリンクを表示する。
```

### 2. プランを確認して実装する

View full Plan から計画と方針を確認します。プランが次の内容を満たしているか確認する。

- 商品詳細ルートと、一覧へ戻る導線が含まれている。
- 新しい依存関係の追加と package-lock.json の同期が含まれている。
- 品質ゲート (npm test、npm build、画面遷移テスト) の実行が含まれている。

内容に合意したら、プランを承認し **Autopilot** で実装を進める。

> [!TIP]
>**Plan モード → Autopilot モードの活用**
>
> Autopilot は途中で確認を挟まず完了したら通知するフロー。
> 計画した todo タスクが完全に完了するまで自立的に動作する。
> その間、ユーザーは別のタスクに集中することができる。

**実装中の Agent の動作を確認する**

実装中は、Copilot App が必要に応じて次の処理を行う様子を確認する。

- `git-workflow` スキル、`add-dependency-safety` スキルが読み込まれる。
- `react-router-dom` が Node 20 / React 18 と互換であるか確認する。
- `npm install` で `package.json` と `package-lock.json` を同期する。
- 依存ファイルの編集後に Hook で不整合や環境互換性を確認する。
- 依存を採用した理由を `docs/decisions/` の ADR へ記録する。
- `npm test` と `npm run build` を実行する。
- Browser Canvas で画面遷移を確認する。

### 3. 実装結果を確認する

**期待する結果:**

- 商品カードから `/product/:id` へ遷移できる。
- 商品詳細ページから一覧へ戻れる。
- `react-router-dom` が `package.json` と `package-lock.json` に同期されている。
- `docs/decisions/` に依存判断の ADR が残っている。
- `npm test` と `npm run build` が成功している。
- 作業完了後、`git-workflow` が日本語のコミットメッセージ案を提示して承認を待つ。

### 4. コミット確認を Lab 02 へ引き渡す

コミットメッセージ案と次の選択肢が表示されたら、まだ選択せず Lab 02 を開く。

- `このメッセージでコミット`
- `メッセージを修正`
- `コミットしない`

> [!NOTE]
> コミット確認が表示されなかった場合だけ、次を貼り付ける。
>
> ```text
> git-workflow スキルに従って、現在の変更をコミットする準備をしてください。
> ```

## 期待する結果 / 残る成果物

- 自動生成された短命な作業ブランチ上のローカル変更。
- 商品詳細ルーティング。
- `react-router-dom` を含む同期済みの `package.json` / `package-lock.json`。
- `docs/decisions/` の依存判断 ADR。
- 人の承認を待つコミットメッセージ案。

> 実装が終わらない場合は
> [講師ガイド](./instructor-guide.md#lab-01-復旧) の recovery asset を使う。

## Optional: 裏側の仕組みを確認する

Lab 02 の完了後、興味があれば Quick Chat で次を確認する。

```text
Lab 01 の機能実装について、次を実際に残ったファイルや実行結果と対応付けて説明してください。
1. Instructions と AGENTS.md が伝えたルール。
2. add-dependency-safely と git-workflow Skills が実行した手順。
3. Hook と CI が検証した内容。
```

---

← [Lab 00](./00-setup-and-preflight.md) ・ 次へ → [Lab 02: Feature PR で main へ反映する](./02-feature-pr.md)
