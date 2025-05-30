import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Use a full repo path when you deploy to GitHub Pages
  base: '/Todo-List/',

  resolve: {
    alias: {
      'src': '/src',
    },
  },
  build: {
    assetsDir: 'assets',
  },
});
