import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      // コンテナ実行時（Docker Desktop / WSL バインドマウント）は
      // inotify が伝わらず HMR が壊れるため、環境変数でポーリングに切り替える。
      // ネイティブ実行時は無効のまま（高速）。
      usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
