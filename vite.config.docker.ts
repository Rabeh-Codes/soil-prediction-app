import baseConfig from './vite.config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...baseConfig,
  server: {
    ...baseConfig.server,
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      protocol: 'ws',
      host: '0.0.0.0',
      clientPort: 3000,
    },
  },
});
