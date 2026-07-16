#!/usr/bin/env node
// 依存ガード (postToolUse hook)
//
// package.json / package-lock.json / tsconfig*.json が変更されたときだけ、
// 環境依存の事故を機械的に検出する。
//   1. lockfile 同期      : package.json と package-lock.json の不整合 (= `npm ci` 失敗) を検出
//   2. 環境互換 (best-effort): 追加依存の engines.node が最小サポート Node (>=20) と非互換なら警告
//   3. tsconfig 変更時    : 型チェック (`tsc -b`) を実行
//
// 追加の npm 依存は使わない。Node.js 標準モジュールのみ。
// 失敗・警告は additionalContext としてエージェントへ返す。

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// プロジェクトの最小サポート Node メジャー（前提: Node 20 以上 = engines.node ">=20"）。
// 依存の engines.node は大半が開放区間 (>=X) のため、「最小メジャーを満たすか」の
// 一点判定が ">=20" 全体の互換判定と一致する。
const MIN_NODE_MAJOR = 20;
const WATCHED = new Set(['package.json', 'package-lock.json']);
const isTsconfig = (name) => /^tsconfig.*\.json$/.test(name);

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function tryGit(args) {
  try {
    return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8' });
  } catch {
    return null;
  }
}

// 変更 (追跡/未追跡問わず) されたファイルの basename 一覧を返す。
function changedBasenames() {
  const out = tryGit(['status', '--porcelain', '--untracked-files=all']);
  if (out == null) return null; // git 不可
  const names = new Set();
  for (const line of out.split('\n')) {
    const path = line.slice(3).trim();
    if (!path) continue;
    const rel = path.includes(' -> ') ? path.split(' -> ')[1] : path;
    names.add(rel.split('/').pop());
  }
  return names;
}

function readJson(relPath) {
  const abs = resolve(repoRoot, relPath);
  if (!existsSync(abs)) return null;
  try {
    return JSON.parse(readFileSync(abs, 'utf8'));
  } catch {
    return null;
  }
}

// package.json と package-lock.json の整合を確認する。
function checkLockfileSync() {
  const pkg = readJson('package.json');
  const lock = readJson('package-lock.json');
  const problems = [];
  if (!pkg || !lock) return problems;

  const root = lock.packages && lock.packages[''];
  if (!root) return problems; // 想定外の lockfile 形式はスキップ

  const declared = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const locked = { ...(root.dependencies || {}), ...(root.devDependencies || {}) };

  for (const [name, range] of Object.entries(declared)) {
    const installed = lock.packages && lock.packages[`node_modules/${name}`];
    if (!installed || locked[name] === undefined) {
      problems.push(
        `${name} (package.json: ${range}) が package-lock.json に未同期です`,
      );
    } else if (locked[name] !== range) {
      problems.push(
        `${name} のバージョン範囲が不一致です (package.json: ${range} / lockfile: ${locked[name]})`,
      );
    }
  }
  for (const name of Object.keys(locked)) {
    if (declared[name] === undefined) {
      problems.push(
        `${name} が package-lock.json に残っていますが package.json にありません`,
      );
    }
  }
  return problems;
}

