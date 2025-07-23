/// <reference types="vite/client" />
/// <reference types="vite-plugin-inspect/client" />
/// <reference types="rollup-plugin-visualizer" />
/// <reference types="vitest" />

declare module 'rollup-plugin-visualizer' {
  import { Plugin } from 'vite';
  export function visualizer(options?: any): Plugin;
}
interface ImportMetaEnv {
  readonly VITE_NASA_API_KEY: string;
  readonly VITE_NASA_API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}