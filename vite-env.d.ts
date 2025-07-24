/// <reference types="vite/client" />
/// <reference types="vite-plugin-inspect/client" />
/// <reference types="rollup-plugin-visualizer" />
import 'vitest/globals';

declare module 'rollup-plugin-visualizer' {
  import { Plugin } from 'vite';
  export function visualizer(options?: Record<string, unknown>): Plugin;
}
interface ImportMetaEnv {
  readonly VITE_NASA_API_KEY: string;
  readonly VITE_NASA_API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
