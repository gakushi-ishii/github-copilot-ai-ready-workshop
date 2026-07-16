# Copilot Instructions

## 言語

日本語で応答すること。生成するドキュメント（Markdown 等）も日本語で書くこと。

## プロジェクト概要

Outdoor eShop は、登山・キャンプ向けアウトドア用品店の EC サンプルアプリ。
GitHub Copilot ハンズオンの教材である。機能や構成の現状は README とコードを正とする。

## 実行環境と技術スタック

このリポジトリのコードは、次の環境で動くことを前提とする。実装判断はこの前提に従うこと。

| 項目 | 値 | 補足 |
| --- | --- | --- |
| ランタイム | Node.js 20 以上（最小サポート版；`.node-version` と CI は 22 を使用） | クリーン環境の依存インストールは `npm ci` を契約とする |
| パッケージ管理 | npm（`package-lock.json`） | lockfile を解決済み依存ツリーの正とする |
| フレームワーク | React 18.3 + react-dom 18.3 | ブラウザ実行前提（SSR なし） |
| ビルド/開発 | Vite 6 | `npm run dev` / `npm run build` |
| 言語 | TypeScript ~5.6 | project references、`tsc -b`、`moduleResolution: bundler` |
| テスト | Vitest 3 + jsdom | `npm test` |

表の記載と設定ファイルが矛盾する場合は、`.node-version`、`package.json`、
`package-lock.json`、`tsconfig*.json` の実体を優先し、この文書も同期して更新する。
依存宣言は `package.json`、具体的に解決された依存ツリーは `package-lock.json` を正とする。

## 依存関係のルール

新しいパッケージの追加や `package.json` / `package-lock.json` / `tsconfig*.json` の変更は、
環境依存の事故（手元では動くが他環境や CI で壊れる）を生みやすい。次を必ず守ること。

- `package.json` を変更したら `npm install` で `package-lock.json` を同期し、
  `npm ci` が成功する状態を保つ。lockfile は手で編集しない。
- 追加パッケージは Node 20 以上 / React 18 と互換でなければならない。
- `tsconfig` の `target` / `module` / `moduleResolution` は原則変更しない。
- ブラウザ実行前提のコードに Node 専用 API（`fs`、`path`、`process` 依存など）を持ち込まない。

## 検証

- アプリケーションコード、テスト、ビルド設定を変更した場合は、完了前に `npm test` と `npm run build` を実行する。
- Markdown などドキュメントだけの変更では、専用の検証コマンドがない限り `npm test` と `npm run build` は不要とする。

## 変更範囲とレビュー

- 既存の React / TypeScript / CSS の構成とデザインを尊重する。
- 実装後は、変更したファイルと設計上の判断、テスト結果を簡潔に説明する。