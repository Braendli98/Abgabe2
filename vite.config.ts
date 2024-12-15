import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
          '/api': {
            target: "https://localhost:3000",
            changeOrigin: true,
            secure: false,
            rewrite: path => path.replace('/api', ''),
          }
        }
      },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
