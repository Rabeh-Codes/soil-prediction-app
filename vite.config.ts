/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * Core plugins configuration
   */
  plugins: [
    react({
      jsxImportSource: '@emotion/react', // Use Emotion for CSS-in-JS
      babel: {
        plugins: ['@emotion/babel-plugin'], // Enable Emotion CSS props
      },
    }),
  ],

  /**
   * Development server configuration
   */
  server: {
    host: true, // Listen on all network interfaces
    port: 3000, // Default development port
    strictPort: true, // Prevent automatic port fallback
    open: true, // Automatically open browser on startup

    // Hot Module Replacement configuration
    hmr: {
      protocol: 'ws', // WebSocket protocol
      host: 'localhost',
      clientPort: 3000, // Match the server port
    },

    // File watching options (essential for Docker)
    watch: {
      usePolling: true, // Required for Docker bind mounts
      interval: 1000, // Polling interval in ms
    },
  },

  /**
   * Dependency optimization settings
   */
  optimizeDeps: {
    // Pre-bundle these dependencies for faster startup
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-helmet-async',
      'axios',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/icons-material',
      '@tanstack/react-query',
      'clsx',
      'framer-motion',
      'react-error-boundary',
      'react-icons',
    ],

    // ESBuild configuration
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // Treat .js files as JSX
      },
      jsx: 'automatic', // Use modern JSX runtime
    },

    force: true, // Force dependency pre-bundling
  },

  /**
   * Module resolution settings
   */
  resolve: {
    alias: {
      // Fix for react-helmet-async module resolution
      'react-helmet-async': 'react-helmet-async/dist/index.js',
    },
  },

  /**
   * Production build configuration
   */
  build: {
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clear output directory before building
    sourcemap: true, // Generate source maps for production debugging

    // CommonJS module handling
    commonjsOptions: {
      include: [/node_modules/], // Transform CommonJS modules
      transformMixedEsModules: true, // Handle mixed ES/CJS modules
    },

    // Rollup configuration
    rollupOptions: {
      output: {
        // Manual code splitting for better caching
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          emotion: ['@emotion/react', '@emotion/styled'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          utils: ['clsx', 'axios'],
        },
      },
    },
  },

  /**
   * CSS processing configuration
   */
  css: {
    // CSS Modules configuration
    modules: {
      localsConvention: 'camelCaseOnly', // Use camelCase for class names
    },

    // PostCSS configuration
    postcss: {
      plugins: [
        autoprefixer(), // Auto-prefix CSS
        tailwindcss(), // Enable Tailwind CSS
      ],
    },
  },

  /**
   * Preview server configuration
   */
  preview: {
    port: 4173, // Vite preview port
    open: true, // Open browser after build
  },
});
