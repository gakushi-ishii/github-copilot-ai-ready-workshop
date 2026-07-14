# Lab 02: Release PR で main へ反映する

**テーマ:** AI を使いながらも **チームの GitHub 運用ルール（コミット確認・PR レビュー）が守られる** ことを体験しながら、Lab 01 の変更を Pull Request としてリリースする

## シナリオ

Lab 01 の変更を Pull Request にして CI を通し、workshop fork の `main` へマージする。
ローカルで働いた依存ガードレールが、サーバー側の CI（`npm ci`）でも同じように効くことを確認する。

## 前提条件

- Lab 01 が完了し、`react-router-dom` が lockfile と同期されていること。
- Step 3 のデモ変更が残っていないこと。

## 手順

### 1. 差分を確認して検証する

```text
現在の差分を確認し、このラボと無関係な変更が含まれていないことを確認してください。
react-router-dom が package-lock.json と同期されていることも確認してください。
その後 npm test と npm run build を実行し、結果を報告してください。
```

### 2a. コミットする（承認フローを体験する）

次を Copilot App に貼り付ける。

```text
変更をコミットしてください。
```

Copilot App はコミット前に日本語のコミットメッセージ草案を提示し、次の選択肢を示す。

- `このメッセージでコミット`
- `メッセージを修正`
- `コミットしない`

**期待する結果:**
- コミットメッセージの草案が提示され、承認なしにコミットは進まない。
- `このメッセージでコミット` を選ぶとコミットが確定する。

> AI が自動でコミットするのではなく、人間が内容を確認して承認する点がポイント。

### 2b. Push して Copilot App UI から PR を作成する

次を Copilot App に貼り付ける。

```text
ブランチを Push してください。
```

Push 完了後、**Copilot App の UI**（画面右上の「Create a pull request」ボタン）から PR を作成する。

1. 「Create a pull request」ボタンをクリックする。
2. PR タイトル・本文を確認・編集する（変更概要、追加依存と ADR へのリンク、テスト結果を含める）。
3. 「Submit」（または「Create pull request」）ボタンで PR を送信する。

**期待する結果:**
- PR が作成され、CI（`npm ci` / `npm test` / `npm run build`）が自動で走る。

### 3. CI を確認して main へマージする

- PR の CI（`npm ci` / `npm test` / `npm run build`）が全て ✅ になっていることを確認する。

次を Copilot App に貼り付ける。

```text
この PR の CI チェックの状態を説明してください。npm ci が何を保証しているかも述べてください。
```

CI が成功したら、**Copilot App の UI** 上の「Merge pull request」ボタンを押して
**自分の workshop fork** の `main` へマージする。

**期待する結果:**
- CI が全て成功していることが確認される。
- `main` に変更がマージされ、商品詳細ルーティングと 3 層ガードレールが反映される。

## 期待する結果 / 残る成果物

- CI が成功した Release PR。
- `main` に商品詳細ルーティングと 3 層ガードレールが反映される。
- 次のラボで Cloud Agent が `main` のルールとガイドを読める状態になる。

> CI の `npm ci` は、lockfile と `package.json` が不整合だと失敗する。
> Lab 01 のガードレールが手元で防いだ事故を、CI が最終防波堤として再確認している。

---

← [Lab 01](./01-implement-with-guardrails.md) ・ 次へ → [Lab 03: 運用バグを Cloud Agent へ委託する](./03-delegate-bug-to-cloud-agent.md)
