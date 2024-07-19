import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Checker from 'vite-plugin-checker';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
      },
      '/img': {
        target: 'http://localhost:3000/',
      },
    },
  },
  build: {
    outDir: '../server/dist',
  },
});
