import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "./src/styles/global.css";',
      },
    },
  },
});
