# Lab 03: 運用バグを Cloud Agent へ委託する

**テーマ:** 運用フェーズで見つかったバグを Issue にし、Cloud Agent に修正を委託する

## シナリオ

リリース後、利用者から「複数キーワードで検索すると 0 件になる」という報告が届いた。
`キャンプ テント` のようにスペース区切りで検索すると、商品名に両方の語が含まれていても
ヒットしない。このバグを Issue 化し、GitHub Copilot App から Cloud Agent へ委託する。

これは既存 SDLC への AI 組み込み例。開発フェーズ（Lab 01）はローカル Agent、
運用フェーズのバグ修正は Cloud Agent という使い分けを体験する。

## 前提条件

- Lab 02 で `main` に変更がマージされていること。
- リポジトリで GitHub Issues と Copilot Cloud Agent が利用できること。

## 手順

### 1. バグを再現する

Browser Canvas で検索ボックスに `キャンプ テント`（半角スペース）と入力し、
0 件になることを確認する。全角スペース `キャンプ　テント` でも同様。

### 2. Issue を作成する

```text
内容:
- 概要: 複数キーワードをスペース区切りで検索すると 0 件になる
- 再現手順: 検索ボックスに「キャンプ テント」と入力する
- 実際の結果: 該当商品があるのに 0 件になる
- 期待する結果: すべてのキーワードを含む商品が表示される
- 受け入れ条件:
  - 半角・全角スペース区切りの複数キーワードを AND 条件で扱う
  - 連続スペースと前後スペースを無視する
  - 空検索・単一キーワードの既存動作を維持する
  - 元の商品配列を変更しない
  - src/lib/search.test.ts に再現ケースと回帰テストを追加する
```

### 2. Cloud Agent の実装を依頼する

作成した Issue に Copilot をアサインすると、cloud agent に作業を開始し、やがて PR を作成する。
PR が作成されたら、次の [Lab 04](./04-review-cloud-agent-pr.md) でレビューする。

## 本ラボで期待する結果

- Issue に Copilot をアサインできる。
- Copilot をアサインすると実装から PR 作成まで一気通貫で Cloud Agent が作業する。

> Cloud Agent は `main` の Instructions、AGENTS、Skills と Issue を読んで作業する。
> Cloud Agent のコミットと Pull Request はプラットフォームが管理し、人は Lab 04 でレビューをする。

---

← [Lab 02](./02-feature-pr.md) ・ 次へ → [Lab 04: Cloud Agent の PR をレビューする](./04-review-cloud-agent-pr.md)
