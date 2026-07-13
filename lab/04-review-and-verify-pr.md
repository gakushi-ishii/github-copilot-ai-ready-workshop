# 04. Coding Agent が作った PR をローカルで検証する

課題B（[03. 検索の価格ソート](./03-challenge-b-search-sort.md)）で Coding Agent が作成した PR は、
マージ前に手元で動作確認できます。

```bash
# PR ブランチを取得
gh pr checkout <PR番号>

# 依存インストール & 起動して確認
npm install
npm run dev

# テストを実行
npm test

# 問題なければ承認（直したい場合は PR にコメントで追加指示）
gh pr review <PR番号> --approve
```

- テストが通り、意図どおりに動作していれば承認します。
- 修正したい点があれば、PR にコメントで追加指示を出して Coding Agent に再対応させます。

---

← [03. 課題B：検索の価格ソート](./03-challenge-b-search-sort.md) ・ [ラボ目次に戻る](./README.md)
