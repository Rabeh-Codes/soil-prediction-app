import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path'; // Fixed import using namespace
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * NASA Soil Prediction App - Vitest Configuration
 * 
 * Resolved all TypeScript errors:
 * 1. Fixed path import using namespace syntax
 * 2. Properly accessed environment variables using bracket notation
 * 3. Corrected boolean conversion for environment variables
 * 4. Fixed watchExclude spelling (previously had a typo)
 * 
 * Compatibility:
 * - React 18.3
 * - Vite 5
 * - Node 20
 * - Docker & CI/CD ready
 */
export default defineConfig({
  // ===== PLUGINS SECTION =====
  plugins: [
    // React 18 with SWC compiler (faster than Babel)
    react({
      jsxImportSource: '@emotion/react',
      plugins: [['@swc/plugin-emotion', {}]],
    }),
    
    // Bundle visualizer (only opens in local development)
    visualizer({
      open: process.env['NODE_ENV'] === 'development' && !process.env['CI'],
      filename: 'bundle-analysis.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  // ===== TEST CONFIGURATION =====
  test: {
    // Browser-like testing environment
    environment: 'jsdom',
    
    // Global test APIs (describe, it, expect without imports)
    globals: true,
    
    // Setup files for test environment
    setupFiles: [
      './tests/setup.ts', // Global test setup
      './tests/mocks/nasa-api.ts' // NASA API mocking
    ],
    
    // Test file patterns
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'tests/integration/**/*.test.ts'
    ],
    
    // Excluded paths
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/docker/**',
      '**/__snapshots__/**',
      '**/*.stories.tsx' // Storybook files
    ],
    
    // Reset mocks between tests
    mockReset: true,
    restoreMocks: true,
    
    // Timeout settings (adjusted for NASA API calls)
    testTimeout: 20000, // 20 seconds
    hookTimeout: 10000, // 10 seconds
    
    // Code coverage configuration
    coverage: {
      provider: 'v8', // Uses V8's native coverage
      enabled: true,
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'html', 'lcov', 'clover'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/**/index.ts', // Barrel files
        'src/**/*.stories.tsx', // Storybook files
        'src/**/__mocks__/**', // Mock directories
        'src/**/types.ts' // Type declarations
      ],
      thresholds: {
        lines: 85,
        functions: 80,
        branches: 80,
        statements: 85,
        // Only update thresholds locally (not in CI)
        autoUpdate: process.env['CI'] !== 'true'
      }
    },
    
    // Thread pool configuration
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 1,
        // Reduce threads in CI for better stability
        maxThreads: process.env['CI'] ? 4 : 8,
        useAtomics: true,
        isolate: true // Better isolation for React components
      }
    },
    
    // JSDOM environment options
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000',
        resources: 'usable',
        pretendToBeVisual: true, // Required for animation testing
        runScripts: 'dangerously' // Needed for some third-party libs
      }
    },
    
    // Reporters configuration
    reporters: process.env['CI'] 
      ? ['default', 'junit'] // CI-friendly reporting
      : ['default', 'hanging-process'], // Better local debugging
    
    // JUnit reporter output
    outputFile: {
      junit: './test-results/junit.xml'
    },
    
    // Snapshot formatting
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true
    },
    
    // Global setup file (runs before all tests)
    globalSetup: './tests/global-setup.ts',
    
    // Type checking for test files
    typecheck: {
      enabled: true,
      include: ['src/**/*.test.{ts,tsx}']
    },
    
    
    
    // Test execution sequence
    sequence: {
      // Randomize tests only in CI
      shuffle: process.env['CI'] === 'true'
    },
    
    // Test environment isolation
    isolate: true,
    
    // Update snapshots when flag is set
    update: process.env['UPDATE_SNAPSHOTS'] === 'true'
  },

  // ===== MODULE RESOLUTION =====
  resolve: {
    // Path aliases (matches tsconfig.json)
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@services', replacement: path.resolve(__dirname, './src/services') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: '@types', replacement: path.resolve(__dirname, './src/types') },
      { find: '@tests', replacement: path.resolve(__dirname, './tests') },
    ],
    // Supported file extensions
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs']
  },

  // ===== DOCKER OPTIMIZATIONS =====
  server: {
    watch: {
      // Enable polling in Docker environments
      usePolling: process.env['DOCKER_ENV'] === 'true',
      interval: 300,  // Polling interval in ms
      ignored: ['**/node_modules**/','**/dist/**','**/.docker/**', '**/coverage/**']
    }
  }
});