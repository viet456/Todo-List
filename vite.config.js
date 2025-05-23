import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      // @css → /src/css
      '@css': path.resolve(__dirname, 'src/css'),
      // @js  → /src/js
      '@js':  path.resolve(__dirname, 'src/js'),
    }
  }
});