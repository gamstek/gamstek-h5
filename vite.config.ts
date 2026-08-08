import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import pkg from './package.json';

export default defineConfig(() => {
  return {
    // 部署到 GitHub Pages 项目站点（/gamstek-h5/）时需设置 base，
    // 由部署 workflow 注入 BASE_PATH 环境变量；本地开发保持默认 '/'。
    base: process.env.BASE_PATH || '/',
    plugins: [react(), tailwindcss()],
    define: {
      // 构建时从 package.json 注入版本号，供全局展示（Footer 等）
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