// engines.node の範囲に、指定メジャー（最小サポート = Node 20）が含まれるかを判定する。
// `||` (OR)、`^`、`~`、`>=`/`>`/`<=`/`<`、完全一致、`*` を best-effort で解釈する。
// 厳密な semver 解決ではないが、最小サポート版（Node 20）を明確に除外する範囲だけを非互換とみなす。
function nodeMajorSatisfies(range, major) {
  if (!range || range.trim() === '' || range.includes('*')) return true;
  const clauses = range.split('||').map((c) => c.trim()).filter(Boolean);
  if (clauses.length === 0) return true;

  const majorOf = (v) => {
    const m = String(v).match(/(\d+)/);
    return m ? Number(m[1]) : null;
  };

  for (const clause of clauses) {
    const comparators = clause.match(/(\^|~|>=|<=|>|<|=)?\s*v?\d+[^\s]*/g) || [];
    if (comparators.length === 0) return true; // 解釈できないクリップは許可扱い
    let min = -Infinity;
    let max = Infinity;
    let ok = true;
    for (const comp of comparators) {
      const op = (comp.match(/^(\^|~|>=|<=|>|<|=)/) || [''])[0];
      const maj = majorOf(comp);
      if (maj == null) continue;
      if (op === '^' || op === '~' || op === '=' || op === '') {
        min = Math.max(min, maj);
        max = Math.min(max, maj);
      } else if (op === '>=') {
        min = Math.max(min, maj);
      } else if (op === '>') {
        min = Math.max(min, maj); // メジャー粒度では概算
      } else if (op === '<=') {
        max = Math.min(max, maj);
      } else if (op === '<') {
        max = Math.min(max, maj - 1);
      }
      if (min > max) {
        ok = false;
        break;
      }
    }
    if (ok && major >= min && major <= max) return true;
  }
  return false;
}

// 追加依存の engines.node が最小サポート Node (>=20) と非互換なら警告する (best-effort)。
function checkEngineCompat() {
  const lock = readJson('package-lock.json');
  const warnings = [];
  if (!lock || !lock.packages) return warnings;

  for (const [key, meta] of Object.entries(lock.packages)) {
    if (!key.startsWith('node_modules/')) continue;
    const nodeRange = meta && meta.engines && meta.engines.node;
    if (typeof nodeRange !== 'string') continue;
    if (!nodeMajorSatisfies(nodeRange, MIN_NODE_MAJOR)) {
      warnings.push(
        `${key.replace('node_modules/', '')} は Node ${nodeRange} を要求します (最小サポートは Node ${MIN_NODE_MAJOR} 以上)`,
      );
    }
  }
  return warnings;
}

// tsconfig 変更時に型チェックを実行する。
function checkTypes() {
  try {
    execFileSync('npx', ['--no-install', 'tsc', '-b', '--noEmit'], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 55_000,
      shell: process.platform === 'win32',
    });
    return { ok: true, output: '' };
  } catch (err) {
    const output = `${err.stdout || ''}${err.stderr || ''}`.trim();
    return { ok: false, output: output.slice(0, 1200) };
  }
}

function emit(messages) {
  if (messages.length === 0) return;
  const context =
    '依存ガード (postToolUse) の検出結果:\n' +
    messages.map((m) => `- ${m}`).join('\n');
  process.stdout.write(JSON.stringify({ additionalContext: context }));
}

function main() {
  readStdin(); // ペイロードは使わない (git の変更検出で判定する)

  const changed = changedBasenames();
  const pkgFilesChanged =
    changed == null
      ? existsSync(resolve(repoRoot, 'package.json'))
      : [...changed].some((n) => WATCHED.has(n));
  const tsconfigChanged =
    changed == null ? false : [...changed].some((n) => isTsconfig(n));

  if (!pkgFilesChanged && !tsconfigChanged) return; // 監視対象に変更なし

  const messages = [];

  if (pkgFilesChanged) {
    const sync = checkLockfileSync();
    if (sync.length > 0) {
      messages.push(
        '**package.json と package-lock.json が不整合です。この状態では `npm ci` ' +
          '(新しい worktree の Setup Script や CI) が失敗します。** ' +
          '`npm install` を実行して package-lock.json を同期してください:',
      );
      for (const p of sync) messages.push(p);
    }
    for (const w of checkEngineCompat()) {
      messages.push(`環境互換の警告: ${w}`);
    }
  }

  if (tsconfigChanged) {
    const types = checkTypes();
    if (!types.ok) {
      messages.push(
        '**tsconfig 変更後の型チェック (`tsc -b`) が失敗しました。** ' +
          'ビルドが壊れる可能性があります。次を確認してください:',
      );
      if (types.output) messages.push(types.output);
    }
  }

  emit(messages);
}

main();
