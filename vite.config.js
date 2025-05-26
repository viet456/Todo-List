import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))


export default defineConfig({
  resolve: {
    alias: {
      // @css → /src/css
      '@css': path.resolve(__dirname, 'src/css'),
      // @js  → /src/js
      '@js':  path.resolve(__dirname, 'src/js'),
    }
  },
  // when deployed to https://<user>.github.io/Restaurant-Page/
  base: './',
  build: {
    assetsDir: 'assets',
  }
})