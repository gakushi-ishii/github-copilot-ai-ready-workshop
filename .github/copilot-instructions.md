# Copilot Instructions

## 言語

日本語で応答すること。生成するドキュメント（Markdown 等）も日本語で書くこと。

## プロジェクト概要

Outdoor eShop は、登山・キャンプ向けアウトドア用品店の EC サンプルアプリ。
GitHub Copilot ハンズオンの教材であり、現状の機能は商品一覧と全文検索のみ。

## 実行環境と技術スタック（ガードレールの根拠）

このリポジトリのコードは、次の環境で動くことを前提とする。実装判断はこの前提に従うこと。

| 項目 | 値 | 補足 |
| --- | --- | --- |
| ランタイム | Node.js 20（`.node-version`） | 依存インストールは `npm ci` を契約とする |
| パッケージ管理 | npm（`package-lock.json`） | lockfile を唯一の正とする |
| フレームワーク | React 18.3 + react-dom 18.3 | ブラウザ実行前提（SSR なし） |
| ビルド/開発 | Vite 6 | `npm run dev` / `npm run build` |
| 言語 | TypeScript ~5.6 | project references、`tsc -b`、`moduleResolution: bundler` |
| テスト | Vitest 3 + jsdom | `npm test` |

## 依存関係のルール（重要）

新しいパッケージの追加や `package.json` / `package-lock.json` / `tsconfig*.json` の変更は、
環境依存の事故（手元では動くが他環境や CI で壊れる）を生みやすい。次を必ず守ること。

- **ランタイム依存の追加は最小限にする。** 追加する場合は、目的と検討した代替案を残す。
  標準 API（例: `Intl`、`URL`、`fetch`）で十分なら追加しない。
- **`package.json` を変更したら必ず `package-lock.json` を同期する。**
  `npm install` を実行し、`npm ci` が通る状態を保つこと。lockfile を手で編集しない。
- **追加パッケージは Node 20 / React 18 と互換であること。**
  `engines` と peerDependencies を確認し、React 19 専用などの非互換を持ち込まない。
- **`tsconfig` の `target` / `module` / `moduleResolution` を安易に変更しない。**
  変更する場合はビルドと型への影響範囲を確認する。
- **ブラウザ実行前提のコードに Node 専用 API（`fs`、`path`、`process` 依存など）を持ち込まない。**
- **完了前に `npm test` と `npm run build` を実行する。**

依存を追加・更新するときは `.github/skills/add-dependency-safely/SKILL.md` の手順に従うこと。

## 変更範囲とレビュー

- 課題と無関係な変更や、説明のない依存追加・設定変更を行わない。
- 既存の React / TypeScript / CSS の構成とデザインを尊重する。
- 実装後は、変更したファイルと設計上の判断、テスト結果を簡潔に説明する。

## Issue 対応

- バグ修正では、Issue の再現手順・期待結果を確認し、まず再現するテストを追加してから修正する。
- PR 本文で、受け入れ条件ごとに対応する変更とテストを対応付ける。

## コミット

- **`git commit` を実行する前に、コミットメッセージのドラフトを提示し、ユーザーの確認を得ること。**
  ユーザーが承認するか、修正指示を出すまでコミットしない。
- **コミットメッセージは日本語で書く。** 件名（50 文字程度の要約）と、必要なら本文（何を・なぜ変えたか）を含める。
- **確認はインタラクティブな選択肢で求める。** テキストで質問するのではなく、選択肢を提示する
  質問ツール（`ask_user`）を使い、「このメッセージでコミット」「メッセージを修正」「コミットしない」
  などから選ばせる。
- 承認後にそのメッセージでコミットする。
