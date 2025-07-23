import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      plugins: [['@swc/plugin-emotion', {}]],
    }),
    
    visualizer({
      open: process.env['NODE_ENV'] === 'development' && !process.env['CI'],
      filename: 'bundle-analysis.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts', './tests/mocks/nasa-api.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/integration/**/*.test.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/docker/**',
      '**/__snapshots__/**',
      '**/*.stories.tsx'
    ],
    mockReset: true,
    restoreMocks: true,
    testTimeout: 20000,
    hookTimeout: 10000,
    coverage: {
      provider: 'v8',
      enabled: true,
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'html', 'lcov', 'clover'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/**/*.stories.tsx',
        'src/**/__mocks__/**',
        'src/**/types.ts'
      ],
      thresholds: {
        lines: 85,
        functions: 80,
        branches: 80,
        statements: 85,
        autoUpdate: process.env['CI'] !== 'true'
      }
    },
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: process.env['CI'] ? 4 : 8,
        useAtomics: true,
        isolate: true
      }
    },
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000',
        resources: 'usable',
        pretendToBeVisual: true,
        runScripts: 'dangerously'
      }
    },
    reporters: process.env['CI'] 
      ? ['default', 'junit']
      : ['default', 'hanging-process'],
    outputFile: {
      junit: './test-results/junit.xml'
    },
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true
    },
    globalSetup: './tests/global-setup.ts',
    typecheck: {
      enabled: true,
      include: ['src/**/*.test.{ts,tsx}']
    },
    sequence: {
      shuffle: process.env['CI'] === 'true'
    },
    isolate: true,
    update: process.env['UPDATE_SNAPSHOTS'] === 'true'
  },

  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@services', replacement: path.resolve(__dirname, './src/services') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: '@types', replacement: path.resolve(__dirname, './src/types') },
      { find: '@tests', replacement: path.resolve(__dirname, './tests') }
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs']
  },

  server: {
    watch: {
      usePolling: process.env['DOCKER_ENV'] === 'true',
      interval: 300,
      ignored: ['**/node_modules**/', '**/dist/**', '**/.docker/**', '**/coverage/**']
    },
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 24678
    }
  }
});
